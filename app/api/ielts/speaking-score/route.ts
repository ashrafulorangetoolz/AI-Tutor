import { NextResponse } from "next/server";
import { scoreSpeaking } from "@/lib/ai/ielts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.transcript && !body.audioFileName) {
      return NextResponse.json(
        { error: "transcript or audioFile is required" },
        { status: 400 },
      );
    }
    const result = await scoreSpeaking({
      transcript: body.transcript,
      audioFileName: body.audioFileName,
      question: body.question ?? "Describe a memorable journey you have taken.",
      targetBand: Number(body.targetBand) || 7,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to score speaking" }, { status: 500 });
  }
}
