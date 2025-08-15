export async function GET() {
  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/v1/ping";
  try { const r = await fetch(url, { cache: "no-store" }); const data = await r.json();
    return new Response(JSON.stringify({ ok:true, data }), { headers:{ "content-type":"application/json" }});
  } catch (e) { return new Response(JSON.stringify({ ok:false, error:String(e) }), { status:500, headers:{ "content-type":"application/json" }}); }
}
