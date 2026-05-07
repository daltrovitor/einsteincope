'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}

export function WordsPullUp({ text, className, showAsterisk, delay = 0 }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative inline-block mr-[0.2em]"
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[-0.65em] -right-[0.3em] text-[0.31em]">*</span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

interface Segment {
  text: string;
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className }: { segments: Segment[], className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  let wordIndex = 0;

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {segments.map((segment, sIdx) => {
        const words = segment.text.split(' ');
        return words.map((word, wIdx) => {
          const currentIdx = wordIndex++;
          return (
            <motion.span
              key={`${sIdx}-${wIdx}`}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: currentIdx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`inline-block mr-[0.25em] ${segment.className || ''}`}
            >
              {word}
            </motion.span>
          );
        });
      })}
    </div>
  );
}
