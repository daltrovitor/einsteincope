'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';
import { Heart, Apple as Fruit, Users, Star } from 'lucide-react';
import Einstein3D from './Einstein3D';

const floatingElements = [
  { icon: Heart, color: "text-accent-red", radius: 240, duration: 25, delay: 0 },
  { icon: Fruit, color: "text-accent-yellow", radius: 320, duration: 35, delay: -5 },
  { icon: Users, color: "text-accent-blue", radius: 280, duration: 30, delay: -10 },
  { icon: Star, color: "text-primary", radius: 360, duration: 40, delay: -15 },
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white selection:bg-black selection:text-white noise-bg pt-40 md:pt-20">
      {/* Background Parallax Shapes */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left order-1 lg:order-1"
        >
          <div className="overflow-hidden mb-6">
            <motion.span 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-black/70"
            >
              Compete 2026 — COPE
            </motion.span>
          </div>

          <h1 className="font-display text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-[-0.04em] text-black mb-8">
            EINSTÃO
          </h1>

          {/* Tagline/Propósito Claro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 bg-gradient-to-r from-primary/10 to-accent-yellow/10 border border-primary/20 rounded-2xl p-6 md:p-8"
          >
            <p className="text-lg md:text-xl font-semibold text-black leading-relaxed max-w-2xl">
              A turma Einstein do <strong>COPE 2026</strong> participa de uma <strong>campanha solidária de arrecadação de alimentos</strong> para ajudar famílias em situação de vulnerabilidade. <strong>Toda doação faz diferença.</strong>
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center lg:justify-start justify-center gap-4 md:gap-8 mb-12">
            <div className="h-[1px] w-12 bg-black/10 hidden lg:block" />
            <p className="font-display italic text-2xl md:text-3xl text-primary text-balance">
              Transformando espírito de equipe em solidariedade.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 md:gap-6 flex-wrap"
          >
            <Link href="/donate">
              <button className="group relative px-10 md:px-12 py-5 cursor-pointer bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                <span className="relative z-10 font-bold uppercase tracking-widest text-xs">Quero doar alimentos</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>

            <Link href="/pix">
              <button className="group relative px-10 md:px-12 py-5 cursor-pointer bg-accent-yellow text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                <span className="relative z-10 font-bold uppercase tracking-widest text-xs">Contribuição Pix</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>

            <button className="px-10 md:px-12 py-5 border-2 border-black text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
              Saiba como ajudar
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-2"
        >
          <Einstein3D />
          
          {/* Orbital elements inside the 3D column for better depth */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            {floatingElements.map((el, i) => (
              <div
                key={i}
                className="absolute orbiting"
                style={{
                  '--radius': `${el.radius * 0.7}px`,
                  '--duration': `${el.duration}s`,
                  animationDelay: `${el.delay}s`,
                } as any}
              >
                <div className={`p-3 rounded-xl glass shadow-premium ${el.color} opacity-40`}>
                  <el.icon size={16} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Orbital Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className="absolute orbiting"
            style={{
              '--radius': `${el.radius}px`,
              '--duration': `${el.duration}s`,
              animationDelay: `${el.delay}s`,
            } as any}
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 10 }}
              className={`p-4 rounded-2xl glass shadow-premium pointer-events-auto cursor-pointer ${el.color}`}
            >
              <el.icon size={24} />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Floating Geometric Elements (Logo Inspired) */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-10 md:left-20 w-12 h-12 bg-accent-red rounded-sm rotate-45 opacity-20 blur-sm"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 md:right-32 w-16 h-16 bg-accent-yellow rounded-full opacity-20 blur-sm"
      />
    </section>
  );
};

export default memo(HeroSection);
