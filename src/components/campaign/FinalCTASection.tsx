'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref}
      className="bg-white py-32 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl md:text-7xl font-instrument text-gray-900 mb-10">
          Faça parte dessa corrente do bem
        </h2>
        
        <button className="bg-einstein-blue text-white rounded-full px-12 py-5 text-xl font-bold hover:shadow-2xl hover:shadow-blue-900/30 transition-all hover:scale-105 active:scale-95 mb-8">
          Doar agora
        </button>
        
        <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
          Cada contribuição importa <span className="text-einstein-red text-2xl">❤️</span>
        </p>
      </motion.div>
    </section>
  );
}
