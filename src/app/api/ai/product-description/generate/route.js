import { buildProductDescriptionPrompt, validateProductDescriptionOutput } from "@/lib/server/ai/productDescriptionPrompts";
import { generateGeminiJson } from "@/lib/server/ai/gemini";
import { cleanList, cleanLongText, cleanText } from "@/lib/server/ai/input";
import { jsonError, parseAiJson } from "@/lib/server/ai/json";

export async function POST(request) {
  try {
    const body = await request.json();
    const input = sanitizeProductInput(body);

    if (!input.productName) {
      return jsonError("Product name is required", 422);
    }

    const raw = await generateGeminiJson({
      prompt: buildProductDescriptionPrompt({ input }),
      temperature: 0.75,
    });
    const output = validateProductDescriptionOutput(parseAiJson(raw));

    return Response.json({ success: true, result: output });
  } catch (error) {
    return jsonError(error.message || "Failed to generate product description", 500);
  }
}

export function sanitizeProductInput(body) {
  return {
    productName: cleanText(body.productName, 120),
    productCategory: cleanText(body.productCategory, 120),
    brandName: cleanText(body.brandName, 120),
    mainFeatures: cleanList(body.mainFeatures, 12, 100),
    specifications: cleanLongText(body.specifications, 1200),
    targetCustomer: cleanText(body.targetCustomer, 300),
    productBenefits: cleanList(body.productBenefits, 12, 120),
    tone: cleanText(body.tone, 40),
    keywords: cleanList(body.keywords, 12, 80),
    outputLength: cleanText(body.outputLength, 20),
    additionalInstructions: cleanLongText(body.additionalInstructions, 1000),
    template: cleanText(body.template, 40),
  };
}
