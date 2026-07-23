import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <div className="text-destructive text-6xl md:text-8xl font-bold">
            FATAL: ROUTE NOT FOUND
          </div>
          <div className="text-xl md:text-2xl text-muted-foreground font-mono">
            $ cd ~
          </div>
          <div className="text-muted-foreground">
            THE PATH YOU REQUESTED DOES NOT EXIST IN THE CITY.
          </div>
        </div>

        <Link href="/">
          <Button size="lg" data-testid="button-back-to-city">
            BACK TO CITY
          </Button>
        </Link>
      </div>
    </div>
  );
}
