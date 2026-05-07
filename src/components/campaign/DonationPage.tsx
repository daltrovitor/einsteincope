'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { generatePixPayload } from '@/utils/pix';
import { Copy, Check, X } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';

const PIX_KEY = '7c653110-0380-458c-ba23-fd3e291e6104';
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
      {/* Infinite Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/20 to-cyan-100/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-100/15 to-pink-100/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8 md:p-12">
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Contribua com EINSTÃO
            </h1>
            <p className="text-lg text-gray-600">
              Escolha quanto você deseja doar
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
                  className={`py-4 px-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95'
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
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-600">R$</span>
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
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
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
              <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
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
