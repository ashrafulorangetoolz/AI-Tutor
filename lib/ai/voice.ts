import { shouldMock } from "./provider";

/**
 * Text-to-speech (ElevenLabs for English, Sarvam AI for Bangla).
 * Returns an audio URL. In mock mode returns null so the UI can gracefully
 * fall back to the browser's SpeechSynthesis API.
 */
export async function textToSpeech(opts: {
  text: string;
  language: "EN" | "BN";
}): Promise<{ audioUrl: string | null; provider: string; mocked: boolean }> {
  const key = opts.language === "BN" ? "sarvam" : "elevenlabs";
  if (!shouldMock(key as "sarvam" | "elevenlabs")) {
    // Real TTS integration goes here.
  }
  return {
    audioUrl: null,
    provider: opts.language === "BN" ? "sarvam" : "elevenlabs",
    mocked: true,
  };
}

/** Speech-to-text via OpenAI Whisper. Mock returns a canned transcript. */
export async function speechToText(opts: {
  fileName?: string;
}): Promise<{ transcript: string; provider: string; mocked: boolean }> {
  if (!shouldMock("openai")) {
    // Real Whisper integration goes here.
  }
  return {
    transcript:
      "Well, I think studying abroad has many advantages. For example, students can experience a new culture and improve their language skills quickly.",
    provider: "whisper",
    mocked: true,
  };
}
