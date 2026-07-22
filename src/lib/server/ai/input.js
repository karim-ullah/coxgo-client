export function cleanText(value, max = 800) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanLongText(value, max = 3000) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

export function cleanList(value, maxItems = 12, maxItemLength = 80) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(item, maxItemLength)).filter(Boolean).slice(0, maxItems);
  }

  return String(value || "")
    .split(",")
    .map((item) => cleanText(item, maxItemLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function cleanNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
