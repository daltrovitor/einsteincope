'use client'

import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import Logo from './Logo'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 }
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-700 ${
        scrolled
          ? 'border-b border-black/[0.03] bg-white/80 py-4 backdrop-blur-xl'
          : 'bg-transparent'
      }`}>
      <div className="flex items-center gap-12">
        <Logo className="h-auto w-16" />

        <div className="hidden items-center gap-8 lg:flex">
          {['Sobre', 'Impacto', 'Como Ajudar', 'Galeria'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-primary text-[10px] font-bold tracking-[0.4em] text-black/70 uppercase transition-colors duration-500">
              {item}
            </a>
          ))}
        </div>
      </div>

      <Link href="/donate">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          whileTap={{ scale: 0.95 }}
          className="shadow-premium cursor-pointer rounded-full bg-black px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          Contribuir
        </motion.button>
      </Link>
    </motion.nav>
  )
}
