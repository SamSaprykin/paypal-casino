/** Plain text helpers for portable-text-shaped JSON (legacy blog blocks). */
export function portableTextToPlainText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  const parts: string[] = [];
  for (const block of value) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    const type = b._type;

    if (type === "block" && Array.isArray(b.children)) {
      for (const ch of b.children) {
        if (ch && typeof ch === "object" && "text" in ch) {
          parts.push(String((ch as { text?: string }).text ?? ""));
        }
      }
      parts.push("\n");
    }
  }
  return parts.join("").trim();
}

export function portableTextApproxMinutes(blocks: unknown, wpm = 200): number {
  const words = portableTextToPlainText(blocks)
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}
