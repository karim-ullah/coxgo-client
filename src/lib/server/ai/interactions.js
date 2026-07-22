import { ObjectId } from "mongodb";
import { getAppDb } from "@/lib/server/mongodb";

export const allowedInteractionTypes = [
  "product_viewed",
  "recommendation_clicked",
  "product_selected",
  "added_to_cart",
  "recommendation_dismissed",
  "recommendation_useful",
  "recommendation_not_useful",
];

export async function recordInteraction({ userId, sessionId, productId, interactionType, recommendationSessionId, metadata }) {
  if (!allowedInteractionTypes.includes(interactionType)) {
    throw new Error("Unsupported interaction type");
  }

  if (!productId || !ObjectId.isValid(String(productId))) {
    throw new Error("A valid productId is required");
  }

  const db = await getAppDb();
  const doc = {
    userId: userId || null,
    sessionId: sessionId || null,
    productId: String(productId),
    interactionType,
    recommendationSessionId: recommendationSessionId || null,
    metadata: metadata && typeof metadata === "object" ? metadata : {},
    timestamp: new Date(),
  };

  await db.collection("aiProductInteractions").insertOne(doc);
  return doc;
}

export async function getRelevantInteractions({ userId, sessionId, productIds }) {
  const db = await getAppDb();
  const ownerFilters = [];

  if (userId) ownerFilters.push({ userId });
  if (sessionId) ownerFilters.push({ sessionId });
  if (!ownerFilters.length) return [];

  return db
    .collection("aiProductInteractions")
    .find({
      $or: ownerFilters,
      productId: { $in: productIds.map(String) },
    })
    .sort({ timestamp: -1 })
    .limit(200)
    .toArray();
}
