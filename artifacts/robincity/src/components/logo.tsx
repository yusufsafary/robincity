import { Link } from 'wouter';

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
      <svg 
        viewBox="0 0 32 32" 
        className={className}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pixel art robin bird - geometric lime green */}
        <path 
          d="M12 8h4v4h-4z M16 12h4v4h-4z M12 12h4v4h-4z M8 12h4v4h-4z M12 16h4v4h-4z M16 8h4v4h-4z M20 12h4v4h-4z" 
          fill="hsl(75 100% 60%)"
        />
        {/* Wing detail */}
        <path 
          d="M8 16h4v4h-4z M16 16h4v4h-4z" 
          fill="hsl(75 100% 50%)"
        />
        {/* Eye */}
        <rect x="14" y="10" width="2" height="2" fill="hsl(120 8% 5%)" />
      </svg>
      <span className="text-lg font-bold tracking-wider group-hover:text-accent transition-colors">
        CITYHOOD
      </span>
    </Link>
  );
}
