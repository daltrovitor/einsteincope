'use client';

import { motion } from 'framer-motion';

export default function EinsteinLogo({ className = "w-24 h-auto" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative flex flex-col items-center group cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <img 
        src="/logo.png" 
        alt="Einstein 2026 Logo" 
        className="w-full h-full object-contain"
        loading="eager"
      />
    </motion.div>
  );
}
