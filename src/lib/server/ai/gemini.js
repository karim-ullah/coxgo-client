import { GoogleGenAI } from "@google/genai";

let ai;

export function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  return ai;
}

export async function generateGeminiJson({ prompt, temperature = 0.7, timeoutMs = 30000 }) {
  const client = getGeminiClient();
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";

  const request = client.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature,
      responseMimeType: "application/json",
    },
  });

  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Gemini request timed out")), timeoutMs);
  });

  const response = await Promise.race([request, timeout]);
  return response.text || "";
}
