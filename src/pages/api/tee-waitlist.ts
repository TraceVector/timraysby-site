/**
 * POST /api/tee-waitlist — adds subscribers to the Flagship Tee waitlist
 * ("MY TOKENS. MY BUSINESS." merch, "Coming soon" on the shop page).
 * Env: MAILERLITE_API_KEY + MAILERLITE_TEE_GROUP_ID.
 * Shared logic lives in src/lib/mailerlite.ts.
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleWaitlistSubmit } from '../../lib/mailerlite';

export const prerender = false;

interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_TEE_GROUP_ID?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const e = env as Env;
  return handleWaitlistSubmit(
    request,
    e.MAILERLITE_API_KEY,
    e.MAILERLITE_TEE_GROUP_ID,
    'Tee waitlist',
  );
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
