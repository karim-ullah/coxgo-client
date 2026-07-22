export const toneOptions = ["Professional", "Friendly", "Persuasive", "Premium", "Simple", "SEO-focused"];
export const lengthOptions = ["Short", "Medium", "Long"];

export const productDescriptionTemplates = {
  general: {
    label: "General product description",
    guidance: "Write a balanced product description for a broad audience.",
  },
  ecommerce: {
    label: "E-commerce product description",
    guidance: "Write conversion-focused copy suitable for a product detail page.",
  },
  seo: {
    label: "SEO product description",
    guidance: "Write search-friendly copy with natural keyword usage and a strong meta description.",
  },
  social: {
    label: "Social-commerce product description",
    guidance: "Write concise, engaging copy suitable for social selling and marketplace posts.",
  },
};

const lengthGuidance = {
  Short: "Keep the full description around 80-120 words and make every sentence concise.",
  Medium: "Keep the full description around 160-240 words with clear detail and benefits.",
  Long: "Keep the full description around 300-450 words with richer context, but avoid padding.",
};

export function buildProductDescriptionPrompt({ input, previousOutput, regenerate = false }) {
  const template = productDescriptionTemplates[input.template] || productDescriptionTemplates.general;
  const tone = toneOptions.includes(input.tone) ? input.tone : "Professional";
  const length = lengthOptions.includes(input.outputLength) ? input.outputLength : "Medium";

  return `
You are a careful product copywriter for CoxGo.
Return only valid JSON. Do not use Markdown.

Style template: ${template.label}
Template guidance: ${template.guidance}
Tone: ${tone}
Output length: ${length}
Length rule: ${lengthGuidance[length]}

Facts supplied by the user:
${JSON.stringify(input, null, 2)}

Rules:
- Use only supplied facts.
- Do not invent specifications, certifications, guarantees, pricing, medical claims, stock status, or product claims.
- If a detail is missing, write around it instead of fabricating it.
- Include suggested keywords based on the supplied keyword list and factual product content.
- The JSON must include exactly these keys:
{
  "title": "Generated product title",
  "shortDescription": "Short product summary",
  "fullDescription": "Detailed product description",
  "features": ["Feature one"],
  "benefits": ["Benefit one"],
  "metaDescription": "SEO meta description",
  "keywords": ["keyword one"]
}

${regenerate ? "This is a regeneration request. Produce a different version while preserving every original fact." : ""}
${previousOutput ? `Previous output to avoid repeating wording:\n${JSON.stringify(previousOutput, null, 2)}` : ""}
`;
}

export function validateProductDescriptionOutput(output) {
  return {
    title: String(output?.title || "").slice(0, 140),
    shortDescription: String(output?.shortDescription || "").slice(0, 500),
    fullDescription: String(output?.fullDescription || "").slice(0, 5000),
    features: Array.isArray(output?.features) ? output.features.map(String).filter(Boolean).slice(0, 10) : [],
    benefits: Array.isArray(output?.benefits) ? output.benefits.map(String).filter(Boolean).slice(0, 10) : [],
    metaDescription: String(output?.metaDescription || "").slice(0, 180),
    keywords: Array.isArray(output?.keywords) ? output.keywords.map(String).filter(Boolean).slice(0, 12) : [],
  };
}
