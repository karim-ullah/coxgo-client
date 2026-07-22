export function stripJsonFences(value) {
  return String(value || "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export function parseAiJson(value) {
  const cleaned = stripJsonFences(value);

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }

    throw new Error("AI returned malformed JSON");
  }
}

export function jsonError(message, status = 400, details) {
  return Response.json(
    {
      success: false,
      error: {
        message,
        details,
      },
    },
    { status }
  );
}
