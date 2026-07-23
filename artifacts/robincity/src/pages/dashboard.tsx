import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  Building2, Star, Users, GitFork, Code2, Calendar,
  LogOut, ExternalLink, Palette, CheckCircle, ChevronRight,
  Trophy, Compass, ShoppingBag, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Footer } from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  location: string | null;
}

interface BuildingData {
  claimed: boolean;
  custom_color?: string | null;
  rooftop_item?: string | null;
  building_item?: string | null;
  claimed_at?: string;
}

function buildingHeight(repos: number, followers: number) {
  return Math.min(Math.max(40 + repos * 2 + followers * 0.5, 60), 220);
}

function tierFromFloors(h: number): { label: string; color: string } {
  if (h >= 200) return { label: 'LEGEND',    color: 'hsl(0 100% 60%)' };
  if (h >= 170) return { label: 'ARCHITECT', color: 'hsl(30 100% 55%)' };
  if (h >= 130) return { label: 'SENIOR',    color: 'hsl(55 100% 55%)' };
  if (h >= 100) return { label: 'MID',       color: 'hsl(75 80% 50%)' };
  if (h >= 70)  return { label: 'JUNIOR',    color: 'hsl(120 50% 50%)' };
  return            { label: 'NEWBIE',    color: 'hsl(120 30% 40%)' };
}

export default function Dashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();

  const [ghUser, setGhUser] = useState<GitHubUser | null>(null);
  const [building, setBuilding] = useState<BuildingData | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation('/login?redirect=/dashboard');
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (!user) return;
    setLoadingData(true);

    Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(user.username)}`)
        .then(r => r.ok ? r.json() as Promise<GitHubUser> : null)
        .catch(() => null),
      fetch(`/api/buildings/${encodeURIComponent(user.username)}`, { credentials: 'include' })
        .then(r => r.ok ? r.json() as Promise<BuildingData> : { claimed: false })
        .catch(() => ({ claimed: false } as BuildingData)),
    ]).then(([gh, b]) => {
      setGhUser(gh);
      setBuilding(b);
    }).finally(() => setLoadingData(false));
  }, [user]);

  const handleClaim = async () => {
    if (!user) return;
    setClaiming(true);
    try {
      const resp = await fetch('/api/buildings/claim', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username }),
      });
      const data = await resp.json() as { ok?: boolean; error?: string };
      if (data.ok) {
        setBuilding(prev => ({ ...prev, claimed: true, claimed_at: new Date().toISOString() }));
      }
    } finally {
      setClaiming(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <div className="text-muted-foreground font-mono text-sm animate-pulse">LOADING...</div>
      </div>
    );
  }

  const bHeight = ghUser ? buildingHeight(ghUser.public_repos, ghUser.followers) : 80;
  const tier = tierFromFloors(bHeight);
  const floors = Math.round(bHeight / 20);
  const joinYear = ghUser ? new Date(ghUser.created_at).getFullYear() : null;

  const stats = [
    { icon: Code2,    label: 'REPOS',     value: ghUser?.public_repos ?? '—' },
    { icon: Users,    label: 'FOLLOWERS', value: ghUser?.followers ?? '—' },
    { icon: GitFork,  label: 'FOLLOWING', value: ghUser?.following ?? '—' },
    { icon: Calendar, label: 'SINCE',     value: joinYear ?? '—' },
  ];

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Navbar */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-3">
          <Link href={`/user/${user!.username}`}>
            <Button variant="outline" size="sm">MY BUILDING</Button>
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            LOGOUT
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-2 border-border p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
        >
          <img
            src={user!.avatar_url}
            alt={user!.username}
            className="w-20 h-20 border-2 border-border pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="text-center sm:text-left flex-1">
            <p className="text-xs text-muted-foreground mb-1">WELCOME BACK</p>
            <h1 className="text-2xl font-bold">@{user!.username}</h1>
            {ghUser?.name && <p className="text-muted-foreground text-sm mt-0.5">{ghUser.name}</p>}
            {ghUser?.bio  && <p className="text-muted-foreground text-xs mt-2 max-w-md">{ghUser.bio}</p>}
            <a
              href={`https://github.com/${user!.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> GITHUB PROFILE
            </a>
          </div>
          {/* Tier badge */}
          <div className="text-center shrink-0">
            <div
              className="text-xs font-bold px-3 py-1 border"
              style={{ color: tier.color, borderColor: tier.color }}
            >
              {tier.label}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{floors} FLOORS</div>
          </div>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card border border-border p-4 text-center">
              <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">{loadingData ? '—' : value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Building status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-card border-2 border-border p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4" />
            <h2 className="font-bold text-sm">YOUR BUILDING</h2>
          </div>

          {loadingData ? (
            <div className="text-muted-foreground text-xs animate-pulse">LOADING BUILDING DATA...</div>
          ) : building?.claimed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">CLAIMED</span>
                {building.claimed_at && (
                  <span className="text-xs text-muted-foreground">
                    — {new Date(building.claimed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/user/${user!.username}`}>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> VIEW BUILDING
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="sm" className="gap-1.5">
                    <Palette className="w-3.5 h-3.5" /> CUSTOMIZE IN SHOP
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>NOT CLAIMED YET</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Claim your building to unlock customization — colors, rooftop items, and more.
              </p>
              <Button size="sm" onClick={handleClaim} disabled={claiming} className="gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {claiming ? 'CLAIMING...' : 'CLAIM MY BUILDING'}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xs text-muted-foreground font-medium mb-3">EXPLORE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/explore',     icon: Compass,    label: 'EXPLORE CITY',   desc: 'Browse all claimed buildings' },
              { href: '/leaderboard', icon: Trophy,     label: 'LEADERBOARD',    desc: 'Top contributors in the city' },
              { href: '/shop',        icon: ShoppingBag, label: 'SHOP',          desc: 'Customize your building' },
            ].map(({ href, icon: Icon, label, desc }) => (
              <Link key={href} href={href}>
                <div className="bg-card border border-border p-4 hover:border-foreground transition-colors cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <div>
                      <div className="text-sm font-bold">{label}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
