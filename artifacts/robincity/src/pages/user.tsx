import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, Users, Code2, Calendar, ArrowLeft } from 'lucide-react';
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
    C: 'hsl(240 60% 65%)',
    Ruby: 'hsl(0 80% 50%)',
    CSS: 'hsl(280 70% 60%)',
    HTML: 'hsl(20 90% 55%)',
    Swift: 'hsl(25 90% 60%)',
    Kotlin: 'hsl(270 70% 65%)',
    PHP: 'hsl(230 60% 65%)',
    Shell: 'hsl(150 60% 50%)',
  };
  return map[lang ?? ''] ?? 'hsl(75 100% 60%)';
}

function tierFromFloors(h: number): { label: string; color: string } {
  if (h >= 200) return { label: 'LEGEND',    color: 'hsl(0 100% 60%)' };
  if (h >= 170) return { label: 'ARCHITECT', color: 'hsl(30 100% 55%)' };
  if (h >= 130) return { label: 'SENIOR',    color: 'hsl(55 100% 55%)' };
  if (h >= 100) return { label: 'MID',       color: 'hsl(75 80% 50%)' };
  if (h >= 70)  return { label: 'JUNIOR',    color: 'hsl(120 50% 50%)' };
  return           { label: 'NEWBIE',    color: 'hsl(120 30% 40%)' };
}

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      document.title = `@${username} | Cityhood`;
    }
  }, [username]);

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
  const tier = tierFromFloors(bHeight);

  // Generate deterministic window rows for the building preview
  const floors = Math.round(bHeight / 20);
  const windowRows = Array.from({ length: Math.min(floors, 8) }, (_, i) => i);

  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        {loading && (
          <div className="mt-16 text-center">
            <div className="text-xl sm:text-2xl font-mono animate-pulse">
              LOADING {username?.toUpperCase()}...
            </div>
          </div>
        )}

        {error && (
          <div className="mt-16 text-center space-y-6">
            <div className="text-3xl sm:text-4xl font-bold text-destructive">{error}</div>
            <p className="text-muted-foreground text-sm sm:text-base">
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-8"
          >
            {/* Profile header */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-4xl font-bold truncate">{user.name ?? user.login}</h1>
                  <span
                    className="text-xs px-2 py-0.5 font-bold shrink-0"
                    style={{ color: tier.color, border: `1px solid ${tier.color}50`, background: `${tier.color}15` }}
                  >
                    {tier.label}
                  </span>
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">@{user.login}</div>
                {user.bio && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{user.bio}</p>
                )}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                  {joinYear && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      JOINED {joinYear}
                    </span>
                  )}
                  {user.location && (
                    <span className="truncate max-w-[160px]">{user.location.toUpperCase()}</span>
                  )}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    data-testid="link-github-profile"
                  >
                    GITHUB
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats + Building */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'REPOS', value: user.public_repos, icon: Code2 },
                  { label: 'FOLLOWERS', value: user.followers, icon: Users },
                  { label: 'FOLLOWING', value: user.following, icon: Users },
                  { label: 'GISTS', value: user.public_gists, icon: Code2 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-card border border-border p-3 sm:p-4">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Icon className="w-3 h-3" />
                      {label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{value.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              {/* Building preview */}
              <div className="bg-card border border-border p-4 flex flex-col items-center justify-end min-h-[180px]">
                <div className="text-xs text-muted-foreground mb-3 self-start">BUILDING PREVIEW</div>
                <svg viewBox="0 0 100 160" className="w-24 sm:w-28 h-auto">
                  {/* Building body */}
                  <rect
                    x="20" y={160 - bHeight * 0.6}
                    width="60" height={bHeight * 0.6}
                    fill="#0a180a" stroke={color} strokeWidth="1.5"
                  />
                  {/* Roof */}
                  <polygon
                    points={`20,${160 - bHeight * 0.6} 50,${160 - bHeight * 0.6 - 12} 80,${160 - bHeight * 0.6}`}
                    fill="#0d1f0d" stroke={color} strokeWidth="1"
                  />
                  {/* Window rows */}
                  {windowRows.map((row) => (
                    <g key={row}>
                      <rect x="28" y={160 - bHeight * 0.6 + 8 + row * 16} width="10" height="10"
                        fill={color} opacity={row % 3 === 0 ? 0.9 : 0.4}/>
                      <rect x="45" y={160 - bHeight * 0.6 + 8 + row * 16} width="10" height="10"
                        fill={color} opacity={row % 2 === 0 ? 0.7 : 0.2}/>
                      <rect x="62" y={160 - bHeight * 0.6 + 8 + row * 16} width="10" height="10"
                        fill={color} opacity={row % 3 === 1 ? 0.8 : 0.3}/>
                    </g>
                  ))}
                  {/* Antenna */}
                  <rect x="49" y={160 - bHeight * 0.6 - 24} width="2" height="14" fill={color}/>
                  <rect x="43" y={160 - bHeight * 0.6 - 20} width="14" height="1.5" fill={color}/>
                </svg>
                <div className="mt-3 text-center">
                  <div className="text-xs text-muted-foreground">
                    {Math.round(bHeight)} FLOORS
                  </div>
                  {topLang && (
                    <div className="text-xs mt-1" style={{ color }}>
                      {topLang}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top repos */}
            {repos.length > 0 && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-primary" />
                  TOP REPOSITORIES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border p-4 hover:border-primary transition-colors block"
                      data-testid={`link-repo-${repo.name}`}
                    >
                      <div className="font-bold text-sm truncate">{repo.name}</div>
                      {repo.description && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        {repo.language && (
                          <span
                            className="flex items-center gap-1"
                            style={{ color: languageColor(repo.language) }}
                          >
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count.toLocaleString()}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link href="/login">
                <Button size="lg" data-testid="button-claim-building">CLAIM THIS BUILDING</Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" data-testid="button-explore-more">EXPLORE MORE BUILDINGS</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
