'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

function PreloaderComponent({ waitForEinstein = false }: { waitForEinstein?: boolean }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!waitForEinstein) {
      const timer = window.setTimeout(() => {
        requestAnimationFrame(() => {
          setLoading(false)
        })
      }, 1200)
      return () => window.clearTimeout(timer)
    }

    if ((window as any).__EINSTEIN_LOADED__) {
      setLoading(false)
      return
    }

    const handleLoaded = () => setLoading(false)
    window.addEventListener('einstein-loaded', handleLoaded)

    // Fallback timer
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => {
      window.removeEventListener('einstein-loaded', handleLoaded)
      window.clearTimeout(timer)
    }
  }, [waitForEinstein])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%'
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="fixed inset-0 z-[100] flex translate-z-0 flex-col items-center justify-center bg-black text-white will-change-transform backface-hidden"
          style={{
            transform: 'translate3d(0,0,0)',
            WebkitFontSmoothing: 'antialiased'
          }}>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-display text-4xl tracking-[0.2em] uppercase will-change-transform md:text-6xl"
              style={{
                transform: 'translate3d(0,0,0)'
              }}>
              Einstein
            </motion.div>
          </div>

          <div className="mt-2 overflow-hidden">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-display text-lg italic will-change-transform"
              style={{
                transform: 'translate3d(0,0,0)'
              }}>
              2026
            </motion.p>
          </div>

          <div className="mt-12 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut'
              }}
              className="h-[1px] w-[120px] origin-left bg-white/20 will-change-transform"
              style={{
                transform: 'translate3d(0,0,0)'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Preloader = memo(PreloaderComponent)

export default Preloader
