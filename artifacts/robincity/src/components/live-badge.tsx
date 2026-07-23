export function LiveBadge({ count = 1 }: { count?: number }) {
  return (
    <div className="border border-primary px-3 py-1 text-xs flex items-center gap-2" data-testid="badge-live-count">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <span>{count} LIVE</span>
    </div>
  );
}
