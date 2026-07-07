// ============================================================
// AI provider selection + availability.
// Each wrapper falls back to a deterministic MOCK response when
// the relevant API key is missing (or mock mode is forced), so the
// whole app runs end-to-end without any external credentials.
// ============================================================

export const AI_KEYS = {
  openrouter: process.env.OPENROUTER_API_KEY,
  anthropic: process.env.ANTHROPIC_API_KEY,
  gemini: process.env.GOOGLE_GEMINI_API_KEY,
  openai: process.env.OPENAI_API_KEY,
  elevenlabs: process.env.ELEVENLABS_API_KEY,
  sarvam: process.env.SARVAM_API_KEY,
  vision: process.env.GOOGLE_VISION_API_KEY,
};

export function forcedMock(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_AI === "true";
}

/** Returns true when we should serve a mock response for a given key. */
export function shouldMock(key: keyof typeof AI_KEYS): boolean {
  return forcedMock() || !AI_KEYS[key];
}

/** Preferred text model provider for tutoring/reasoning. */
export function textProvider(): { name: string; mocked: boolean } {
  if (forcedMock()) return { name: "mock", mocked: true };
  if (AI_KEYS.anthropic) return { name: "claude-haiku", mocked: false };
  if (AI_KEYS.openrouter) return { name: "openrouter", mocked: false };
  if (AI_KEYS.gemini) return { name: "gemini-flash", mocked: false };
  return { name: "mock", mocked: true };
}

// Small deterministic helper so mock output feels varied but is stable.
export function seedFrom(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}
