import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-10">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">PRIVACY POLICY</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Cityhood is built on the principle that your data belongs to you. This policy explains what we collect, why we collect it, and how we use it. It is written in plain language because privacy policies should be readable.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">WHAT DATA WE COLLECT</h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Cityhood collects the minimum amount of data needed to function. We do not sell your data, share it with advertisers, or use it for any purpose beyond running the platform.
              </p>
              <div className="space-y-3 pl-0">
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-bold text-foreground mb-1">GITHUB PUBLIC PROFILE DATA</p>
                  <p>When you search a username, we fetch publicly available data from the GitHub API. This includes your public repository list, contribution counts, follower numbers, and primary programming language. This data is already visible to anyone who visits your GitHub profile.</p>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <p className="font-bold text-foreground mb-1">USAGE DATA</p>
                  <p>We collect anonymous usage data to understand how people use Cityhood. This includes page views, search queries, and session duration. No personal identifiers are attached to this data.</p>
                </div>
                <div className="border-l-2 border-muted pl-4">
                  <p className="font-bold text-foreground mb-1">ACCOUNT DATA (WHEN YOU SIGN IN)</p>
                  <p>If you create an account, we store your GitHub username, your chosen display preferences, and your in-game inventory. We do not store passwords because authentication happens through GitHub OAuth.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">WHAT WE DO NOT COLLECT</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>We never access your private repositories. We never request write permissions to your GitHub account. We never collect your email address without your explicit consent. We never store your GitHub access token on our servers after your session ends.</p>
              <p>We do not run advertising networks, retargeting pixels, or third-party tracking scripts on Cityhood.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">HOW WE USE YOUR DATA</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>GitHub profile data is used to generate your pixel-art building in real time. Contribution counts determine building height. Programming language determines color. Repository count determines structural complexity.</p>
              <p>Usage data is used to improve the platform. We look at which features people use most, where they drop off, and what breaks. This helps us prioritize development.</p>
              <p>Account data is used to save your building customizations, track your coin balance, and remember your preferences between sessions.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">DATA STORAGE AND SECURITY</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Account data is stored in a secured database with access controls. We use industry-standard encryption for data in transit and at rest. We do not store payment card information because all transactions are handled by third-party payment providers.</p>
              <p>We retain account data for as long as your account is active. If you delete your account, your data is removed within 30 days.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">YOUR RIGHTS</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>You have the right to access the data we hold about you, request a copy of it, correct inaccurate information, and delete your account at any time.</p>
              <p>If you are in the European Economic Area, you have additional rights under GDPR, including the right to data portability and the right to object to certain types of processing.</p>
              <p>To exercise any of these rights, contact us at the address below. We respond to all privacy requests within 14 days.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">THIRD-PARTY SERVICES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood uses GitHub's public API to fetch developer data. GitHub's own privacy policy applies to data stored on their platform. We use their API in read-only mode and do not modify any GitHub data.</p>
              <p>We use Vercel for hosting. Vercel processes request logs as part of their infrastructure. Refer to Vercel's privacy policy for details on how they handle this data.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">CONTACT</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>Privacy questions, data requests, and concerns can be sent to:</p>
              <p className="mt-2">
                <a href="mailto:privacy@cityhood.fun" className="text-primary hover:text-accent transition-colors" data-testid="link-privacy-email">
                  privacy@cityhood.fun
                </a>
              </p>
              <p className="mt-3">We respond to all privacy-related emails within 14 days.</p>
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
