'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Check, Copy, AlertCircle, Loader2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePixPayload } from '@/utils/pix';
import { cn } from '@/utils/cn'; // Assuming you have a cn utility, or I'll provide one

// Dynamic import for QRCode to avoid SSR/Hydration issues
const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then((mod) => mod.QRCodeCanvas),
  { ssr: false, loading: () => <div className="flex aspect-square w-full items-center justify-center bg-gray-100 rounded-lg dark:bg-zinc-800"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div> }
);

interface PixQRCodeProps {
  keyPix: string;
  amount?: number;
  name?: string;
  city?: string;
  className?: string;
}

/**
 * PixQRCode Component
 * 
 * A professional PIX payment component that generates a QR Code and 
 * PIX Copy and Paste string.
 */
export default function PixQRCode({
  keyPix,
  amount = 0,
  name = 'DONATION',
  city = 'SAO PAULO',
  className
}: PixQRCodeProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize the payload generation for optimization
  const payload = useMemo(() => {
    try {
      return generatePixPayload(keyPix, amount, name, city);
    } catch (err) {
      setError('Erro ao gerar payload PIX');
      return '';
    }
  }, [keyPix, amount, name, city]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopy = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800", className)}>
      <div className="flex flex-col items-center space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Pagamento via PIX</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Escaneie o QR Code ou copie o código</p>
        </div>

        {/* QR Code Section */}
        <div className="relative group">
          <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-200 overflow-hidden">
            {payload ? (
              <QRCodeCanvas
                value={payload}
                size={220}
                level="H"
                includeMargin={true}
              />
            ) : (
              <div className="w-[220px] h-[220px] flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {!isLoaded && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white dark:bg-zinc-900 flex items-center justify-center rounded-2xl"
              >
                <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Amount Display */}
        {amount > 0 && (
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Valor a pagar</span>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
            </div>
          </div>
        )}

        {/* Copy and Paste Section */}
        <div className="w-full space-y-3">
          <button
            onClick={handleCopy}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 active:scale-95",
              copied 
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30" 
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
            )}
          >
            <div className="flex items-center gap-3">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span className="font-medium text-sm">
                {copied ? 'Copiado!' : 'PIX Copia e Cola'}
              </span>
            </div>
            {!copied && <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-full uppercase">Copiar</span>}
          </button>

          <p className="text-[10px] text-center text-zinc-400 leading-relaxed px-4">
            Após copiar, abra o app do seu banco e escolha a opção "PIX Copia e Cola" para realizar o pagamento.
          </p>
        </div>

        {/* Footer Info */}
        <div className="w-full pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center text-[11px] text-zinc-400">
          <div className="flex items-center gap-1">
            <QrCode className="w-3 h-3" />
            <span>QR Code Dinâmico</span>
          </div>
          <div>Segurança BCB</div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
