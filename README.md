# flight-fare-finder

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/104232e8-b409-4486-9180-e167d21127ee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
bun install   # or: npm i
bun run dev   # or: npm run dev
```

## Architecture

A plain **Vite + React** single-page app (no SSR):

- `index.html` → `src/main.tsx` mounts the app.
- Client-side routing with **React Router** (`src/app/routes.tsx`):
  `/` (landing), `/sign-in`, `/sign-up`, `/app` (requires login; legacy `/auth?mode=…` redirects).
- Auth via the project's own Supabase project (`src/integrations/supabase/client.ts`,
  the single client instance), configured from env vars inlined at build time.

## Environment variables

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://wcymkihqbhqiziktwhnl.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | the project's `sb_publishable_…` key (Supabase → Project Settings → API Keys) |

The publishable key replaces the legacy "anon" key: it is browser-safe and access is
enforced by Row Level Security. Locally these live in `.env`; on Vercel add the same two
variables under Project → Settings → Environment Variables.

## Deploying to Vercel

`vite build` emits a static site to `dist/`. `vercel.json` sets the Vite preset,
output directory, and an SPA fallback rewrite so deep links like `/app` load
`index.html` and are resolved client-side.
