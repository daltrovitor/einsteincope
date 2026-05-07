'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Coins, Users, Zap } from 'lucide-react';

export default function CombinedSections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-background">
      {/* Como ajudar */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase mb-4">Como Ajudar</h3>
            <h2 className="text-4xl font-display text-foreground">Caminhos para a <span className="italic">transformação</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <HelpCard 
              icon={Coins} 
              title="Doação Online" 
              desc="Contribua diretamente através da nossa plataforma segura." 
              color="text-einstein-blue"
            />
            <HelpCard 
              icon={Zap} 
              title="Pix Direto" 
              desc="Agilidade e praticidade para sua doação instantânea." 
              color="text-einstein-red"
            />
            <HelpCard 
              icon={Heart} 
              title="Mobilização" 
              desc="Compartilhe nossa causa e multiplique o impacto." 
              color="text-einstein-yellow"
            />
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-32 px-6 bg-secondary/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-display text-foreground mb-8">Nossa meta de <br/> <span className="text-einstein-blue">impacto social</span></h2>
              <p className="text-muted-foreground leading-relaxed font-body">Cada real arrecadado é revertido integralmente em cestas de alimentos e suporte direto para quem mais precisa em nossa região.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <StatCard label="Famílias Meta" value="300+" />
              <StatCard label="Toneladas Alimento" value="1.5" />
              <StatCard label="Estudantes Engajados" value="45" />
              <StatCard label="Projetos Atendidos" value="08" />
            </div>
          </div>
        </div>
      </section>

      {/* Identidade Einstein */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 border border-border rounded-full mb-12">
             <div className="w-12 h-12 bg-einstein-blue rounded-full flex items-center justify-center text-white font-display text-xl">E</div>
          </div>
          <h2 className="text-5xl font-display text-foreground mb-8 italic">Inteligência, Inovação e União</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">Inspirados por Albert Einstein, acreditamos que a maior inovação que podemos entregar é um mundo mais justo e humano. A turma 1º Einstão prova que mentes brilhantes brilham mais forte quando trabalham juntas pelo próximo.</p>
        </div>
      </section>
    </div>
  );
}

function HelpCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="flex flex-col items-center text-center p-8 border border-border hover:border-einstein-blue/20 transition-all group">
      <div className={`mb-6 p-4 rounded-full bg-secondary/50 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h4 className="text-lg font-bold mb-3 uppercase tracking-wider">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-background p-8 border border-border text-center shadow-sm">
      <div className="text-3xl font-display text-einstein-blue mb-1">{value}</div>
      <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{label}</div>
    </div>
  );
}
