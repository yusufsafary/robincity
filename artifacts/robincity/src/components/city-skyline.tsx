import { motion } from 'framer-motion';

export function CitySkyline() {
  // Generate random buildings with flicker windows
  const buildings = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 200 + 100,
    width: Math.random() * 60 + 40,
    x: i * 60,
    windows: Array.from({ length: Math.floor(Math.random() * 6) + 3 }, (_, j) => ({
      id: j,
      delay: Math.random() * 3,
    })),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        viewBox="0 0 1200 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(75 100% 60%)" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        
        {/* Grid background */}
        <rect width="1200" height="400" fill="url(#grid)" />
        
        {/* Isometric buildings */}
        {buildings.map((building) => (
          <g key={building.id}>
            {/* Building front face */}
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
              transition={{ delay: building.id * 0.05, duration: 0.5 }}
            />
            
            {/* Building top (isometric) */}
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
              transition={{ delay: building.id * 0.05 + 0.2, duration: 0.5 }}
            />
            
            {/* Windows with flicker animation */}
            {building.windows.map((window, idx) => (
              <motion.rect
                key={window.id}
                x={building.x + 10 + (idx % 3) * 15}
                y={400 - building.height + 20 + Math.floor(idx / 3) * 25}
                width="8"
                height="12"
                fill="hsl(75 100% 60%)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  delay: window.delay,
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
