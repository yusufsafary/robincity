import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, Users, Code2, Calendar, Building2, ArrowLeft } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  company: string | null;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

function buildingHeight(repos: number, followers: number): number {
  return Math.min(Math.max(40 + repos * 2 + followers * 0.5, 60), 220);
}

function languageColor(lang: string | null): string {
  const map: Record<string, string> = {
    TypeScript: 'hsl(213 90% 60%)',
    JavaScript: 'hsl(55 100% 60%)',
    Python: 'hsl(210 70% 50%)',
    Rust: 'hsl(20 80% 50%)',
    Go: 'hsl(190 80% 55%)',
    Java: 'hsl(0 70% 55%)',
    'C++': 'hsl(240 70% 60%)',
    Ruby: 'hsl(0 80% 50%)',
    CSS: 'hsl(280 70% 60%)',
    HTML: 'hsl(20 90% 55%)',
  };
  return map[lang ?? ''] ?? 'hsl(75 100% 60%)';
}

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    const fetchUser = fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? 'USER NOT FOUND' : 'GITHUB API ERROR');
        return r.json();
      });

    const fetchRepos = fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=stars&per_page=6`
    )
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);

    Promise.all([fetchUser, fetchRepos])
      .then(([u, r]) => {
        setUser(u);
        setRepos(r);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [username]);

  const bHeight = user ? buildingHeight(user.public_repos, user.followers) : 100;
  const topLang = repos.find((r) => r.language)?.language ?? null;
  const color = languageColor(topLang);
  const joinYear = user ? new Date(user.created_at).getFullYear() : null;

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        {loading && (
          <div className="mt-16 text-center">
            <div className="text-2xl font-mono animate-pulse">LOADING {username?.toUpperCase()}...</div>
          </div>
        )}

        {error && (
          <div className="mt-16 text-center space-y-6">
            <div className="text-4xl font-bold text-destructive">{error}</div>
            <p className="text-muted-foreground">
              @{username} does not exist on GitHub or the API rate limit was hit.
            </p>
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                SEARCH AGAIN
              </Button>
            </Link>
          </div>
        )}

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary pixel-art"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold truncate">{user.name ?? user.login}</h1>
                <div className="text-primary text-lg mt-1">@{user.login}</div>
                {user.bio && (
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{user.bio}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                  {user.location && <span>{user.location.toUpperCase()}</span>}
                  {joinYear && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      JOINED {joinYear}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  GITHUB
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'REPOS', value: user.public_repos, icon: Code2 },
                { label: 'FOLLOWERS', value: user.followers, icon: Users },
                { label: 'FOLLOWING', value: user.following, icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-card border border-border p-4 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl sm:text-3xl font-bold">{value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Building preview */}
            <div className="bg-card border border-border p-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>YOUR BUILDING IN ROBINCITY</span>
                {topLang && <span className="text-xs border border-border px-2 py-0.5">{topLang.toUpperCase()}</span>}
              </div>
              <div className="flex items-end justify-center gap-1" style={{ height: 160 }}>
                {/* Main building */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bHeight }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative w-24 border-2 flex flex-col items-center justify-start pt-2 gap-2"
                  style={{ borderColor: color, backgroundColor: `${color}15` }}
                >
                  <div className="text-[8px] font-mono opacity-60 px-1 text-center break-all"
                    style={{ color }}
                  >
                    {user.login.toUpperCase()}
                  </div>
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: color }}
                  />
                </motion.div>
                {/* Neighbor buildings */}
                {[0.55, 0.4, 0.7, 0.35].map((factor, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: bHeight * factor }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    className="w-10 border opacity-30"
                    style={{ borderColor: 'hsl(75 100% 60%)', backgroundColor: 'hsl(120 30% 10%)' }}
                  />
                ))}
              </div>
              <div className="mt-4 text-xs text-muted-foreground text-center">
                BUILDING HEIGHT BASED ON PUBLIC REPOS AND FOLLOWERS
              </div>
            </div>

            {/* Top repos */}
            {repos.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold">TOP REPOSITORIES</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border p-4 hover:border-primary transition-colors block"
                    >
                      <div className="font-bold text-sm truncate">{repo.name}</div>
                      {repo.description && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {repo.description}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        {repo.language && (
                          <span
                            className="flex items-center gap-1"
                            style={{ color: languageColor(repo.language) }}
                          >
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: languageColor(repo.language) }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 text-center">
              <Link href="/login">
                <Button size="lg">CLAIM THIS BUILDING</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
