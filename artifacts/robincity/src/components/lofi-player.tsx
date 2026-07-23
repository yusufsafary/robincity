import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

// Free lofi radio stream
const STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3';

export function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => {
    if (typeof window === 'undefined') return null;
    const a = new Audio(STREAM_URL);
    a.volume = 0.3;
    return a;
  });

  const toggle = () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay blocked by browser - that's fine
      });
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 left-3 z-50 sm:left-4 bg-card border border-border px-3 py-2 text-xs flex items-center gap-2 hover:bg-secondary transition-colors cursor-pointer min-h-[44px]"
      data-testid="button-lofi-player"
      aria-label={playing ? 'Pause lofi music' : 'Play lofi music'}
    >
      {playing
        ? <Pause className="w-3 h-3 text-primary" />
        : <Play className="w-3 h-3" />
      }
      <span>{playing ? <span className="text-primary animate-pulse">PLAYING</span> : 'LO-FI BEATS'}</span>
    </button>
  );
}
