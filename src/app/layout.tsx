import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Einstein - Portal do Aluno',
  description: 'Portal de tarefas e provas para alunos',
  icons: {
    icon: '/einstein.ico',
    shortcut: '/einstein.ico',
    apple: '/einstein.png',
  },
}

const inter = Inter({
  subsets: ['latin-ext'],
  weight: ['400', '700'],
  display: 'swap'
})

function AppLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" className={inter.className}>
      <body>{props.children}</body>
    </html>
  )
}

export default AppLayout
