'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function TextReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-0 text-3xl md:text-6xl font-display leading-[1.1] tracking-tight">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-32 md:py-64 bg-white px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-8 block"
          >
            Nossa Turma, Nosso Propósito
          </motion.h2>
          
          <TextReveal text="A turma 1° Einstein está arrecadando alimentos durante os jogos estudantis COPE — COMPETE 2026 para ajudar pessoas que precisam." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Empatia", desc: "Sentir a dor do outro e agir para mudar.", color: "bg-accent-red" },
            { title: "União", desc: "Uma turma inteira focada em um bem comum.", color: "bg-accent-yellow" },
            { title: "Impacto", desc: "Resultados reais para famílias reais.", color: "bg-primary" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group p-10 rounded-[2.5rem] bg-gray-50 border border-black/[0.03] hover:bg-white hover:shadow-premium transition-all duration-500"
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500`} />
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-black/70 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 right-0 w-96 h-96 border-[1px] border-black rotate-45" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border-[1px] border-black -rotate-12" />
      </div>
    </section>
  );
}
