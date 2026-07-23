import { Play } from 'lucide-react';

export function LofiPlayer() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-card border border-border px-3 py-2 text-xs flex items-center gap-2 hover:bg-secondary transition-colors cursor-pointer" data-testid="button-lofi-player">
      <Play className="w-3 h-3" />
      <span>LO-FI BEATS</span>
    </div>
  );
}
