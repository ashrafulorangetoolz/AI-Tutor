import { NextResponse } from "next/server";
import { extractText } from "@/lib/ai/ocr";

export async function POST(req: Request) {
  try {
    // Accept either JSON { fileName, hint } or multipart form-data with a file.
    let fileName: string | undefined;
    let hint: string | undefined;

    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      fileName = body.fileName;
      hint = body.hint;
    } else if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (file && typeof file === "object" && "name" in file) {
        fileName = (file as File).name;
      }
    }

    const result = await extractText({ fileName, hint });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "OCR extraction failed" }, { status: 500 });
  }
}
