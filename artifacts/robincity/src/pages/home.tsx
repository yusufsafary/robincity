import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CitySkyline } from '@/components/city-skyline';
import { Logo } from '@/components/logo';
import { LiveBadge } from '@/components/live-badge';
import { LofiPlayer } from '@/components/lofi-player';

export default function Home() {
  const [, setLocation] = useLocation();
  const [showCity, setShowCity] = useState(false);
  const [username, setUsername] = useState('');
  const [terminalText, setTerminalText] = useState('');
  const fullCommand = '$ robin clone robincity';

  // Terminal typing animation
  useState(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCommand.length) {
        setTerminalText(fullCommand.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCity(true), 500);
      }
    }, 80);
    return () => clearInterval(interval);
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setLocation(`/city?user=${username.trim()}`);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full relative overflow-hidden bg-background">
      <LofiPlayer />
      
      {/* Terminal loading screen */}
      <motion.div
        className="absolute inset-0 bg-background z-20 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: showCity ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: showCity ? 'none' : 'auto' }}
      >
        <div className="text-2xl md:text-4xl font-mono">
          {terminalText}
          <span className="terminal-cursor" />
        </div>
      </motion.div>

      {/* City view */}
      <motion.div
        className="relative min-h-[100dvh] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCity ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated city skyline background */}
        <CitySkyline />

        {/* Top control bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <Logo />
          <div className="flex items-center gap-3">
            <LiveBadge count={1} />
            <Link href="/login">
              <Button size="sm" data-testid="button-enter-city">
                ENTER THE CITY
              </Button>
            </Link>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors" data-testid="link-discord">
              DISCORD
            </a>
          </div>
        </div>

        {/* Settings strip */}
        <div className="absolute top-16 right-4 flex flex-col gap-2 text-xs z-10">
          <div className="bg-card border border-border px-3 py-1.5 flex items-center gap-2">
            <span className="text-muted-foreground">EMERALD 1/4</span>
          </div>
          <div className="bg-card border border-border px-3 py-1.5 flex items-center gap-2">
            <span className="text-muted-foreground">INTRO</span>
          </div>
          <div className="bg-card border border-border px-3 py-1.5 flex items-center gap-2">
            <Settings className="w-3 h-3" />
            <span>GRAPHICS HIGH</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex items-center justify-center min-h-[100dvh] px-4">
          <div className="max-w-3xl w-full text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wider">
                # ROBINCITY
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                A GLOBAL CITY OF GITHUB DEVELOPERS. FIND YOURSELF.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="SEARCH GITHUB USERNAME..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground pl-10"
                  data-testid="input-username-search"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button type="submit" size="lg" data-testid="button-search-submit">
                SEARCH
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              <Link href="/how-to" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-to-play">
                HOW TO PLAY
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-leaderboard">
                LEADERBOARD
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-shop">
                SHOP
              </Link>
            </motion.div>

            {/* City mode toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8"
            >
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-muted px-4 py-2" data-testid="button-city-mode-toggle">
                CITY SLEEPING
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
