import './globals.css'

import { Instrument_Serif, Inter } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Einstein 2026 — COMPETE 2026',
  description: 'Campanha de arrecadação de alimentos da turma 1° Einstein (Einstão). Transformando competição em solidariedade.',
  icons: {
    icon: '/logo2.png',
  },
}

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body'
})

function AppLayout(props: React.PropsWithChildren) {
  return (
    <html lang="pt-BR" className={`${instrumentSerif.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-body overflow-x-hidden" suppressHydrationWarning>{props.children}</body>
    </html>
  )
}

export default AppLayout
