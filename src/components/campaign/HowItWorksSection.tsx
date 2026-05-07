'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ShoppingCart, Users } from 'lucide-react';

const steps = [
  {
    icon: Heart,
    title: "Você doa qualquer valor",
    description: "Sua contribuição, por menor que seja, é o ponto de partida para nossa missão.",
    color: "bg-einstein-red/10 text-einstein-red"
  },
  {
    icon: ShoppingCart,
    title: "Convertemos em alimentos",
    description: "Nossa equipe realiza a compra e triagem dos alimentos de alta necessidade nutricional.",
    color: "bg-einstein-yellow/10 text-einstein-yellow"
  },
  {
    icon: Users,
    title: "Entregamos para famílias carentes",
    description: "Garantimos que cada quilo chegue às mãos de quem realmente precisa em nossa comunidade.",
    color: "bg-einstein-blue/10 text-einstein-blue"
  }
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="doações"
      ref={ref}
      className="bg-white py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-instrument text-gray-900 mb-4"
          >
            Como funciona
          </motion.h2>
          <div className="w-20 h-1 bg-einstein-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group p-8 rounded-3xl border border-gray-100 hover:border-white hover:shadow-2xl hover:shadow-gray-100 transition-all bg-white"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
