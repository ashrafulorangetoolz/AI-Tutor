import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true, redirect: "/login" });
  res.cookies.delete("ai_tutor_role");
  res.cookies.delete("ai_tutor_uid");
  return res;
}
