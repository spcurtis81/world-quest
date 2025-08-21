export async function waitForHttp(
  url: string,
  opts?: { timeoutMs?: number; intervalMs?: number }
): Promise<void> {
  const timeoutMs = opts?.timeoutMs ?? 60_000; // was 20_000
  const intervalMs = opts?.intervalMs ?? 1_000; // was 500
  const start = Date.now();
  let tries = 0;
  let lastErr: unknown = null;

  while (Date.now() - start < timeoutMs) {
    tries++;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    if (tries % 5 === 0) {
      // eslint-disable-next-line no-console
      console.log(`[waitForHttp] still waiting: ${url} (tries=${tries}) last=${String(lastErr)}`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`waitForHttp timeout after ${timeoutMs}ms for ${url}. Last error: ${String(lastErr)}`);
}
