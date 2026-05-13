'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RaffleSection() {
  return (
    <section id="rifas" className="relative py-32 bg-[#F8F5EE] overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 text-[#4A2B1D]"
          >
            RIFA SOLIDÁRIA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#8E5A3C] max-w-3xl mx-auto font-medium"
          >
            Toda a renda será destinada à arrecadação de alimentos para instituições que realmente precisam!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Rifa 1 - Secador */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#8E5A3C] flex flex-col justify-between"
          >
            <div>
              <div className="bg-[#8E5A3C] text-white inline-block px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-6 shadow-md">
                Prêmio 1
              </div>
              <h3 className="text-3xl font-black text-[#4A2B1D] mb-4">Secador Philco 4 em 1 Dobrável</h3>
              <p className="text-[#8E5A3C] mb-6 font-medium">Motor BLDC - PSC3500 | 127V</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  '4 em 1: seca, alisa, modela e dá volume',
                  'Mais potência, menos ruído e mais durabilidade',
                  'Compacto e perfeito para qualquer lugar',
                  'Tecnologia de Íons: menos frizz e mais brilho'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8E5A3C] mt-1 text-xl">✓</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/rifas/secador">
              <button className="w-full bg-[#4A2B1D] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#3A2217] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                Comprar Rifa (R$ 10,00)
              </button>
            </Link>
          </motion.div>

          {/* Rifa 2 - Clareamento */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#8E5A3C] flex flex-col justify-between"
          >
            <div>
              <div className="bg-[#8E5A3C] text-white inline-block px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-6 shadow-md">
                Prêmio 2
              </div>
              <h3 className="text-3xl font-black text-[#4A2B1D] mb-4">Clareamento Caseiro Moldado</h3>
              <p className="text-[#8E5A3C] mb-6 font-medium">CD3 Odontologia</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Acompanhamento odontológico durante todo o tratamento',
                  'Em caso de sensibilidade, a doutora fará acompanhamento',
                  'Com molheira e seringas inclusas',
                  'Agendado diretamente no celular da doutora'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8E5A3C] mt-1 text-xl">✓</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/rifas/clareamento">
              <button className="w-full bg-[#4A2B1D] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#3A2217] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                Comprar Rifa (R$ 10,00)
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-[#4A2B1D]">Valor de cada rifa: R$ 10,00</p>
          <div className="bg-[#8E5A3C] text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg">
            Sorteio: 25 de Maio
          </div>
        </div>
      </div>
    </section>
  );
}
