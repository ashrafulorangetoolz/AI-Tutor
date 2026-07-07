import type {
  WritingScoreRequest,
  WritingScoreResponse,
  SpeakingScoreRequest,
  SpeakingScoreResponse,
} from "@/types";
import { seedFrom, shouldMock } from "./provider";

function band(value: number): number {
  // clamp to 0..9 and round to nearest 0.5
  return Math.max(0, Math.min(9, Math.round(value * 2) / 2));
}

export async function scoreWriting(
  req: WritingScoreRequest,
): Promise<WritingScoreResponse> {
  if (!shouldMock("anthropic")) {
    // Real examiner-model integration goes here.
  }

  const words = req.essay.trim().split(/\s+/).filter(Boolean).length;
  const seed = seedFrom(req.essay);

  // Heuristic mock: reward longer, more varied essays; cap near target band.
  const base = Math.min(8, 4 + words / 90);
  const ta = band(base + ((seed % 3) - 1) * 0.5);
  const cc = band(base + (((seed >> 2) % 3) - 1) * 0.5);
  const lr = band(base + (((seed >> 4) % 3) - 1) * 0.5);
  const gr = band(base + (((seed >> 6) % 3) - 1) * 0.5);
  const estimated = band((ta + cc + lr + gr) / 4);

  return {
    estimatedBand: estimated,
    taskAchievement: ta,
    coherenceCohesion: cc,
    lexicalResource: lr,
    grammar: gr,
    improvementSuggestions: [
      words < 250 && req.taskType === "TASK2"
        ? "Reach at least 250 words for Task 2 — underlength answers are penalised."
        : "Support each main idea with a specific example or reason.",
      "Use a wider range of linking devices (however, consequently, in contrast) without overusing them.",
      "Vary sentence structures — mix complex and compound sentences to lift your Grammar band.",
      "Replace repeated common words with precise academic vocabulary (e.g. 'significant' → 'substantial').",
    ],
    rewrittenSample:
      "Improved opening: \"" +
      req.essay.split(/[.!?]/)[0].trim().slice(0, 120) +
      "\" → \"There is ongoing debate about this issue. This essay will argue that, on balance, the benefits outweigh the drawbacks, for two key reasons.\"",
    mocked: true,
  };
}

export async function scoreSpeaking(
  req: SpeakingScoreRequest,
): Promise<SpeakingScoreResponse> {
  if (!shouldMock("openai")) {
    // Real Whisper transcription + examiner-model scoring goes here.
  }

  const source = req.transcript || req.audioFileName || req.question;
  const seed = seedFrom(source);
  const wordCount = (req.transcript || "").split(/\s+/).filter(Boolean).length;
  const base = Math.min(8, 5 + wordCount / 120);

  const fluency = band(base + ((seed % 3) - 1) * 0.5);
  const pronunciation = band(base + (((seed >> 2) % 3) - 1) * 0.5);
  const grammar = band(base + (((seed >> 4) % 3) - 1) * 0.5);
  const vocabulary = band(base + (((seed >> 6) % 3) - 1) * 0.5);

  return {
    fluency,
    pronunciation,
    grammar,
    vocabulary,
    estimatedBand: band((fluency + pronunciation + grammar + vocabulary) / 4),
    improvementTips: [
      "Extend your answers — aim for 3–4 sentences per response with reasons and examples.",
      "Reduce filler words ('um', 'you know') to improve fluency and coherence.",
      "Practice minimal pairs to sharpen pronunciation of tricky sounds.",
      "Introduce topic-specific vocabulary and idiomatic phrases naturally.",
    ],
    mocked: true,
  };
}
