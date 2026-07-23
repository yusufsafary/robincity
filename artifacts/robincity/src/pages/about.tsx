import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-12">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3">ABOUT CITYHOOD</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Cityhood is a developer visualization platform that turns GitHub contribution data into a living pixel-art city. Every developer who has ever pushed code to GitHub has a building here.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">WHAT IS CITYHOOD?</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cityhood generates a unique pixel-art building for every GitHub developer based on their public contribution history. The more you contribute to open source, the taller your building becomes. The programming languages you use determine its color. The number of repositories you maintain shapes its structure.
              </p>
              <p>
                You do not need an account to explore. Search any GitHub username and see their building rendered in seconds using the free public GitHub API. No tokens required. No private data accessed.
              </p>
              <p>
                Claim your building to customize it, compete on the leaderboard, and earn coins through daily challenges. Cityhood is part visualization tool, part developer game.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">HOW BUILDINGS ARE GENERATED</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'HEIGHT', detail: 'Total contributions across all public repositories. Each commit, pull request, and issue adds to your floor count.' },
                { label: 'COLOR', detail: 'Your primary programming language determines the base color of your building. TypeScript is blue, Python is green, Rust is orange.' },
                { label: 'STRUCTURE', detail: 'The number of repositories you maintain affects the complexity of your building shape. More repos means more architectural detail.' },
                { label: 'FOLLOWERS', detail: 'Developer influence affects the glow and ambient lighting around your building. High-follower accounts have a distinct presence in the skyline.' },
              ].map((item) => (
                <div key={item.label} className="bg-card border border-border p-4">
                  <p className="text-xs font-bold text-primary mb-2">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">THE TECHNOLOGY</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cityhood uses the GitHub public REST API to fetch contribution data and repository information. All rendering happens client-side in your browser. There is no backend processing your data.
              </p>
              <p>
                The pixel-art buildings are generated algorithmically from a set of contribution metrics. No two developers have the exact same building because no two developers have the exact same GitHub history.
              </p>
              <p>
                The platform is built with React, TypeScript, and modern web APIs. It is optimized for both desktop and mobile browsers.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">OPEN SOURCE</h2>
            <div className="text-sm sm:text-base space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Cityhood is open source. The full codebase is on GitHub. Bug reports, feature requests, and pull requests are all welcome. We believe in building developer tools in public.
              </p>
              <a
                href="https://github.com/yusufsafary/robincity"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github-repo"
              >
                <Button size="lg" className="mt-2">
                  <Github className="w-5 h-5 mr-2" />
                  VIEW SOURCE ON GITHUB
                </Button>
              </a>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">DATA AND PRIVACY</h2>
            <div className="text-sm sm:text-base space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Cityhood only accesses public GitHub profile data. We never request write access, we never read private repositories, and we never store your GitHub token after your session ends. The data used to generate your building is already publicly visible on your GitHub profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/privacy">
                  <Button size="sm" variant="outline" data-testid="link-privacy-policy">PRIVACY POLICY</Button>
                </Link>
                <Link href="/cookies">
                  <Button size="sm" variant="outline" data-testid="link-cookie-policy">COOKIE POLICY</Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="pt-4 text-center">
            <Link href="/">
              <Button size="lg" data-testid="button-enter-city">
                SEARCH YOUR BUILDING
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
