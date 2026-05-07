'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MousePointer2, Heart, Share2 } from 'lucide-react';

const steps = [
  { icon: MousePointer2, title: "Escolha", desc: "Decida como você pode contribuir hoje.", color: "bg-primary" },
  { icon: Heart, title: "Doe", desc: "Faça sua parte e mude uma realidade.", color: "bg-accent-red" },
  { icon: Share2, title: "Apoie", desc: "Divulgue e multiplique a solidariedade.", color: "bg-accent-yellow" },
];

export function HowToHelpSection() {
  return (
    <section id="como-ajudar" className="py-32 md:py-48 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-display leading-none tracking-tighter"
          >
            TRÊS PASSOS PARA <br/> <span className="italic text-primary">A TRANSFORMAÇÃO.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center text-white mb-10 transition-transform duration-700 group-hover:rotate-[10deg] group-hover:scale-110 shadow-xl`}>
                <step.icon size={32} />
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">{step.title}</h3>
              <p className="text-black/70 max-w-[200px] leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="galeria" className="py-32 px-6 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070",
            "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070",
          ].map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium group"
            >
              <img 
                src={url} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Galeria Einstein" 
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-48 md:py-64 bg-white text-center px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-6xl md:text-9xl font-display leading-[0.85] tracking-tighter mb-16">
            AJUDE O EINSTÃO <br/> <span className="italic text-primary">FAÇA A DIFERENÇA.</span>
          </h2>
          <Link href="/donate">
            <button className="group relative px-16 py-7 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-2xl">
              <span className="relative z-10 font-bold uppercase tracking-widest text-sm">Contribuir Agora</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </Link>
        </motion.div>
      </div>
      
      {/* Background Shapes */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-red/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-[120px]" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-black/[0.05] px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <span className="font-display text-2xl uppercase tracking-[0.2em] mb-4 block">Einstein 2026</span>
          <p className="text-[10px] font-bold tracking-[0.5em] text-black/60 uppercase">Compete 2026 — COPE</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/50">Desenvolvido por</span>
          <a 
            href="https://viraweb.online" 
            target="_blank" 
            className="group flex flex-col items-end gap-2"
          >
            <img src="/viraweb3.png" alt="Viraweb" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-8 h-[1px] bg-black/10 group-hover:bg-primary transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
