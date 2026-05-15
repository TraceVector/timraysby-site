/**
 * POST /api/newsletter-subscribe — adds subscribers to the weekly newsletter
 * (the Sunday 8 AM ET send Tim has been running since 2026-04-12).
 * Env: MAILERLITE_API_KEY + MAILERLITE_NEWSLETTER_GROUP_ID.
 * Shared logic lives in src/lib/mailerlite.ts.
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleWaitlistSubmit } from '../../lib/mailerlite';

export const prerender = false;

interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_NEWSLETTER_GROUP_ID?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const e = env as Env;
  return handleWaitlistSubmit(
    request,
    e.MAILERLITE_API_KEY,
    e.MAILERLITE_NEWSLETTER_GROUP_ID,
    'Newsletter',
  );
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
