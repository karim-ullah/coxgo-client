import { ObjectId } from "mongodb";
import { getAppDb } from "@/lib/server/mongodb";
import { cleanList, cleanLongText, cleanNumber, cleanText } from "@/lib/server/ai/input";
import { generateGeminiJson } from "@/lib/server/ai/gemini";
import { jsonError, parseAiJson } from "@/lib/server/ai/json";
import {
  buildProductFilter,
  buildRerankPrompt,
  getProductCollectionName,
  scoreProducts,
  toObjectIds,
  validateRecommendationOutput,
} from "@/lib/server/ai/recommendationScoring";
import { getRelevantInteractions } from "@/lib/server/ai/interactions";

export async function POST(request) {
  return handleRecommendationRequest(request);
}

export async function handleRecommendationRequest(request) {
  try {
    const body = await request.json();
    const preferences = sanitizeRecommendationInput(body);
    const db = await getAppDb();
    const products = await db
      .collection(getProductCollectionName())
      .find(buildProductFilter(preferences))
      .limit(80)
      .toArray();

    if (!products.length) {
      return Response.json({
        success: true,
        result: {
          summary: "No matching products were found in the current catalog.",
          bestMatchProductId: "",
          recommendations: [],
          refinementSuggestions: ["Try widening the price range", "Remove one required feature"],
          recommendationSessionId: crypto.randomUUID(),
        },
      });
    }

    const productIds = products.map((product) => String(product._id));
    const interactions = await getRelevantInteractions({
      userId: preferences.userId,
      sessionId: preferences.sessionId,
      productIds,
    });

    const scoredCandidates = scoreProducts(products, preferences, interactions).slice(0, 25);
    const raw = await generateGeminiJson({
      prompt: buildRerankPrompt({ preferences, candidates: scoredCandidates }),
      temperature: 0.4,
    });
    const validated = validateRecommendationOutput(parseAiJson(raw), scoredCandidates);
    const byId = new Map(products.map((product) => [String(product._id), product]));

    return Response.json({
      success: true,
      result: {
        ...validated,
        recommendationSessionId: body.recommendationSessionId || crypto.randomUUID(),
        recommendations: validated.recommendations.map((item) => ({
          ...item,
          product: serializeProduct(byId.get(item.productId)),
        })),
      },
    });
  } catch (error) {
    return jsonError(error.message || "Failed to generate recommendations", 500);
  }
}

export function sanitizeRecommendationInput(body) {
  return {
    searchText: cleanText(body.searchText, 200),
    category: cleanText(body.category, 120),
    minPrice: cleanNumber(body.minPrice),
    maxPrice: cleanNumber(body.maxPrice),
    preferredBrands: cleanList(body.preferredBrands, 12, 80),
    requiredFeatures: cleanList(body.requiredFeatures, 12, 80),
    useCase: cleanText(body.useCase, 300),
    userPriorities: cleanList(body.userPriorities, 10, 120),
    previouslyViewedProductIds: cleanIdList(body.previouslyViewedProductIds),
    previouslySelectedProductIds: cleanIdList(body.previouslySelectedProductIds),
    dismissedProductIds: cleanIdList(body.dismissedProductIds),
    additionalInstructions: cleanLongText(body.additionalInstructions, 1000),
    sessionId: cleanText(body.sessionId, 120),
    userId: cleanText(body.userId, 120),
  };
}

function cleanIdList(value) {
  return toObjectIds(cleanList(value, 20, 80)).map(String);
}

function serializeProduct(product) {
  if (!product) return null;
  return JSON.parse(
    JSON.stringify({
      ...product,
      _id: String(product._id),
      id: String(product._id),
      detailUrl: product.slug ? `/products/${product.slug}` : `/products/${product._id}`,
    })
  );
}

export function validObjectIdOrNull(id) {
  return ObjectId.isValid(String(id || "")) ? String(id) : null;
}
