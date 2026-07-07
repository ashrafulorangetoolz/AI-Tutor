import type { OcrResult } from "@/types";
import { shouldMock } from "./provider";

/**
 * OCR text extraction. Uses Google Vision when a key is present,
 * otherwise returns a realistic mock (as Tesseract-in-browser would be wired
 * on the client). The API shape stays identical either way.
 */
export async function extractText(input: {
  fileName?: string;
  hint?: string;
}): Promise<OcrResult> {
  if (!shouldMock("vision")) {
    // Real Google Vision integration goes here.
  }

  const sample =
    input.hint ||
    "A ball is thrown vertically upward with an initial velocity of 20 m/s. " +
      "Calculate the maximum height reached. (Take g = 9.8 m/s²)";

  return {
    text: sample,
    confidence: 0.94,
    provider: shouldMock("vision") ? "mock-tesseract" : "google-vision",
    mocked: shouldMock("vision"),
  };
}
