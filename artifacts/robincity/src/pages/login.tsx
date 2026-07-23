import { Github } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function Login() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // If already logged in, redirect to home
  useEffect(() => {
    if (!loading && user) {
      setLocation(`/user/${user.username}`);
    }
  }, [user, loading, setLocation]);

  const handleGitHubLogin = () => {
    const redirect = new URLSearchParams(window.location.search).get('redirect') || '/';
    window.location.href = `/api/auth/github?redirect=${encodeURIComponent(redirect)}`;
  };

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

          <div className="bg-secondary border border-border px-4 py-3 text-xs text-center text-muted-foreground space-y-1">
            <div>WE ONLY ACCESS YOUR PUBLIC GITHUB PROFILE DATA.</div>
            <div>NO WRITE PERMISSIONS REQUESTED.</div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleGitHubLogin}
            disabled={loading}
            data-testid="button-signin-github"
          >
            <Github className="w-5 h-5 mr-2" />
            {loading ? 'CHECKING...' : 'SIGN IN WITH GITHUB'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">OR</span>
            </div>
          </div>

          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              data-testid="button-search-instead"
            >
              SEARCH USERNAME WITHOUT SIGNING IN
            </Button>
          </Link>
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
