import { handleRecommendationRequest } from "../route";

export async function POST(request) {
  return handleRecommendationRequest(request);
}
