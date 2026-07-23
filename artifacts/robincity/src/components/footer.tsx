import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-6">

          {/* Top row: nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors" data-testid="link-footer-about">
              ABOUT
            </Link>
            <Link href="/how-to" className="hover:text-foreground transition-colors" data-testid="link-footer-howto">
              HOW TO PLAY
            </Link>
            <Link href="/leaderboard" className="hover:text-foreground transition-colors" data-testid="link-footer-leaderboard">
              LEADERBOARD
            </Link>
            <Link href="/shop" className="hover:text-foreground transition-colors" data-testid="link-footer-shop">
              SHOP
            </Link>
          </div>

          {/* Bottom row: legal links + credit */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground border-t border-border pt-6">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                TERMS OF SERVICE
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors" data-testid="link-footer-cookies">
                COOKIE POLICY
              </Link>
            </div>
            <div className="shrink-0">
              CITYHOOD &copy; {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
