import { jsonError } from "@/lib/server/ai/json";
import { cleanLongText, cleanText } from "@/lib/server/ai/input";
import { recordInteraction } from "@/lib/server/ai/interactions";

export async function POST(request) {
  try {
    const body = await request.json();
    const interaction = await recordInteraction({
      userId: cleanText(body.userId, 120),
      sessionId: cleanText(body.sessionId, 120),
      productId: cleanText(body.productId, 80),
      interactionType: cleanText(body.interactionType, 60),
      recommendationSessionId: cleanText(body.recommendationSessionId, 120),
      metadata: {
        note: cleanLongText(body.note, 500),
      },
    });

    return Response.json({ success: true, result: { id: String(interaction.productId) } });
  } catch (error) {
    return jsonError(error.message || "Failed to record feedback", 422);
  }
}
