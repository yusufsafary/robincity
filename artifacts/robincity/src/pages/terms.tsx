import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Terms() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-10">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">TERMS OF SERVICE</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            These terms govern your use of Cityhood. By using the platform, you agree to them. If you disagree with any part, you should stop using Cityhood. We have written these terms in plain language because that is what a fair agreement looks like.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">USING CITYHOOD</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood is a web platform that visualizes GitHub contribution data as pixel-art buildings. You can search any public GitHub username to preview their building without creating an account. Creating an account allows you to claim your building and customize it.</p>
              <p>You must be at least 13 years old to use Cityhood. If you are under 18, you confirm that you have permission from a parent or guardian.</p>
              <p>You are responsible for keeping your account credentials secure. Do not share your login details with anyone. If you suspect your account has been compromised, contact us immediately.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">ACCEPTABLE USE</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood is for individual developers and teams who want to visualize their GitHub activity. You may not use Cityhood to scrape data at scale, run automated bots that generate excessive API requests, or attempt to access or modify other users accounts.</p>
              <p>You may not use Cityhood for any activity that is illegal, harmful, or abusive toward other users. We reserve the right to suspend or terminate accounts that violate these guidelines without prior notice.</p>
              <p>All data displayed in Cityhood is sourced from the public GitHub API. We do not store or redistribute private repository data.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">VIRTUAL CURRENCY AND SHOP ITEMS</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood includes an in-game coin system and a shop where you can purchase visual customizations for your building. Coins can be earned through gameplay or purchased directly.</p>
              <p>Purchased coins and shop items are linked to your account and are non-transferable. They have no real-world monetary value and cannot be exchanged for cash or refunded, except where required by applicable consumer law.</p>
              <p>We reserve the right to adjust coin prices, modify shop items, and change the game economy at any time. We will announce significant changes in advance when possible.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">INTELLECTUAL PROPERTY</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>The Cityhood platform, including its design, code, and visual assets, is owned by Cityhood and protected by applicable intellectual property laws. You may not copy, redistribute, or create derivative works from our platform without written permission.</p>
              <p>Your GitHub contribution data belongs to you. We use it only to generate your building visualization and do not claim ownership over it.</p>
              <p>The Cityhood source code is available on GitHub under an open-source license. Contributions to the codebase are welcome and governed by the repository's license terms.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">DISCLAIMER OF WARRANTIES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood is provided as-is. We do not guarantee that the platform will be available at all times, free from errors, or that building visualizations will be 100 percent accurate at all times due to GitHub API limitations and rate limits.</p>
              <p>We are not responsible for any data loss, interruption of service, or inaccuracies in GitHub data that we display. We do our best to keep things running smoothly, but we cannot guarantee uptime or accuracy.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">CHANGES TO THESE TERMS</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>We may update these terms from time to time. When we make significant changes, we will post a notice on the platform and update the date at the top of this page. Continuing to use Cityhood after changes are posted means you accept the updated terms.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">CONTACT</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>Questions about these terms can be sent to:</p>
              <p className="mt-2">
                <a href="mailto:legal@cityhood.fun" className="text-primary hover:text-accent transition-colors" data-testid="link-legal-email">
                  legal@cityhood.fun
                </a>
              </p>
            </div>
          </section>

          <div className="pt-4">
            <Link href="/">
              <Button size="lg" data-testid="button-back-home">BACK TO CITYHOOD</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
