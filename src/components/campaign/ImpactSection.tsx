'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function Counter({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const totalFrames = duration * 60;
      const increment = end / totalFrames;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function ImpactSection() {
  return (
    <section id="impacto" className="py-32 md:py-48 bg-black text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-8 block"
            >
              Métricas em Tempo Real
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter mb-12">
              NOSSA <br/> <span className="italic text-white/40">META.</span>
            </h2>
            
            <div className="space-y-12">
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/50">Meta de Arrecadação</span>
                  <span className="text-3xl font-display italic text-primary">1.000 kg</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "0%" }}
                    transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
                    className="h-full bg-gradient-to-r from-primary to-accent-yellow"
                  />
                </div>
                <p className="text-xs text-white/40 mt-3">A campanha começou! Primeiras arrecadações em andamento.</p>
              </div>

              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/50">Espírito da Turma</span>
                  <span className="text-3xl font-display italic text-accent-yellow">100%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="h-full bg-accent-yellow"
                  />
                </div>
                <p className="text-xs text-white/40 mt-3">Engajado e comprometido com o objetivo de ajudar.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-12 border border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-xl">
              <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
                <Counter end={1000} />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-white/60">Kg de Alimentos (Meta)</span>
              <p className="text-xs text-white/40 mt-3">Alimentos não perecíveis para ajudar quem precisa.</p>
            </div>
            
            <div className="p-12 border border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-xl">
              <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
                <Counter end={250} />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-white/60">Famílias Impactadas (Meta)</span>
              <p className="text-xs text-white/40 mt-3">Cada doação chega a quem mais precisa.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[180px] opacity-20" />
      </div>
    </section>
  );
}
