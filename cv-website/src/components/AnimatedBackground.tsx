import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  speedMultiplier?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  speedMultiplier = 1,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const isSmall = Math.random() > 0.4;
      return {
        id: i,
        size: isSmall ? Math.random() * 4 + 2.5 : Math.random() * 8 + 6, // Sizes: 2.5-6.5px for small, 6-14px for larger
        x: Math.random() * 100,
        y: Math.random() * 100,
        baseDuration: Math.random() * 30 + 20, // Base duration: 20s to 50s
        delay: Math.random() * 8,
        opacity: isSmall
          ? Math.random() * 0.3 + 0.2 // Opacity: 20-50% for small
          : Math.random() * 0.2 + 0.1, // Opacity: 10-30% for larger
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          // Using a slightly more visible gradient for particles
          className="absolute rounded-full bg-gradient-to-br from-blue-200 to-gray-300"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            boxShadow: "0 0 10px rgba(200, 200, 255, 0.2)", // Brighter, more noticeable shadow
          }}
          animate={{
            x: [Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
            y: [Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
            scale: [1, Math.random() * 0.4 + 0.8, 1], // Slightly more scale variation
          }}
          transition={{
            duration: particle.baseDuration / speedMultiplier, // Adjust duration by speed multiplier
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
