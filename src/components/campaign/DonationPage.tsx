'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { generatePixPayload } from '@/utils/pix';
import { Copy, Check, X } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';
import { InfiniteGrid } from '../ui/the-infinite-grid';

const PIX_KEY = '62999216741';
const DONATION_AMOUNTS = [5, 10, 20, 50, 100];

export default function DonationPage({ onClose }: { onClose?: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : null);
  const pixPayload = finalAmount ? generatePixPayload(PIX_KEY, finalAmount, 'EINSTÃO', 'Brasil') : '';

  const handleCopyPix = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pixPayload);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = pixPayload;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `qrcode-doacao-${finalAmount}.png`;
        link.click();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Interactive Infinite Grid Background */}
      <div className="absolute inset-0 z-0">
        <InfiniteGrid className="h-full" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-white/10 backdrop-blur-[40px] rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-white/30 max-w-[95%] md:max-w-xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
      >
        {/* Logo Colors in Corners of the Card */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 blur-[60px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/10 blur-[60px] pointer-events-none" />
        
        <div className="p-6 md:p-12 relative z-10">
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-4">
              Contribua com EINSTÃO
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Escolha quanto deseja doar
            </p>
          </motion.div>

          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-4 px-2 md:px-4 rounded-xl font-bold text-base md:text-lg whitespace-nowrap transition-all duration-300 ${
                    selectedAmount === amount
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white/5 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-gray-800 active:scale-95'
                  }`}
                >
                  R$ {amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ou insira um valor personalizado:
              </label>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-100/20 transition-all">
                <span className="text-lg font-bold text-gray-400">R$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Payment Details */}
          {finalAmount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* QR Code Section */}
              <div className="flex flex-col items-center p-6 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm">
                <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
                  Escaneie com seu celular
                </p>
                <QRCodeDisplay ref={qrRef} value={pixPayload} size={256} />
                <button
                  onClick={handleDownloadQR}
                  className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition-colors"
                >
                  Baixar QR Code
                </button>
              </div>

              {/* PIX Key Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Ou copie o código PIX
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    Valor: R$ {finalAmount.toFixed(2)}
                  </span>
                </div>
                <div
                  className="p-4 bg-gray-900 text-gray-50 rounded-xl font-mono text-sm break-all cursor-pointer hover:bg-gray-800 transition-colors relative group"
                  onClick={handleCopyPix}
                >
                  {pixPayload}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors" />
                </div>
                <button
                  onClick={handleCopyPix}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    copied
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      Copiar código PIX
                    </>
                  )}
                </button>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Como funciona:</span> Cole o código PIX no seu app bancário ou escaneie o QR code. O valor da transferência será R$ {finalAmount.toFixed(2)}.
                </p>
              </div>
            </motion.div>
          )}

          {/* CTA */}
          {!finalAmount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl"
            >
              <p className="text-gray-600 font-semibold">
                Selecione um valor para começar
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
