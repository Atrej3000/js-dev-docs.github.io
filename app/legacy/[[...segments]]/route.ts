import { NextResponse } from "next/server";

import { serveLegacyFile } from "@/src/modules/legacy/runtime.server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segments?: string[] }> },
) {
  const resolvedParams = await params;
  const segments =
    resolvedParams.segments && resolvedParams.segments.length
      ? resolvedParams.segments
      : ["uk", "index.html"];

  const normalizedSegments =
    segments.length === 1 && segments[0] === "uk" ? ["uk", "index.html"] : segments;

  const response = serveLegacyFile(normalizedSegments);
  return response ?? NextResponse.json({ error: "Not found" }, { status: 404 });
}
