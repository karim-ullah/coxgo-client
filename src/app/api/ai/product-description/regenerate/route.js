import { sanitizeProductInput } from "../generate/route";
import { buildProductDescriptionPrompt, validateProductDescriptionOutput } from "@/lib/server/ai/productDescriptionPrompts";
import { generateGeminiJson } from "@/lib/server/ai/gemini";
import { jsonError, parseAiJson } from "@/lib/server/ai/json";

export async function POST(request) {
  try {
    const body = await request.json();
    const input = sanitizeProductInput(body.input || body);

    if (!input.productName) {
      return jsonError("Product name is required", 422);
    }

    const raw = await generateGeminiJson({
      prompt: buildProductDescriptionPrompt({
        input,
        previousOutput: body.previousOutput,
        regenerate: true,
      }),
      temperature: 0.9,
    });
    const output = validateProductDescriptionOutput(parseAiJson(raw));

    return Response.json({ success: true, result: output });
  } catch (error) {
    return jsonError(error.message || "Failed to regenerate product description", 500);
  }
}
