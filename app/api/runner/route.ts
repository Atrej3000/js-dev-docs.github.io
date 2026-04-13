export async function GET() {
  return Response.json(
    {
      enabled: false,
      status: "reserved",
      message:
        "The /api/runner namespace is intentionally reserved for a future safe execution layer and is not active in this migration wave.",
    },
    { status: 501 },
  );
}
