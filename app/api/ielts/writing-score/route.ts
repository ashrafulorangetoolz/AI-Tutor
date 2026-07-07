import { NextResponse } from "next/server";
import { scoreWriting } from "@/lib/ai/ielts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.essay || !String(body.essay).trim()) {
      return NextResponse.json({ error: "essay is required" }, { status: 400 });
    }
    const result = await scoreWriting({
      taskType: body.taskType === "TASK1" ? "TASK1" : "TASK2",
      essay: body.essay,
      targetBand: Number(body.targetBand) || 7,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to score writing" }, { status: 500 });
  }
}
