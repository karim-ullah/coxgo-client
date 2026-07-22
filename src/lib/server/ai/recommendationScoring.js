import { ObjectId } from "mongodb";

const productCollectionName = process.env.PRODUCT_COLLECTION || "products";

export function getProductCollectionName() {
  return productCollectionName;
}

export function toObjectIds(ids = []) {
  return ids.filter((id) => ObjectId.isValid(String(id))).map((id) => new ObjectId(String(id)));
}

export function getProductId(product) {
  return String(product?._id || product?.id || "");
}

export function normalizeProduct(product) {
  const features = []
    .concat(product.features || [])
    .concat(product.mainFeatures || [])
    .concat(product.specifications || [])
    .concat(product.tags || [])
    .filter(Boolean)
    .map(String);

  return {
    id: getProductId(product),
    name: product.name || product.title || product.productName || "Unnamed product",
    category: product.category || product.productCategory || "",
    brand: product.brand || product.brandName || "",
    price: Number(product.price || product.salePrice || product.regularPrice || 0),
    availability: product.availability || product.status || (product.stock > 0 ? "available" : ""),
    rating: Number(product.rating || product.averageRating || 0),
    popularity: Number(product.popularity || product.orderCount || product.salesCount || product.views || 0),
    features,
    description: product.description || product.shortDescription || product.details || "",
  };
}

export function buildProductFilter(preferences = {}) {
  const filter = {};
  const and = [];

  if (preferences.category) {
    and.push({ category: { $regex: preferences.category, $options: "i" } });
  }

  if (preferences.minPrice !== null || preferences.maxPrice !== null) {
    const price = {};
    if (preferences.minPrice !== null) price.$gte = preferences.minPrice;
    if (preferences.maxPrice !== null) price.$lte = preferences.maxPrice;
    and.push({ price });
  }

  if (preferences.preferredBrands?.length) {
    and.push({
      $or: [
        { brand: { $in: preferences.preferredBrands.map((brand) => new RegExp(escapeRegExp(brand), "i")) } },
        { brandName: { $in: preferences.preferredBrands.map((brand) => new RegExp(escapeRegExp(brand), "i")) } },
      ],
    });
  }

  if (preferences.searchText) {
    const term = new RegExp(escapeRegExp(preferences.searchText), "i");
    and.push({
      $or: [
        { name: term },
        { title: term },
        { productName: term },
        { description: term },
        { shortDescription: term },
        { category: term },
        { brand: term },
      ],
    });
  }

  if (preferences.requiredFeatures?.length) {
    const featureRegexes = preferences.requiredFeatures.map((feature) => new RegExp(escapeRegExp(feature), "i"));
    and.push({
      $or: [
        { features: { $elemMatch: { $in: featureRegexes } } },
        { tags: { $elemMatch: { $in: featureRegexes } } },
        { specifications: { $elemMatch: { $in: featureRegexes } } },
        { description: { $in: featureRegexes } },
      ],
    });
  }

  const dismissedIds = toObjectIds(preferences.dismissedProductIds);
  if (dismissedIds.length) {
    and.push({ _id: { $nin: dismissedIds } });
  }

  and.push({
    $or: [
      { availability: { $regex: "available|in stock", $options: "i" } },
      { status: { $regex: "active|available|in stock", $options: "i" } },
      { stock: { $gt: 0 } },
      { availability: { $exists: false } },
    ],
  });

  if (and.length) filter.$and = and;
  return filter;
}

export function scoreProducts(products, preferences, interactions = []) {
  const viewed = new Set(preferences.previouslyViewedProductIds || []);
  const selected = new Set(preferences.previouslySelectedProductIds || []);
  const dismissed = new Set(preferences.dismissedProductIds || []);
  const interactionScores = new Map();

  interactions.forEach((interaction) => {
    const id = String(interaction.productId || "");
    const delta = {
      product_viewed: 4,
      recommendation_clicked: 8,
      product_selected: 14,
      added_to_cart: 18,
      recommendation_dismissed: -18,
      recommendation_useful: 12,
      recommendation_not_useful: -12,
    }[interaction.interactionType] || 0;
    interactionScores.set(id, (interactionScores.get(id) || 0) + delta);
  });

  return products
    .map((product) => {
      const normalized = normalizeProduct(product);
      let score = 35;
      const haystack = `${normalized.name} ${normalized.category} ${normalized.brand} ${normalized.description} ${normalized.features.join(" ")}`.toLowerCase();

      if (preferences.category && normalized.category.toLowerCase().includes(preferences.category.toLowerCase())) score += 16;
      if (preferences.preferredBrands?.some((brand) => normalized.brand.toLowerCase().includes(brand.toLowerCase()))) score += 14;
      if (preferences.searchText && haystack.includes(preferences.searchText.toLowerCase())) score += 10;

      (preferences.requiredFeatures || []).forEach((feature) => {
        if (haystack.includes(feature.toLowerCase())) score += 8;
      });

      if (preferences.minPrice !== null && normalized.price >= preferences.minPrice) score += 4;
      if (preferences.maxPrice !== null && normalized.price <= preferences.maxPrice) score += 8;

      score += Math.min(normalized.rating * 3, 15);
      score += Math.min(normalized.popularity / 10, 10);
      if (viewed.has(normalized.id)) score += 5;
      if (selected.has(normalized.id)) score += 10;
      if (dismissed.has(normalized.id)) score -= 30;
      score += interactionScores.get(normalized.id) || 0;

      return {
        product,
        normalized,
        deterministicScore: Math.max(0, Math.min(100, Math.round(score))),
      };
    })
    .sort((a, b) => b.deterministicScore - a.deterministicScore);
}

export function buildRerankPrompt({ preferences, candidates }) {
  return `
You are ranking existing CoxGo products. Return only valid JSON. Do not use Markdown.

User preferences:
${JSON.stringify(preferences, null, 2)}

Candidate products you may rank:
${JSON.stringify(
  candidates.map(({ normalized, deterministicScore }) => ({
    productId: normalized.id,
    name: normalized.name,
    category: normalized.category,
    brand: normalized.brand,
    price: normalized.price,
    availability: normalized.availability,
    rating: normalized.rating,
    features: normalized.features.slice(0, 12),
    description: String(normalized.description).slice(0, 500),
    deterministicScore,
  })),
  null,
  2
)}

Rules:
- Recommend only product IDs from the candidate list.
- Never invent products, prices, stock, specifications, ratings, claims, or features.
- Keep matchScore between 0 and 100.
- Trade-offs must be based on supplied candidate data or missing preference matches.
- Choose bestMatchProductId from the recommendations you return.
- Return exactly:
{
  "summary": "Short recommendation summary",
  "bestMatchProductId": "existing-database-product-id",
  "recommendations": [
    {
      "productId": "existing-database-product-id",
      "matchScore": 92,
      "reason": "Why this product matches",
      "strengths": ["Strength one"],
      "tradeoffs": ["Trade-off one"]
    }
  ],
  "refinementSuggestions": ["Increase the budget slightly"]
}
`;
}

export function validateRecommendationOutput(output, scoredCandidates) {
  const byId = new Map(scoredCandidates.map((candidate) => [candidate.normalized.id, candidate]));
  const recommendations = Array.isArray(output?.recommendations) ? output.recommendations : [];

  const validated = recommendations
    .filter((item) => byId.has(String(item?.productId || "")))
    .slice(0, 8)
    .map((item) => {
      const fallback = byId.get(String(item.productId));
      return {
        productId: String(item.productId),
        matchScore: Math.max(0, Math.min(100, Math.round(Number(item.matchScore || fallback.deterministicScore)))),
        reason: String(item.reason || "Matches the supplied preferences.").slice(0, 500),
        strengths: Array.isArray(item.strengths) ? item.strengths.map(String).filter(Boolean).slice(0, 5) : [],
        tradeoffs: Array.isArray(item.tradeoffs) ? item.tradeoffs.map(String).filter(Boolean).slice(0, 5) : [],
      };
    });

  const fallbackRecommendations = scoredCandidates
    .slice(0, 5)
    .filter((candidate) => !validated.some((item) => item.productId === candidate.normalized.id))
    .map((candidate) => ({
      productId: candidate.normalized.id,
      matchScore: candidate.deterministicScore,
      reason: "This product is a strong deterministic match for the supplied filters.",
      strengths: ["Matches the available database filters"],
      tradeoffs: ["AI reranking did not provide extra trade-off detail"],
    }));

  const finalRecommendations = validated.length ? validated : fallbackRecommendations;
  const bestMatchProductId = byId.has(String(output?.bestMatchProductId || ""))
    ? String(output.bestMatchProductId)
    : finalRecommendations[0]?.productId || "";

  return {
    summary: String(output?.summary || "Here are the best matching products from the available catalog.").slice(0, 500),
    bestMatchProductId,
    recommendations: finalRecommendations,
    refinementSuggestions: Array.isArray(output?.refinementSuggestions)
      ? output.refinementSuggestions.map(String).filter(Boolean).slice(0, 6)
      : [],
  };
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
