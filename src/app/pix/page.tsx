'use client';

import React, { useState } from 'react';
import PixQRCode from '@/components/PixQRCode';
import { CreditCard, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PixPage() {
  const [amount, setAmount] = useState<number>(29.90);
  const PIX_KEY = "62999216741";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        
        {/* Left Side: Marketing/Info */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              Pagamento <span className="text-green-500">Instantâneo.</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
              Apoie nosso projeto usando PIX. Seguro, rápido e sem taxas adicionais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Zap className="w-5 h-5 text-yellow-500" />} 
              title="Instantâneo" 
              description="Confirmação em poucos segundos." 
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-5 h-5 text-blue-500" />} 
              title="Seguro" 
              description="Processado via Banco Central." 
            />
          </div>

          <div className="space-y-4 pt-6">
            <label className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Selecione ou digite um valor</label>
            <div className="flex flex-wrap gap-2">
              {[10, 29.90, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                    amount === val 
                    ? "bg-green-500 text-white scale-105 shadow-lg shadow-green-500/20" 
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-green-500"
                  }`}
                >
                  R$ {val.toFixed(2)}
                </button>
              ))}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">R$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-10 pr-4 py-3 w-32 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold"
                  placeholder="Outro"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Component */}
        <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-1000 delay-200">
          <PixQRCode 
            keyPix={PIX_KEY}
            amount={amount}
            name="EINSTEIN COPE"
            city="SAO PAULO"
          />
        </div>

      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <CreditCard className="w-12 h-12" />
        <div className="font-bold text-2xl tracking-tighter italic">PIX</div>
        <div className="font-bold text-2xl tracking-tighter italic">NUBANK</div>
        <div className="font-bold text-2xl tracking-tighter italic">INTER</div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-2">
      {icon}
      <h4 className="font-bold text-zinc-900 dark:text-white">{title}</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
