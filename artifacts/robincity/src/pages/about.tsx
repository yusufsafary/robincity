import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-12">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">ABOUT CITYHOOD</h1>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">WHAT IS CITYHOOD?</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cityhood turns your GitHub contribution history into a pixel-art building. Search any GitHub username and see their building generated in real time from their public commit data.
              </p>
              <p>
                The more you contribute, the taller your building. Different programming languages give your building different colors. More repositories mean more complex structures.
              </p>
              <p>
                We built Cityhood because GitHub stats are more interesting when they are buildings, and the open-source community deserves a city that shows how much work goes into it every day.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">THE CITY</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Buildings are generated using the free public GitHub API. Each commit, pull request, and issue adds to your structure. No login required to search or preview any building.
              </p>
              <p>
                Claim your building to customize it with rooftop items from the shop. Change colors, add decorations, and make your corner of the city uniquely yours.
              </p>
              <p>
                The city grows every day as more developers push code. There is always room for more buildings.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">THE TECHNOLOGY</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cityhood uses the free public GitHub API to pull contribution data and generate building geometry. No API key required. No private data accessed. Everything is based on publicly visible GitHub profiles.
              </p>
              <p>
                The city is rendered client-side in the browser. No account needed to explore.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">OPEN SOURCE</h2>
            <div className="text-sm sm:text-base space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cityhood is open source and built in public. Contributions, issues, and pull requests are welcome.
              </p>
            </div>
            <a
              href="https://github.com/yusufsafary/robincity"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-repo"
            >
              <Button size="lg" className="mt-4">
                <Github className="w-5 h-5 mr-2" />
                VIEW ON GITHUB
              </Button>
            </a>
          </section>

          <div className="pt-8 text-center">
            <Link href="/">
              <Button size="lg" data-testid="button-enter-city">
                SEARCH YOUR BUILDING
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
