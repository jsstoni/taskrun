const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isJson = (headers: Headers) =>
  headers.get('content-type')?.includes('application/json');

const isHtml = (headers: Headers) =>
  headers.get('content-type')?.includes('text/html');

const shouldRetry = (status?: number) =>
  status === undefined || (status >= 500 && status < 600);

const MAX_RETRIES = 3;
const FIXED_RETRY_DELAY = 300;
const FETCH_TIMEOUT = 8000;

function extractHeaders(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export async function sf(
  url: string,
  options: RequestInit = {}
): Promise<
  | {
      success: true;
      data: string | object;
      headers: Record<string, string>;
      ms: number;
    }
  | {
      success: false;
      error: string | object;
      headers?: Record<string, string>;
      ms: number;
    }
> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    const start = performance.now();

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      const ms = Math.round(performance.now() - start);

      const raw = await res.text().catch(() => '');
      const headers = extractHeaders(res.headers);

      if (isHtml(res.headers)) {
        return {
          success: false,
          error: 'HTML responses are not allowed',
          headers,
          ms,
        };
      }

      const data = isJson(res.headers)
        ? (() => {
            try {
              return JSON.parse(raw);
            } catch {
              return raw;
            }
          })()
        : raw;

      if (res.ok) {
        return { success: true, data, headers, ms };
      }

      if (!shouldRetry(res.status) || attempt === MAX_RETRIES) {
        return { success: false, error: data, headers, ms };
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      const ms = Math.round(performance.now() - start);

      const isTimeout = err.name === 'AbortError';
      const errorMsg = isTimeout
        ? 'Request timed out'
        : (err?.message ?? 'Network error');

      if (attempt === MAX_RETRIES || !isTimeout) {
        return {
          success: false,
          error: errorMsg,
          ms,
        };
      }

      await delay(FIXED_RETRY_DELAY);
    }
  }

  return { success: false, error: 'Unknown error', ms: 0 };
}
