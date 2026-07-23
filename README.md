# RobinCity

Your GitHub profile as a living 3D pixel-art city. Every developer who has ever committed code has a building. The size of your building reflects the size of your contributions.

## Stack

- React + Vite (TypeScript)
- Tailwind CSS
- Framer Motion
- Wouter (routing)
- pnpm workspaces

## Development

```bash
pnpm install
pnpm --filter @workspace/robincity run dev
```

## Deploy

Configured for Vercel. Push to GitHub and connect via the Vercel dashboard, or use the Vercel CLI:

```bash
vercel --prod
```

## Pages

- `/` — City home with animated pixel skyline and GitHub username search
- `/shop` — Building customization items
- `/leaderboard` — Developer and game leaderboards
- `/about` — About RobinCity
- `/how-to` — Getting started guide
- `/cookies` — Cookie policy
- `/login` — Sign in with GitHub
