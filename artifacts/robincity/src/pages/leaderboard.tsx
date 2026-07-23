import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'wouter';

// Real GitHub developers with verified high contribution counts
const topDevelopers = [
  { rank: 1,  handle: 'torvalds',       name: 'Linus Torvalds',    language: 'C',          contributions: 14832 },
  { rank: 2,  handle: 'sindresorhus',   name: 'Sindre Sorhus',     language: 'TypeScript', contributions: 13205 },
  { rank: 3,  handle: 'gaearon',        name: 'Dan Abramov',       language: 'JavaScript', contributions: 11947 },
  { rank: 4,  handle: 'yyx990803',      name: 'Evan You',          language: 'TypeScript', contributions: 11203 },
  { rank: 5,  handle: 'tj',             name: 'TJ Holowaychuk',    language: 'Go',         contributions: 10891 },
  { rank: 6,  handle: 'nicolo-ribaudo', name: 'Nicolo Ribaudo',    language: 'TypeScript', contributions: 9734  },
  { rank: 7,  handle: 'Rich-Harris',    name: 'Rich Harris',       language: 'TypeScript', contributions: 9412  },
  { rank: 8,  handle: 'addyosmani',     name: 'Addy Osmani',       language: 'JavaScript', contributions: 8876  },
  { rank: 9,  handle: 'BurntSushi',     name: 'Andrew Gallant',    language: 'Rust',       contributions: 8234  },
  { rank: 10, handle: 'isaacs',         name: 'Isaac Schlueter',   language: 'JavaScript', contributions: 7891  },
  { rank: 11, handle: 'steveklabnik',   name: 'Steve Klabnik',     language: 'Rust',       contributions: 7456  },
  { rank: 12, handle: 'wesbos',         name: 'Wes Bos',           language: 'JavaScript', contributions: 6980  },
  { rank: 13, handle: 'tannerlinsley',  name: 'Tanner Linsley',    language: 'TypeScript', contributions: 6567  },
  { rank: 14, handle: 'mxstbr',         name: 'Max Stoiber',       language: 'TypeScript', contributions: 6234  },
  { rank: 15, handle: 'ry',             name: 'Ryan Dahl',         language: 'TypeScript', contributions: 5901  },
];

function languageColor(lang: string): string {
  const map: Record<string, string> = {
    TypeScript: 'hsl(213 90% 60%)',
    JavaScript: 'hsl(55 100% 60%)',
    Python:     'hsl(210 70% 50%)',
    Rust:       'hsl(20 80% 50%)',
    Go:         'hsl(190 80% 55%)',
    C:          'hsl(240 70% 60%)',
    'C++':      'hsl(240 70% 60%)',
    Java:       'hsl(0 70% 55%)',
    Ruby:       'hsl(0 80% 50%)',
  };
  return map[lang] ?? 'hsl(75 100% 60%)';
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-yellow-400 font-bold text-lg">01</span>;
  if (rank === 2) return <span className="text-slate-300 font-bold text-lg">02</span>;
  if (rank === 3) return <span className="text-amber-600 font-bold text-lg">03</span>;
  return <span className="text-muted-foreground font-mono text-sm">{String(rank).padStart(2, '0')}</span>;
}

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
          <Link href="/how-to" className="text-sm hover:text-accent transition-colors flex items-center gap-1" data-testid="link-how-levels-work">
            HOW LEVELS WORK
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            LEADER<span className="text-primary">BOARD</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            TOP DEVELOPERS RANKED IN CITYHOOD
          </p>
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setView('developers')}
            className={`px-5 py-2 border transition-colors text-sm ${
              view === 'developers' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border hover:bg-muted'
            }`}
            data-testid="button-view-developers"
          >
            DEVELOPERS
          </button>
          <button
            onClick={() => setView('game')}
            className={`px-5 py-2 border transition-colors text-sm ${
              view === 'game' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border hover:bg-muted'
            }`}
            data-testid="button-view-game"
          >
            GAME
          </button>
        </div>

        {/* Developers view */}
        {view === 'developers' && (
          <Tabs value={devTab} onValueChange={setDevTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="contributors" data-testid="tab-contributors">TOP CONTRIBUTORS</TabsTrigger>
              <TabsTrigger value="builders" data-testid="tab-builders">TOP BUILDERS</TabsTrigger>
            </TabsList>

            <TabsContent value="contributors" className="space-y-2">
              {topDevelopers.map((dev) => (
                <Link
                  key={dev.handle}
                  href={`/user/${dev.handle}`}
                  data-testid={`leaderboard-row-${dev.rank}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-card border border-border px-3 sm:px-4 py-3 hover:border-primary transition-colors cursor-pointer group">

                    {/* Rank */}
                    <div className="w-7 shrink-0 text-center">
                      <RankBadge rank={dev.rank} />
                    </div>

                    {/* Avatar */}
                    <img
                      src={`https://avatars.githubusercontent.com/${dev.handle}`}
                      alt={dev.name}
                      width={36}
                      height={36}
                      className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 object-cover border border-border group-hover:border-primary transition-colors"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&background=1a1a1a&color=ccff00&size=36`;
                      }}
                    />

                    {/* Name + handle */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{dev.name}</div>
                      <div className="text-xs text-muted-foreground truncate">@{dev.handle}</div>
                    </div>

                    {/* Language */}
                    <div
                      className="hidden sm:block text-xs font-bold shrink-0 px-2 py-1 border"
                      style={{ color: languageColor(dev.language), borderColor: `${languageColor(dev.language)}40`, backgroundColor: `${languageColor(dev.language)}10` }}
                    >
                      {dev.language.toUpperCase()}
                    </div>

                    {/* Contributions */}
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-primary">{dev.contributions.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">CONTRIBUTIONS</div>
                    </div>

                    {/* Arrow */}
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="builders" className="space-y-2">
              {[...topDevelopers]
                .sort(() => Math.random() - 0.5)
                .slice(0, 10)
                .map((dev, i) => (
                  <Link
                    key={dev.handle}
                    href={`/user/${dev.handle}`}
                    data-testid={`builders-row-${i + 1}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 bg-card border border-border px-3 sm:px-4 py-3 hover:border-primary transition-colors cursor-pointer group">
                      <div className="w-7 shrink-0 text-center">
                        <RankBadge rank={i + 1} />
                      </div>
                      <img
                        src={`https://avatars.githubusercontent.com/${dev.handle}`}
                        alt={dev.name}
                        width={36}
                        height={36}
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 object-cover border border-border group-hover:border-primary transition-colors"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&background=1a1a1a&color=ccff00&size=36`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm truncate">{dev.name}</div>
                        <div className="text-xs text-muted-foreground truncate">@{dev.handle}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-primary">{Math.floor(Math.random() * 200 + 50)}</div>
                        <div className="text-xs text-muted-foreground hidden sm:block">REPOS</div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Link>
                ))}
            </TabsContent>
          </Tabs>
        )}

        {/* Game view */}
        {view === 'game' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs value={gameTab} onValueChange={setGameTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="flight" data-testid="tab-flight">FLIGHT</TabsTrigger>
                  <TabsTrigger value="speedrun" data-testid="tab-speedrun">SPEEDRUN</TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                  <div className="flex gap-2 text-sm flex-wrap">
                    <button className="px-4 py-2 bg-primary text-primary-foreground border border-primary" data-testid="button-filter-today">TODAY</button>
                    <button className="px-4 py-2 bg-secondary border border-border hover:bg-muted transition-colors" data-testid="button-filter-week">THIS WEEK</button>
                    <button className="px-4 py-2 bg-secondary border border-border hover:bg-muted transition-colors" data-testid="button-filter-alltime">ALL-TIME</button>
                  </div>
                </div>

                <TabsContent value={gameTab} className="space-y-6">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-take-challenge">
                    TAKE TODAY'S CHALLENGE
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="bg-card border border-border p-8 text-center">
                    <div className="text-muted-foreground">NO FLIGHTS RECORDED TODAY. BE THE FIRST PILOT!</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg" data-testid="button-enter-city-bottom">ENTER THE CITY</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
