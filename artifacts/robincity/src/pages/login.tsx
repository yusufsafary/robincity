import { Github } from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo className="h-12" />
        </div>

        <div className="bg-card border-2 border-border p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">SIGN IN TO CITYHOOD</h1>
            <p className="text-sm text-muted-foreground">
              CONNECT YOUR GITHUB ACCOUNT TO CLAIM YOUR BUILDING
            </p>
          </div>

          <div className="bg-secondary border border-border px-4 py-3 text-xs text-center text-muted-foreground">
            GITHUB AUTH COMING SOON. SEARCH YOUR USERNAME TO PREVIEW YOUR BUILDING NOW.
          </div>

          <Link href="/">
            <Button
              size="lg"
              className="w-full"
              data-testid="button-search-instead"
            >
              <Github className="w-5 h-5 mr-2" />
              SEARCH YOUR USERNAME
            </Button>
          </Link>

          <div className="text-center text-xs text-muted-foreground">
            WE ONLY ACCESS YOUR PUBLIC GITHUB PROFILE DATA.
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/how-to"
            className="block text-sm hover:text-accent transition-colors"
            data-testid="link-how-it-works"
          >
            NEW TO CITYHOOD? LEARN HOW IT WORKS
          </Link>

          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/cookies" className="hover:text-foreground transition-colors" data-testid="link-cookies">
              COOKIES
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-foreground transition-colors" data-testid="link-about">
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
