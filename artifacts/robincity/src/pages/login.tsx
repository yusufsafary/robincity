import { Github } from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Login() {
  const handleGitHubLogin = () => {
    // In a real app, this would redirect to GitHub OAuth
    window.location.href = '/api/auth/github';
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo className="h-12" />
        </div>

        {/* Card */}
        <div className="bg-card border-2 border-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">SIGN IN TO ROBINCITY</h1>
            <p className="text-sm text-muted-foreground">
              CONNECT YOUR GITHUB ACCOUNT TO CLAIM YOUR BUILDING
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleGitHubLogin}
            data-testid="button-signin-github"
          >
            <Github className="w-5 h-5 mr-2" />
            SIGN IN WITH GITHUB
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            WE ONLY ACCESS YOUR PUBLIC GITHUB PROFILE DATA.
          </div>
        </div>

        {/* Links */}
        <div className="text-center space-y-4">
          <Link href="/how-to" className="block text-sm hover:text-accent transition-colors" data-testid="link-how-it-works">
            NEW TO ROBINCITY? LEARN HOW IT WORKS →
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
