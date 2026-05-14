/**
 * POST /api/consulting-waitlist
 *
 * Receives an email from the consulting page's "Notify Me" form and adds
 * the subscriber to a MailerLite group (the consulting waitlist).
 *
 * Env vars (set via `wrangler secret put`):
 *   MAILERLITE_API_KEY              — secret. Bearer token for MailerLite.
 *   MAILERLITE_CONSULTING_GROUP_ID  — string. The group to add subscribers to.
 *
 * Returns:
 *   200 { ok: true }                 — added or already-subscribed
 *   400 { error: "..." }             — invalid email
 *   500 { error: "..." }             — server misconfigured (missing key)
 *   502 { error: "..." }             — MailerLite upstream error
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_CONSULTING_GROUP_ID?: string;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Parse — accept both form-data and JSON for flexibility.
  let email = '';
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await request.json();
      email = String((data as { email?: unknown })?.email || '').trim();
    } else {
      const form = await request.formData();
      email = String(form.get('email') || '').trim();
    }
  } catch {
    return jsonResponse({ error: 'Could not parse request body' }, 400);
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }

  const env = ((locals as { runtime?: { env?: Env } })?.runtime?.env) || {};
  const apiKey = env.MAILERLITE_API_KEY;
  const groupId = env.MAILERLITE_CONSULTING_GROUP_ID;

  if (!apiKey) {
    return jsonResponse(
      { error: 'Consulting waitlist temporarily unavailable. Please email contact@timraysby.com instead.' },
      500
    );
  }

  // Call MailerLite v2 (current). The /api/subscribers endpoint is idempotent —
  // returns the existing subscriber if the email already exists.
  let mlResp: Response;
  try {
    mlResp = await fetch('https://connect.mailerlite.com/api/subscribers', {
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
      }),
    });
  } catch (e) {
    console.error('[consulting-waitlist] MailerLite fetch threw:', e);
    return jsonResponse({ error: 'Could not reach the waitlist service. Try again in a moment.' }, 502);
  }

  if (!mlResp.ok) {
    const text = await mlResp.text().catch(() => '');
    console.error('[consulting-waitlist] MailerLite error', mlResp.status, text.slice(0, 400));
    // Don't leak upstream details to the caller.
    return jsonResponse({ error: 'Subscription failed. Please try again or email contact@timraysby.com.' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
