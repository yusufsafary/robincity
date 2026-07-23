import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
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
            <Link href="/cookies" className="hover:text-foreground transition-colors" data-testid="link-footer-cookies">
              COOKIES
            </Link>
          </nav>
          <div className="text-xs">
            BUILT BY @ROBINCITYDEV
          </div>
        </div>
      </div>
    </footer>
  );
}
