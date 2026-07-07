import { NextResponse } from "next/server";
import { solveDoubt } from "@/lib/ai/tutor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.question || !String(body.question).trim()) {
      return NextResponse.json({ error: "question is required" }, { status: 400 });
    }
    const result = await solveDoubt({
      userId: body.userId ?? "usr_student",
      language: body.language ?? "EN",
      subject: body.subject,
      question: body.question,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to solve doubt" }, { status: 500 });
  }
}
