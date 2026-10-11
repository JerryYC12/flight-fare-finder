import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// The app's single Supabase client. Import it like this:
//   import { supabase } from "@/integrations/supabase/client";
// Configured from Vite env vars (inlined at build time) — set these in .env locally
// and in the Vercel project's Environment Variables for deployments.
const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'];
// Supabase "publishable" key (sb_publishable_*), the successor of the anon key:
// browser-safe, access is enforced by Row Level Security.
const SUPABASE_PUBLISHABLE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'];

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ['VITE_SUPABASE_URL'] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ['VITE_SUPABASE_PUBLISHABLE_KEY'] : []),
  ];
  const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Set them in .env or in your Vercel project settings.`;
  console.error(`[Supabase] ${message}`);
  throw new Error(message);
}

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: {
    fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
  },
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
