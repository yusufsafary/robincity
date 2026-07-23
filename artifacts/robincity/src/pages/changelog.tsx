import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const entries = [
  {
    version: 'v0.9.0',
    date: 'July 2026',
    tag: 'MAJOR',
    tagColor: 'hsl(75 100% 60%)',
    title: 'Explore page, OG sharing, and mobile overhaul',
    items: [
      'Added /explore page to browse featured developer buildings',
      'Real OG image now shows when you share cityhood.fun on social media',
      'Full mobile-first layout pass across all pages',
      'Improved touch targets throughout navigation and shop',
      'Added changelog page (you are here)',
      'Canonical URL and sitemap coverage for all routes',
    ],
  },
  {
    version: 'v0.8.0',
    date: 'June 2026',
    tag: 'FEATURE',
    tagColor: 'hsl(213 90% 60%)',
    title: 'Leaderboard dual view and game tab',
    items: [
      'Leaderboard now has Developer and Game views',
      'Game leaderboard tracks Flight and Speedrun challenges',
      'Language-coded badges on all developer entries',
      'Rank badge colors for top 3 positions',
    ],
  },
  {
    version: 'v0.7.0',
    date: 'May 2026',
    tag: 'FEATURE',
    tagColor: 'hsl(213 90% 60%)',
    title: 'Shop preview and rarity system',
    items: [
      '16 shop items across Rooftop and Building slots',
      'Live building preview panel on desktop',
      'COMMON, RARE, EPIC rarity tiers',
      'Free items available without sign-in',
      'Color picker for custom building colors',
    ],
  },
  {
    version: 'v0.6.0',
    date: 'April 2026',
    tag: 'FEATURE',
    tagColor: 'hsl(213 90% 60%)',
    title: 'User building pages with live GitHub data',
    items: [
      'Search any GitHub username and see their building rendered in real time',
      'Building height calculated from public repos and followers',
      'Top 6 repos listed with language, stars, and forks',
      'Language color system covering 10 major languages',
      'Error handling for rate limits and 404 usernames',
    ],
  },
  {
    version: 'v0.5.0',
    date: 'March 2026',
    tag: 'CORE',
    tagColor: 'hsl(55 100% 55%)',
    title: 'City skyline and terminal intro',
    items: [
      'Animated pixel-art skyline on home page',
      'Terminal loading sequence with typewriter effect',
      'LoFi player widget (interface only)',
      'City sleeping mode toggle',
      'Live badge in top navigation bar',
    ],
  },
  {
    version: 'v0.4.0',
    date: 'February 2026',
    tag: 'CORE',
    tagColor: 'hsl(55 100% 55%)',
    title: 'Routing and page foundation',
    items: [
      'Wouter-based client-side routing with base path support',
      'Home, About, How-To, Shop, Leaderboard, Login pages',
      'Privacy policy, terms of service, and cookie policy',
      'Not-found page with search redirect',
      'Footer with full link coverage',
    ],
  },
  {
    version: 'v0.3.0',
    date: 'January 2026',
    tag: 'CORE',
    tagColor: 'hsl(55 100% 55%)',
    title: 'Design system and dark city theme',
    items: [
      'Share Tech Mono font throughout',
      'Dark city color palette: lime green on near-black',
      'Zero border radius for the pixel-art aesthetic',
      'Framer Motion animations on page entry and building renders',
      'shadcn/ui component library integration',
    ],
  },
  {
    version: 'v0.1.0',
    date: 'December 2025',
    tag: 'LAUNCH',
    tagColor: 'hsl(0 100% 60%)',
    title: 'Initial concept and repo setup',
    items: [
      'Project scaffolded on Replit with pnpm workspace',
      'React + Vite + TypeScript + Tailwind CSS',
      'Vercel deployment connected to cityhood.fun',
      'Repository made public on GitHub',
    ],
  },
];

export default function Changelog() {
  useEffect(() => {
    document.title = 'Changelog | Cityhood';
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 mb-10 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold">CHANGELOG</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every update to Cityhood, newest first.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-3 sm:ml-4 hidden sm:block" />

          <div className="space-y-10">
            {entries.map((entry) => (
              <div key={entry.version} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-col items-center shrink-0 w-8">
                  <div
                    className="w-2 h-2 mt-2 border"
                    style={{ background: entry.tagColor, borderColor: entry.tagColor }}
                  />
                </div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-base font-bold">{entry.version}</span>
                    <span
                      className="text-xs px-2 py-0.5 font-bold"
                      style={{ color: entry.tagColor, border: `1px solid ${entry.tagColor}50`, background: `${entry.tagColor}15` }}
                    >
                      {entry.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>

                  <div className="bg-card border border-border p-4 sm:p-5">
                    <h2 className="font-bold text-sm sm:text-base mb-3">{entry.title.toUpperCase()}</h2>
                    <ul className="space-y-2">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm text-muted-foreground">
                          <span style={{ color: entry.tagColor }} className="shrink-0 mt-0.5">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link href="/">
            <Button size="lg" data-testid="button-back-home">BACK TO CITYHOOD</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
