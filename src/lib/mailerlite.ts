/**
 * Shared MailerLite helper for site waitlist endpoints.
 *
 * Each waitlist API route (consulting / blueprint / tee / future drops) calls
 * the same MailerLite POST /api/subscribers endpoint with a different group ID
 * read from its own env var. Keeping the call here keeps the routes terse —
 * adding a new waitlist is ~25 lines of route code + a new env var.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Pull `email` out of either a JSON body or form-data POST. Returns the
 * trimmed string or null if the body couldn't be parsed.
 */
export async function parseEmailFromRequest(request: Request): Promise<string | null> {
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await request.json();
      return String((data as { email?: unknown })?.email || '').trim();
    }
    const form = await request.formData();
    return String(form.get('email') || '').trim();
  } catch {
    return null;
  }
}

export function isValidEmail(email: string): boolean {
  return !!email && EMAIL_RE.test(email) && email.length <= 254;
}

/**
 * Add a subscriber to a MailerLite group. Idempotent — MailerLite returns
 * 200/201 even if the email is already subscribed. Returns a structured
 * result the calling route translates to its own JSON response shape.
 *
 * `fields` lets callers attach custom subscriber data (name, company,
 * arbitrary text fields). MailerLite-side: built-in fields (name,
 * last_name, company, country, phone, city, state, zip) are accepted
 * directly; any other key must be defined as a custom field in the
 * MailerLite UI first or the upstream returns 422.
 */
export async function addSubscriberToGroup(
  email: string,
  groupId: string | undefined,
  apiKey: string,
  fields?: Record<string, string>,
): Promise<{ ok: true } | { ok: false; reason: string; upstreamStatus?: number }> {
  let resp: Response;
  try {
    resp = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        status: 'active',
        groups: groupId ? [groupId] : undefined,
        fields: fields && Object.keys(fields).length ? fields : undefined,
      }),
    });
  } catch (e) {
    console.error('[mailerlite] fetch threw:', e);
    return { ok: false, reason: 'network' };
  }

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    console.error('[mailerlite] upstream error', resp.status, text.slice(0, 400));
    return { ok: false, reason: 'upstream', upstreamStatus: resp.status };
  }
  return { ok: true };
}

/**
 * End-to-end handler for a waitlist endpoint. Each route just calls this
 * with its specific group ID env var. Returns a Response ready to return
 * from the API route.
 *
 * @param request The incoming Astro request.
 * @param apiKey The MailerLite API token (from Worker env).
 * @param groupId The MailerLite group ID this waitlist subscribes to.
 * @param waitlistLabel Short human label for error messages (e.g., "Consulting waitlist").
 */
export async function handleWaitlistSubmit(
  request: Request,
  apiKey: string | undefined,
  groupId: string | undefined,
  waitlistLabel: string,
  fields?: Record<string, string>,
): Promise<Response> {
  const email = await parseEmailFromRequest(request);
  if (email === null) {
    return jsonResponse({ error: 'Could not parse request body' }, 400);
  }
  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }
  if (!apiKey) {
    return jsonResponse(
      { error: `${waitlistLabel} temporarily unavailable. Please email contact@timraysby.com instead.` },
      500,
    );
  }
  const result = await addSubscriberToGroup(email, groupId, apiKey, fields);
  if (!result.ok) {
    const msg = result.reason === 'network'
      ? 'Could not reach the waitlist service. Try again in a moment.'
      : 'Subscription failed. Please try again or email contact@timraysby.com.';
    const status = result.reason === 'network' ? 502 : 502;
    return jsonResponse({ error: msg }, status);
  }
  return jsonResponse({ ok: true }, 200);
}

/**
 * Parse the request body as JSON OR form-data and return a string-typed
 * dict of all top-level keys. Used by endpoints that need more than just
 * the email field (consulting-waitlist accepts name/company/problem too).
 * Returns null on parse failure.
 */
export async function parseFormBody(request: Request): Promise<Record<string, string> | null> {
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await request.json();
      if (!data || typeof data !== 'object') return {};
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
        out[k] = String(v ?? '').trim();
      }
      return out;
    }
    const form = await request.formData();
    const out: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      out[k] = String(v).trim();
    }
    return out;
  } catch {
    return null;
  }
}
