import { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Footer } from '@/components/footer';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 Not Found | Cityhood';
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-md"
        >
          <Logo className="h-10 mx-auto" />

          <div>
            <div className="text-6xl sm:text-8xl font-bold text-primary mb-3">404</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">BUILDING NOT FOUND</h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              This address does not exist in the city. The building may have been demolished or you took a wrong turn in the skyline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-back-home">
                BACK TO CITYHOOD
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-explore">
                EXPLORE THE CITY
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
