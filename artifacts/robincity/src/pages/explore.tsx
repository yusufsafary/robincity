import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Shuffle } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FEATURED = [
  { handle: 'torvalds',      name: 'Linus Torvalds',    lang: 'C',          tier: 'LEGEND',    floors: 220 },
  { handle: 'sindresorhus',  name: 'Sindre Sorhus',     lang: 'TypeScript', tier: 'LEGEND',    floors: 210 },
  { handle: 'gaearon',       name: 'Dan Abramov',       lang: 'JavaScript', tier: 'LEGEND',    floors: 198 },
  { handle: 'yyx990803',     name: 'Evan You',          lang: 'TypeScript', tier: 'LEGEND',    floors: 190 },
  { handle: 'tj',            name: 'TJ Holowaychuk',   lang: 'Go',         tier: 'ARCHITECT', floors: 175 },
  { handle: 'Rich-Harris',   name: 'Rich Harris',       lang: 'TypeScript', tier: 'ARCHITECT', floors: 168 },
  { handle: 'addyosmani',    name: 'Addy Osmani',       lang: 'JavaScript', tier: 'ARCHITECT', floors: 155 },
  { handle: 'BurntSushi',    name: 'Andrew Gallant',    lang: 'Rust',       tier: 'ARCHITECT', floors: 148 },
  { handle: 'wesbos',        name: 'Wes Bos',           lang: 'JavaScript', tier: 'SENIOR',    floors: 130 },
  { handle: 'tannerlinsley', name: 'Tanner Linsley',    lang: 'TypeScript', tier: 'SENIOR',    floors: 122 },
  { handle: 'mxstbr',        name: 'Max Stoiber',       lang: 'TypeScript', tier: 'SENIOR',    floors: 115 },
  { handle: 'ry',            name: 'Ryan Dahl',         lang: 'TypeScript', tier: 'SENIOR',    floors: 108 },
];

const LANG_COLOR: Record<string, string> = {
  TypeScript: 'hsl(213 90% 60%)',
  JavaScript: 'hsl(55 100% 60%)',
  Python:     'hsl(210 70% 50%)',
  Rust:       'hsl(20 80% 50%)',
  Go:         'hsl(190 80% 55%)',
  C:          'hsl(240 70% 60%)',
};

const TIER_COLOR: Record<string, string> = {
  LEGEND:    'hsl(0 100% 60%)',
  ARCHITECT: 'hsl(30 100% 55%)',
  SENIOR:    'hsl(55 100% 55%)',
  MID:       'hsl(75 80% 50%)',
  JUNIOR:    'hsl(120 50% 50%)',
  NEWBIE:    'hsl(120 30% 40%)',
};

function MiniBuilding({ floors, color }: { floors: number; color: string }) {
  const h = Math.round((floors / 220) * 80);
  const windows = Math.floor(h / 14);
  return (
    <svg viewBox="0 0 40 90" className="w-10 h-20 shrink-0">
      <rect x="5" y={90 - h} width="30" height={h} fill="#0a180a" stroke={color} strokeWidth="1"/>
      {Array.from({ length: windows }, (_, i) => (
        <rect key={i} x="11" y={90 - h + 6 + i * 14} width="6" height="8"
          fill={color} opacity={Math.random() > 0.3 ? 0.7 : 0.2}/>
      ))}
      {Array.from({ length: windows }, (_, i) => (
        <rect key={`r${i}`} x="23" y={90 - h + 6 + i * 14} width="6" height="8"
          fill={color} opacity={Math.random() > 0.3 ? 0.8 : 0.1}/>
      ))}
    </svg>
  );
}

export default function Explore() {
  const [query, setQuery] = useState('');
  const [shuffled, setShuffled] = useState(FEATURED);

  useEffect(() => {
    document.title = 'Explore the City | Cityhood';
  }, []);

  const filtered = query.trim()
    ? shuffled.filter(d =>
        d.handle.toLowerCase().includes(query.toLowerCase()) ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.lang.toLowerCase().includes(query.toLowerCase())
      )
    : shuffled;

  const handleShuffle = () => {
    setShuffled(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <BackLink />

        <div className="mt-8 mb-10 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold">EXPLORE THE CITY</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Browse buildings from developers around the world. Each one is generated from real GitHub data.
            Click any building to see the full profile.
          </p>
        </div>

        {/* Search + shuffle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="FILTER BY NAME, HANDLE, OR LANGUAGE..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10"
              data-testid="input-explore-filter"
            />
          </div>
          <Button variant="outline" onClick={handleShuffle} className="shrink-0" data-testid="button-shuffle">
            <Shuffle className="w-4 h-4 mr-2" />
            SHUFFLE
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dev, i) => {
            const color = LANG_COLOR[dev.lang] ?? 'hsl(75 100% 60%)';
            const tierColor = TIER_COLOR[dev.tier] ?? 'hsl(75 100% 60%)';
            return (
              <motion.div
                key={dev.handle}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link href={`/user/${dev.handle}`} data-testid={`card-dev-${dev.handle}`}>
                  <div className="bg-card border border-border hover:border-primary transition-colors p-4 flex gap-4 items-end cursor-pointer group">
                    <MiniBuilding floors={dev.floors} color={color} />
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="text-xs mb-2 flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 text-xs font-bold"
                          style={{ color: tierColor, border: `1px solid ${tierColor}40`, background: `${tierColor}15` }}
                        >
                          {dev.tier}
                        </span>
                      </div>
                      <div className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                        @{dev.handle}
                      </div>
                      <div className="text-muted-foreground text-xs truncate">{dev.name}</div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span style={{ color }}>{dev.lang}</span>
                        <span>{dev.floors} FLOORS</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mb-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="text-2xl font-bold mb-3">NO BUILDINGS FOUND</div>
            <p className="text-sm">Try a different search or <Link href="/" className="text-primary hover:text-accent">search any GitHub username</Link> directly.</p>
          </div>
        )}

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground text-sm">Your building is already in the city.</p>
          <Link href="/">
            <Button size="lg" data-testid="button-find-mine">FIND MY BUILDING</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
