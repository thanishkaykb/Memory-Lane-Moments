# TimeCapsule

A virtual disposable camera for weddings, parties, and family gatherings.
Everyone snaps photos & videos in-app, they stay sealed until the host's
reveal time, then the whole album unwraps together.

## Stack
- TanStack Start (React 19 + Vite 7)
- Tailwind CSS v4
- Supabase (Lovable Cloud): Auth, Postgres + RLS, Storage

## Local development

```bash
bun install
bun run dev
```

Required env vars (already configured in `.env` for Lovable previews):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # server only, never expose
```

## Deploying to Vercel

This repo includes a `vercel.json` that switches the Nitro build target to
the Vercel preset.

1. Import the GitHub repo into Vercel.
2. In **Project Settings → Environment Variables**, add the variables above
   (mark `SUPABASE_SERVICE_ROLE_KEY` as a server-only secret).
3. Leave the framework preset as **Other** — `vercel.json` drives the build.
4. Deploy. Subsequent pushes auto-deploy.

The build command is `bun run build` with `NITRO_PRESET=vercel`, producing
`.vercel/output` which Vercel serves directly.

## Features

- Email/password + Google sign-in
- Host creates an event; a unique 6-character code is generated
- Guests join with the code, take photos/videos in-app or upload from gallery
- Everything stays hidden — even from the uploader — until the host's reveal time
- After reveal: full gallery, per-photo or multi-select downloads, full ZIP album
- Only the host can edit the event name, edit the reveal time, see who took
  each photo, see the full guest list, or delete the event
- Photos never disappear when a guest deletes their account — uploads belong
  to the event, not the user
