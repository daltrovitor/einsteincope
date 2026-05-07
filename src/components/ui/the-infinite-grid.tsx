import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

interface InfiniteGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const InfiniteGrid = ({ className, children }: InfiniteGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5; 
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full h-full min-h-screen overflow-hidden bg-white",
        className
      )}
    >
      {/* Base Grid Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.1]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color="#e2e8f0" />
      </div>

      {/* Interactive Grid Layer (Masked) - Site Primary Blue */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-100"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color="#3b82f6" /> 
      </motion.div>

      {/* Background Glows (Site Colors in the corners) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left - Primary Blue */}
        <div className="absolute left-[-10%] top-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]" />
        
        {/* Top Right - Accent Red (from site) */}
        <div className="absolute right-[-10%] top-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px]" />
        
        {/* Bottom Left - Accent Yellow (from site) */}
        <div className="absolute left-[-10%] bottom-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-400/10 blur-[120px]" />
        
        {/* Bottom Right - Cyan/Primary */}
        <div className="absolute right-[-10%] bottom-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

const GridPattern = ({ offsetX, offsetY, color, className }: { offsetX: any, offsetY: any, color: string, className?: string }) => {
  return (
    <svg className={cn("w-full h-full", className)}>
      <defs>
        <motion.pattern
          id={`grid-pattern-${color}`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-pattern-${color})`} />
    </svg>
  );
};
