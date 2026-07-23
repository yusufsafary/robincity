import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';

export default function Cookies() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">COOKIE POLICY</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">WHAT ARE COOKIES</h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Cookies are small text files stored on your device when you visit Cityhood. They help us remember your preferences, keep you logged in, and understand how you use the platform.
              </p>
              <p>
                We use cookies to make Cityhood work better for you. No tracking pixels, no ad networks, no data selling. Just the essentials.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">WHAT COOKIES WE USE</h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">ESSENTIAL COOKIES</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Required for the site to function. Authentication tokens, session management, security features. Without these, Cityhood breaks. These cookies are necessary and cannot be disabled.
                </p>
              </div>

              <div className="border-l-2 border-muted pl-6">
                <h3 className="text-xl font-bold mb-2">ANALYTICS COOKIES</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Help us understand how users navigate the city. Which features get used, where people spend time, what breaks. Anonymous data only. No personal identification. We use this to make Cityhood better.
                </p>
              </div>

              <div className="border-l-2 border-muted pl-6">
                <h3 className="text-xl font-bold mb-2">FUNCTIONAL COOKIES</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Remember your preferences. Graphics settings, sound volume, city mode, color themes. Make your experience smoother by remembering what you like.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">HOW TO MANAGE COOKIES</h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                You can control cookies through your browser settings. Most browsers let you block or delete cookies. Check your browser documentation for specific instructions.
              </p>
              <p>
                Note that blocking essential cookies will prevent you from logging in and using core features. Analytics and functional cookies can be disabled without breaking the site.
              </p>
              <p>
                We respect Do Not Track signals. If your browser sends DNT headers, we honor them.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">CONTACT</h2>
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>
                Questions about cookies or data handling? Reach out via GitHub issues or Discord. We respond to privacy concerns quickly.
              </p>
              <p className="mt-4">
                <a href="mailto:privacy@cityhood.dev" className="text-primary hover:text-accent transition-colors" data-testid="link-privacy-email">
                  privacy@cityhood.dev
                </a>
              </p>
            </div>
          </section>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>
              This policy is written in plain language because legal documents should be readable. If something is unclear, ask us.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
