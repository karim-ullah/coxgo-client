"use server";

import { serverMutation } from "@/lib/core/server";

export const generateProductDescription = async (data) => {
  return serverMutation("/api/ai/product-description/generate", "POST", data);
};

export const regenerateProductDescription = async (data) => {
  return serverMutation("/api/ai/product-description/regenerate", "POST", data);
};

export const generateRecommendations = async (data) => {
  return serverMutation("/api/ai/recommendations", "POST", data);
};

export const refineRecommendations = async (data) => {
  return serverMutation("/api/ai/recommendations/refine", "POST", data);
};

export const sendRecommendationFeedback = async (data) => {
  return serverMutation("/api/ai/recommendations/feedback", "POST", data);
};
