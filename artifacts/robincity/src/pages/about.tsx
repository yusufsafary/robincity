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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">ABOUT ROBINCITY</h1>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">WHAT IS ROBINCITY?</h2>
            <div className="text-base sm:text-lg space-y-4 text-muted-foreground leading-relaxed">
              <p>
                RobinCity is a living, breathing visualisation of the global developer community. Every programmer who has ever pushed code to GitHub has a building in this city. The more you contribute, the taller your building grows.
              </p>
              <p>
                This is not just a profile page. It is a city where code is architecture, where contributions are measured in floors, and where every developer can see their place in the ecosystem.
              </p>
              <p>
                We built RobinCity because developers deserve to see their work rendered in 3D pixel-art glory. Because GitHub stats are better when they are buildings. Because the open-source community is massive, and it deserves a city.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">THE CITY</h2>
            <div className="text-base sm:text-lg space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Buildings are generated based on your contribution history using the free public GitHub API. Each commit, pull request, and issue adds to your structure. Different programming languages give your building different colours. More repositories means more floors.
              </p>
              <p>
                You can search any GitHub username to preview their building. Claim your building to customise it with rooftop items from the shop. The city grows every day as more developers contribute to open source.
              </p>
              <p>
                Districts form organically around popular repositories and organisations. The city is infinite. There is always room for more developers.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">THE TECHNOLOGY</h2>
            <div className="text-base sm:text-lg space-y-4 text-muted-foreground leading-relaxed">
              <p>
                RobinCity uses the free public GitHub API to pull contribution data and generate building geometry. No API key required. No private data accessed. Everything is based on publicly visible GitHub profiles.
              </p>
              <p>
                The city is rendered client-side using WebGL with Three.js, displaying thousands of buildings in real-time with instanced rendering and LOD systems.
              </p>
              <p>
                Your browser becomes the window into the city of code.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">THE TEAM</h2>
            <div className="text-base sm:text-lg space-y-4 text-muted-foreground leading-relaxed">
              <p>
                RobinCity was built by developers, for developers. We live in terminals, push code daily, and believe that contributions should be celebrated in style.
              </p>
              <p>
                Our mission is simple: make open source visible. Give every developer a place in the city. Turn GitHub profiles into architecture.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">OPEN SOURCE</h2>
            <div className="text-base sm:text-lg space-y-4 text-muted-foreground leading-relaxed">
              <p>
                RobinCity is open source. The rendering engine, the data pipeline, the shop system are all on GitHub. We believe in building in public.
              </p>
              <p>
                Contributions are welcome. Issues, pull requests, feature ideas, send them our way. Help us build the city.
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
