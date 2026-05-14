/**
 * POST /api/consulting-waitlist
 *
 * Adds qualified consulting inquiries to the MailerLite consulting-waitlist
 * group. Accepts 4 fields: email (required), name (required), company
 * (optional), problem (required, "what are you trying to ship?").
 *
 * Custom fields stored on the subscriber in MailerLite:
 *   - name      (built-in)
 *   - company   (built-in)
 *   - problem   (CUSTOM — Tim must create this field in MailerLite settings
 *                under Subscribers → Fields, type=text, before this endpoint
 *                will succeed. Without it MailerLite returns 422.)
 *
 * Env (set via wrangler secret put):
 *   MAILERLITE_API_KEY
 *   MAILERLITE_CONSULTING_GROUP_ID
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import {
  EMAIL_RE,
  isValidEmail,
  jsonResponse,
  parseFormBody,
  addSubscriberToGroup,
} from '../../lib/mailerlite';

export const prerender = false;

interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_CONSULTING_GROUP_ID?: string;
}

// Field-length caps. Prevents abuse + matches what MailerLite accepts.
const MAX_NAME = 100;
const MAX_COMPANY = 200;
const MAX_PROBLEM = 5000;

export const POST: APIRoute = async ({ request }) => {
  const e = env as Env;

  const body = await parseFormBody(request);
  if (body === null) {
    return jsonResponse({ error: 'Could not parse request body' }, 400);
  }

  const email = body.email || '';
  const name = (body.name || '').slice(0, MAX_NAME);
  const company = (body.company || '').slice(0, MAX_COMPANY);
  const problem = (body.problem || '').slice(0, MAX_PROBLEM);

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }
  if (!name) {
    return jsonResponse({ error: 'Please enter your name.' }, 400);
  }
  if (!problem) {
    return jsonResponse({ error: 'Please tell me what you are trying to ship.' }, 400);
  }

  if (!e.MAILERLITE_API_KEY) {
    return jsonResponse(
      { error: 'Consulting waitlist temporarily unavailable. Please email contact@timraysby.com instead.' },
      500,
    );
  }

  const fields: Record<string, string> = { name };
  if (company) fields.company = company;
  fields.problem = problem;

  const result = await addSubscriberToGroup(
    email,
    e.MAILERLITE_CONSULTING_GROUP_ID,
    e.MAILERLITE_API_KEY,
    fields,
  );

  if (!result.ok) {
    const msg = result.reason === 'network'
      ? 'Could not reach the waitlist service. Try again in a moment.'
      : 'Subscription failed. Please try again or email contact@timraysby.com.';
    return jsonResponse({ error: msg }, 502);
  }
  return jsonResponse({ ok: true }, 200);
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
