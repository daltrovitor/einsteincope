'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MousePointer2, Heart, Share2 } from 'lucide-react'

const steps = [
  {
    icon: MousePointer2,
    title: 'Escolha',
    desc: 'Decida como você pode contribuir hoje.',
    color: 'bg-primary'
  },
  {
    icon: Heart,
    title: 'Doe',
    desc: 'Faça sua parte e mude uma realidade.',
    color: 'bg-accent-red'
  },
  {
    icon: Share2,
    title: 'Apoie',
    desc: 'Divulgue e multiplique a solidariedade.',
    color: 'bg-accent-yellow'
  }
]

export function HowToHelpSection() {
  return (
    <section id="como-ajudar" className="bg-white px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl leading-none tracking-tighter md:text-8xl">
            TRÊS PASSOS PARA <br />{' '}
            <span className="text-primary italic">A TRANSFORMAÇÃO.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center">
              <div
                className={`h-24 w-24 ${step.color} mb-10 flex items-center justify-center rounded-[2rem] text-white shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[10deg]`}>
                <step.icon size={32} />
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tighter uppercase">
                {step.title}
              </h3>
              <p className="max-w-[200px] leading-relaxed font-medium text-black/70">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GallerySection() {
  return (
    <section id="galeria" className="bg-gray-50 px-6 py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070',
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070',
            'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2070'
          ].map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className="shadow-premium group aspect-[4/5] overflow-hidden rounded-[3rem]">
              <img
                src={url}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Galeria Einstein"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-48 text-center md:py-64">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}>
          <h2 className="font-display mb-16 text-6xl leading-[0.85] tracking-tighter md:text-9xl">
            AJUDE O EINSTÃO <br />{' '}
            <span className="text-primary italic">FAÇA A DIFERENÇA.</span>
          </h2>
          <Link href="/donate">
            <button className="group relative overflow-hidden rounded-full bg-black px-16 py-7 text-white shadow-2xl transition-all hover:scale-110 active:scale-95">
              <span className="relative z-10 cursor-pointer text-sm font-bold tracking-widest uppercase">
                Contribuir
              </span>
              <div className="bg-primary absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </Link>

        </motion.div>
      </div>


      {/* Background Shapes */}
      <div className="bg-accent-red/5 absolute top-1/2 left-0 h-64 w-64 rounded-full blur-[100px]" />
      <div className="bg-accent-yellow/5 absolute right-0 bottom-0 h-96 w-96 rounded-full blur-[120px]" />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-black/[0.05] bg-white px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
        <div className="text-center md:text-left">
          <span className="font-display mb-4 block text-2xl tracking-[0.2em] uppercase">
            Einstein 2026
          </span>
          <p className="text-[10px] font-bold tracking-[0.5em] text-black/60 uppercase">
            Compete 2026 — COPE
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:items-end">
          <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 uppercase">
            Desenvolvido por
          </span>
          <div className="flex flex-col items-center md:items-end gap-2">
            <a 
              href="https://viraweb.online" 
              target="_blank" 
              className="group flex flex-col items-end gap-2"
            >
              <img src="/viraweb3.png" alt="Viraweb" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <div className="w-8 h-[1px] bg-black/10 group-hover:bg-primary transition-colors" />
            </a>
            <a 
              href="https://viraweb.online" 
              target="_blank"
              className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-black text-white rounded-full hover:bg-primary transition-all hover:scale-105 active:scale-95"
            >
              Visitar nosso site
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
