import { NextResponse } from "next/server";
import { runTutor } from "@/lib/ai/tutor";
import type { TutorRequest } from "@/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<TutorRequest>;
    if (!body.question || !body.question.trim()) {
      return NextResponse.json({ error: "question is required" }, { status: 400 });
    }
    const result = await runTutor({
      userId: body.userId ?? "usr_student",
      track: body.track ?? "SSC",
      subject: body.subject ?? "General",
      topic: body.topic ?? "",
      language: body.language ?? "EN",
      question: body.question,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to generate tutor response" }, { status: 500 });
  }
}
