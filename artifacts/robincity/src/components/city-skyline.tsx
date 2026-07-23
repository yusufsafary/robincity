import { motion } from 'framer-motion';

interface CitySkylineProps {
  sleeping?: boolean;
}

export function CitySkyline({ sleeping = false }: CitySkylineProps) {
  const buildings = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    height: 80 + (((i * 137 + 31) % 100) / 100) * 200,
    width: 40 + (((i * 97 + 17) % 100) / 100) * 60,
    x: i * 58,
    windows: Array.from({ length: Math.floor(((i * 53 + 7) % 6) + 3) }, (_, j) => ({
      id: j,
      delay: ((i * 0.3 + j * 0.7) % 3),
    })),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        viewBox="0 0 1300 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(75 100% 60%)" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="1300" height="400" fill="url(#grid)" />

        {buildings.map((building) => (
          <g key={building.id}>
            <motion.polygon
              points={`
                ${building.x},${400 - building.height}
                ${building.x + building.width},${400 - building.height}
                ${building.x + building.width},400
                ${building.x},400
              `}
              fill="hsl(120 30% 15%)"
              stroke="hsl(75 100% 60%)"
              strokeWidth="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: building.id * 0.04, duration: 0.5 }}
            />

            <motion.polygon
              points={`
                ${building.x},${400 - building.height}
                ${building.x + building.width / 2},${400 - building.height - 20}
                ${building.x + building.width},${400 - building.height}
              `}
              fill="hsl(120 40% 20%)"
              stroke="hsl(75 100% 60%)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: building.id * 0.04 + 0.2, duration: 0.5 }}
            />

            {building.windows.map((win, idx) => (
              <motion.rect
                key={win.id}
                x={building.x + 10 + (idx % 3) * 15}
                y={400 - building.height + 20 + Math.floor(idx / 3) * 25}
                width="8"
                height="12"
                fill="hsl(75 100% 60%)"
                initial={{ opacity: 0 }}
                animate={sleeping
                  ? { opacity: 0.05 }
                  : { opacity: [0.3, 1, 0.3] }
                }
                transition={sleeping
                  ? { duration: 0.5 }
                  : {
                      delay: win.delay,
                      duration: 2 + (idx % 3),
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }
                }
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
