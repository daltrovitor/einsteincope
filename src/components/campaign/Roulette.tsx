'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RouletteProps {
  participants: { name: string; number: string; phone: string }[];
}

export default function Roulette({ participants }: RouletteProps) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<{ name: string; number: string; phone: string } | null>(null);
  const [currentDisplay, setCurrentDisplay] = useState('0000');

  const spin = () => {
    if (participants.length === 0) return;
    
    setSpinning(true);
    setWinner(null);
    
    let iterations = 0;
    const maxIterations = 40;
    const intervalTime = 50; // ms

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentDisplay(participants[randomIndex].number);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const finalWinner = participants[Math.floor(Math.random() * participants.length)];
        setCurrentDisplay(finalWinner.number);
        setWinner(finalWinner);
        setSpinning(false);
      }
    }, intervalTime);
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mt-8">
      <h3 className="text-3xl font-black text-[#4A2B1D] mb-8">Sorteio / Roleta</h3>

      <div className="bg-[#8E5A3C] p-2 rounded-2xl mb-8 shadow-inner w-full max-w-sm">
        <div className="bg-white rounded-xl py-8 px-4 text-center border-4 border-[#4A2B1D]">
          <motion.div 
            key={currentDisplay}
            initial={{ opacity: 0.5, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black tracking-[0.2em] text-[#4A2B1D]"
          >
            {currentDisplay}
          </motion.div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning || participants.length === 0}
        className="bg-green-600 text-white px-12 py-4 rounded-full font-black text-2xl uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-green-600/30 active:scale-95"
      >
        {spinning ? 'Sorteando...' : 'Sortear Vencedor!'}
      </button>

      {participants.length === 0 && (
        <p className="mt-4 text-red-500 font-medium">Nenhum participante aprovado para sortear.</p>
      )}

      {winner && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 bg-yellow-100 border-4 border-yellow-400 p-8 rounded-3xl text-center w-full max-w-md shadow-2xl"
        >
          <div className="text-yellow-600 font-bold uppercase tracking-widest mb-2">🎉 Temos um Ganhador! 🎉</div>
          <h4 className="text-3xl font-black text-gray-900 mb-2">{winner.name}</h4>
          <p className="text-xl text-gray-700 font-medium mb-1">Número: <strong className="text-2xl text-[#8E5A3C]">{winner.number}</strong></p>
          <p className="text-lg text-gray-600">Telefone: {winner.phone}</p>
        </motion.div>
      )}
    </div>
  );
}
