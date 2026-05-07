'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, CreditCard, Share2 } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    title: "Escolha Alimentos",
    desc: "Priorize itens não perecíveis como arroz, feijão, óleo e macarrão.",
    step: "01"
  },
  {
    icon: CreditCard,
    title: "Ponto de Coleta",
    desc: "Entregue sua doação em nossos pontos identificados na escola.",
    step: "02"
  },
  {
    icon: Share2,
    title: "Divulgue",
    desc: "Compartilhe nossa causa com amigos e familiares para ampliar o impacto.",
    step: "03"
  }
];

export default function HowToHelpSection() {
  return (
    <section id="como-ajudar" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-black mb-6">
            Como você pode <span className="text-primary italic">ajudar</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Passos simples para fazer a diferença. Cada pequena ação conta para nossa meta coletiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-[2rem] bg-gray-50 group hover:bg-black transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-5xl font-display text-gray-200 group-hover:text-white/10 transition-colors">
                {item.step}
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary transition-colors">
                <item.icon className="text-primary group-hover:text-white transition-colors" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-black group-hover:text-white transition-colors mb-4 uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed font-medium">
                {item.desc}
              </p>
              
              <motion.button
                className="mt-8 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Saiba Mais <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
