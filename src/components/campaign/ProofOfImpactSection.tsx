'use client';

import { motion } from 'framer-motion';
import { Quote, Users } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Silva",
    role: "Aluna, Turma 1° Einstein",
    quote: "Participar dessa campanha me fez entender o real significado de ser solidário. Ver que minha doação vai ajudar 250 famílias é muito impactante.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop",
    color: "bg-accent-red"
  },
  {
    name: "João Santos",
    role: "Aluno, Turma 1° Einstein",
    quote: "O EINSTÃO é mais que um nome, é um compromisso. Estamos mobilizando a turma inteira para arrecadar 1.000 kg de alimentos.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop",
    color: "bg-accent-yellow"
  },
  {
    name: "Ana Costa",
    role: "Aluna, Turma 1° Einstein",
    quote: "Competir no COPE é importante, mas saber que nossa energia está ajudando quem precisa torna tudo muito mais significativo.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop",
    color: "bg-primary"
  }
];

const stats = [
  { number: "28", label: "Alunos Engajados", icon: Users },
  { number: "100%", label: "da Turma Participando", icon: Users },
  { number: "3", label: "Pontos de Coleta Ativos", icon: Users }
];

export default function ProofOfImpactSection() {
  return (
    <section id="prova-social" className="py-32 md:py-48 bg-gradient-to-b from-white to-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6 block"
          >
            Vidas Reais, História Real
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight text-black mb-8"
          >
            QUEM ESTÁ POR TRÁS DO <span className="text-primary italic">EINSTÃO</span>
          </motion.h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-medium">
            A campanha é feita por alunos como você. Veja as histórias de quem está transformando isso em realidade.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-white border border-black/5 rounded-[2rem] p-8 h-full flex flex-col hover:shadow-lg hover:border-black/10 transition-all duration-300">
                {/* Quote Icon */}
                <Quote className="text-primary mb-4" size={24} />
                
                {/* Testimonial */}
                <p className="text-black/70 font-medium mb-8 flex-grow leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>

                {/* Person Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                  <motion.div
                    className={`w-14 h-14 ${testimonial.color} rounded-full flex-shrink-0 overflow-hidden`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-black text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-black/50 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black rounded-[3rem] p-12 md:p-16 text-white text-center"
        >
          <h3 className="font-display text-3xl md:text-5xl mb-16 uppercase tracking-tight">
            O Engajamento é <span className="text-accent-yellow italic">Real</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  {stat.number}
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-black/60 text-lg mb-8 font-medium">
            Junte-se à turma e faça parte dessa transformação
          </p>
          <button className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl">
            Participar Agora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
