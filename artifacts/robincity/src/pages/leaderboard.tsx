import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const topDevelopers = [
  { rank: 1, name: 'Sarah Chen', handle: 'sarahdev', language: 'TypeScript', contributions: 12847 },
  { rank: 2, name: 'Alex Rodriguez', handle: 'alexcodes', language: 'Rust', contributions: 11523 },
  { rank: 3, name: 'Maya Patel', handle: 'mayapatel', language: 'Go', contributions: 10891 },
  { rank: 4, name: 'Jordan Kim', handle: 'jordankim', language: 'Python', contributions: 9734 },
  { rank: 5, name: 'Chris Mueller', handle: 'cmueller', language: 'JavaScript', contributions: 9102 },
  { rank: 6, name: 'Priya Sharma', handle: 'priyacode', language: 'Java', contributions: 8765 },
  { rank: 7, name: 'Marcus Johnson', handle: 'mjohnson', language: 'C++', contributions: 8234 },
  { rank: 8, name: 'Elena Ivanova', handle: 'eivanova', language: 'Python', contributions: 7891 },
  { rank: 9, name: 'David Lee', handle: 'dlee', language: 'Go', contributions: 7456 },
  { rank: 10, name: 'Sophie Martin', handle: 'smartin', language: 'TypeScript', contributions: 7123 },
  { rank: 11, name: 'Ahmed Hassan', handle: 'ahassan', language: 'Rust', contributions: 6890 },
  { rank: 12, name: 'Lisa Wang', handle: 'lwang', language: 'Python', contributions: 6567 },
  { rank: 13, name: 'Tom Anderson', handle: 'tanderson', language: 'JavaScript', contributions: 6234 },
  { rank: 14, name: 'Nina Petrov', handle: 'npetrov', language: 'C++', contributions: 5901 },
  { rank: 15, name: 'Carlos Silva', handle: 'csilva', language: 'Java', contributions: 5678 },
];

export default function Leaderboard() {
  const [view, setView] = useState<'developers' | 'game'>('developers');
  const [devTab, setDevTab] = useState('contributors');
  const [gameTab, setGameTab] = useState('flight');

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <BackLink />
          <a href="/how-to#levels" className="text-sm hover:text-accent transition-colors flex items-center gap-1" data-testid="link-how-levels-work">
            HOW LEVELS WORK
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            LEADER<span className="text-primary">BOARD</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            TOP DEVELOPERS RANKED IN CITYHOOD
          </p>
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('developers')}
            className={`px-6 py-2 border transition-colors ${
              view === 'developers' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border'
            }`}
            data-testid="button-view-developers"
          >
            DEVELOPERS
          </button>
          <button
            onClick={() => setView('game')}
            className={`px-6 py-2 border transition-colors ${
              view === 'game' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border'
            }`}
            data-testid="button-view-game"
          >
            GAME
          </button>
        </div>

        {/* Developers view */}
        {view === 'developers' && (
          <Tabs value={devTab} onValueChange={setDevTab} className="w-full">
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="contributors" data-testid="tab-contributors">CONTRIBUTORS</TabsTrigger>
              <TabsTrigger value="stars" data-testid="tab-stars">STARS</TabsTrigger>
              <TabsTrigger value="architects" data-testid="tab-architects">ARCHITECTS</TabsTrigger>
              <TabsTrigger value="achievers" data-testid="tab-achievers">ACHIEVERS</TabsTrigger>
              <TabsTrigger value="recruiters" data-testid="tab-recruiters">RECRUITERS</TabsTrigger>
              <TabsTrigger value="xp" data-testid="tab-xp">XP</TabsTrigger>
            </TabsList>

            <TabsContent value={devTab} className="bg-card border border-border">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="px-4 py-3 w-16">#</th>
                      <th className="px-4 py-3">DEVELOPER</th>
                      <th className="px-4 py-3">LANGUAGE</th>
                      <th className="px-4 py-3 text-right">CONTRIBUTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDevelopers.map((dev) => (
                      <tr
                        key={dev.rank}
                        className="border-b border-border hover:bg-secondary transition-colors"
                        data-testid={`row-developer-${dev.rank}`}
                      >
                        <td className="px-4 py-3 text-muted-foreground">{dev.rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/20 border border-primary flex items-center justify-center text-xs font-bold">
                              {dev.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold">{dev.name}</div>
                              <div className="text-xs text-muted-foreground">@{dev.handle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{dev.language}</td>
                        <td className="px-4 py-3 text-right font-mono">{dev.contributions.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Game view */}
        {view === 'game' && (
          <div className="space-y-6">
            <Tabs value={gameTab} onValueChange={setGameTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="flight" data-testid="tab-flight">FLIGHT</TabsTrigger>
                <TabsTrigger value="speedrun" data-testid="tab-speedrun">SPEEDRUN</TabsTrigger>
                <TabsTrigger value="dailies" data-testid="tab-dailies">DAILIES</TabsTrigger>
                <TabsTrigger value="drops" data-testid="tab-drops">DROPS</TabsTrigger>
              </TabsList>

              {/* Time filters */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex gap-2 text-sm">
                  <button className="px-4 py-2 bg-primary text-primary-foreground border border-primary" data-testid="button-filter-today">
                    TODAY
                  </button>
                  <button className="px-4 py-2 bg-secondary border border-border hover:bg-muted transition-colors" data-testid="button-filter-week">
                    THIS WEEK
                  </button>
                  <button className="px-4 py-2 bg-secondary border border-border hover:bg-muted transition-colors" data-testid="button-filter-alltime">
                    ALL-TIME
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <button className="px-2 py-1 border border-border hover:bg-secondary transition-colors" data-testid="button-date-prev">
                    ◀
                  </button>
                  <span className="px-4">JUL 23, 2026 [TODAY]</span>
                  <button className="px-2 py-1 border border-border hover:bg-secondary transition-colors" data-testid="button-date-next">
                    ▶
                  </button>
                </div>
              </div>

              <TabsContent value={gameTab} className="space-y-6">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-take-challenge">
                  TAKE TODAY'S CHALLENGE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="bg-card border border-border p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    NO FLIGHTS RECORDED TODAY. BE THE FIRST PILOT!
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" data-testid="button-enter-city-bottom">
            ENTER THE CITY
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
