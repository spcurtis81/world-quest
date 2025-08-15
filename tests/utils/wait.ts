export async function waitForHttp(
  url: string,
  opts?: { timeoutMs?: number; intervalMs?: number }
): Promise<void> {
  const timeoutMs = opts?.timeoutMs ?? 20_000;
  const intervalMs = opts?.intervalMs ?? 500;
  const start = Date.now();
  let tries = 0, lastErr: unknown = undefined;

  while (Date.now() - start < timeoutMs) {
    tries++;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    if (tries % 10 === 0) {
      // eslint-disable-next-line no-console
      console.log(`[waitForHttp] still waiting: ${url} (tries=${tries})`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`waitForHttp timeout after ${timeoutMs}ms for ${url}. Last error: ${String(lastErr)}`);
}
