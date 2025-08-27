export const dynamic = "force-static";
export const runtime = "nodejs";
export const preferredRegion = "auto";

export async function GET() {
  return Response.json(
    { status: "ok", time: new Date().toISOString() },
    { headers: { "cache-control": "no-store, no-cache, must-revalidate" } }
  );
}