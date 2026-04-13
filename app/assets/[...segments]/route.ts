import { NextResponse } from "next/server";

import { serveLegacyFile } from "@/src/modules/legacy/runtime.server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await params;
  const response = serveLegacyFile(["assets", ...segments]);
  return response ?? NextResponse.json({ error: "Not found" }, { status: 404 });
}
