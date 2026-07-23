import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Cookies() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-10">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">COOKIE POLICY</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 2026</p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. Cityhood uses cookies to keep the platform working, remember your preferences, and understand how developers use the site. This page explains exactly what cookies we use and why.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">ESSENTIAL COOKIES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Essential cookies are required for Cityhood to function. Without them, you cannot log in, maintain a session, or use any feature that requires authentication. These cookies cannot be disabled because disabling them would break the site.</p>
              <p>Examples of essential cookies we use:</p>
              <div className="space-y-2 mt-2">
                <div className="bg-card border border-border p-3">
                  <p className="font-bold text-foreground text-xs mb-1">SESSION_TOKEN</p>
                  <p className="text-xs">Keeps you logged in during your visit. Expires when you close your browser or after 30 days of inactivity.</p>
                </div>
                <div className="bg-card border border-border p-3">
                  <p className="font-bold text-foreground text-xs mb-1">CSRF_TOKEN</p>
                  <p className="text-xs">Protects your account from cross-site request forgery attacks. Required for any action that modifies your account data.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">FUNCTIONAL COOKIES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Functional cookies remember your preferences so you do not have to set them again every visit. Things like your graphics quality setting, whether you have muted the lofi player, and your chosen city viewing mode are stored in functional cookies.</p>
              <p>These cookies are optional. Disabling them means the site will not remember your preferences between visits, but it will still work correctly.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">ANALYTICS COOKIES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Analytics cookies help us understand how developers navigate Cityhood. We collect anonymous data about which pages people visit, how long they stay, and where they come from. No personally identifiable information is collected through analytics.</p>
              <p>We use this data to improve the platform. If many users leave the shop page without buying anything, that tells us the experience needs work. If the how-to page gets a lot of traffic, we know developers want clearer guidance.</p>
              <p>You can opt out of analytics cookies without losing any functionality. The site works identically with or without them.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">WHAT WE DO NOT DO</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>Cityhood does not use advertising cookies, retargeting cookies, or any third-party tracking scripts that report back to ad networks. We do not sell cookie data. We do not use cookies to build profiles about your behavior across other websites.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">HOW TO MANAGE COOKIES</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
              <p>You can control cookies through your browser settings. Most browsers let you view, block, or delete cookies for specific sites. Check your browser's help documentation for instructions.</p>
              <p>Common browser cookie settings:</p>
              <div className="space-y-1 mt-2 text-xs">
                <p><span className="text-foreground font-bold">Chrome:</span> Settings &gt; Privacy and Security &gt; Cookies and other site data</p>
                <p><span className="text-foreground font-bold">Firefox:</span> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</p>
                <p><span className="text-foreground font-bold">Safari:</span> Preferences &gt; Privacy &gt; Manage Website Data</p>
              </div>
              <p className="mt-3">Cityhood respects browser Do Not Track signals. If your browser is set to send DNT headers, we will not load optional analytics cookies.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">CONTACT</h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>Questions about how we use cookies can be sent to:</p>
              <p className="mt-2">
                <a href="mailto:privacy@cityhood.fun" className="text-primary hover:text-accent transition-colors" data-testid="link-privacy-email">
                  privacy@cityhood.fun
                </a>
              </p>
            </div>
          </section>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/">
              <Button size="lg" data-testid="button-back-home">BACK TO CITYHOOD</Button>
            </Link>
            <Link href="/privacy">
              <Button size="lg" variant="outline" data-testid="button-view-privacy">VIEW PRIVACY POLICY</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
