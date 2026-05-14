'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import PixQRCode from '../PixQRCode';

interface RafflePurchaseFormProps {
  raffleId: string;
  price: number;
  pixKey: string;
}

export default function RafflePurchaseForm({ raffleId, price, pixKey }: RafflePurchaseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pixAccountName: '',
    quantity: 1,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [buyerData, setBuyerData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/rifas/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, raffleId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar a compra');
      }

      setBuyerData(data.buyer);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  if (success && buyerData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl border-2 border-green-500"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-green-600 mb-2">Pedido Registrado!</h3>
          <p className="text-gray-600 mb-4">Efetue o pagamento via PIX para garantir seus números.</p>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Seus Números da Sorte:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {buyerData.numbers.map((num: string, idx: number) => (
                <span key={idx} className="bg-[#8E5A3C] text-white px-4 py-2 rounded-lg font-bold text-xl shadow-md">
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>

        <PixQRCode 
          keyPix={pixKey}
          amount={buyerData.totalValue}
          name="RIFA EINSTEIN"
          city="BRASIL"
        />

        <p className="mt-6 text-center text-sm text-gray-500">
          Após o pagamento, nosso sistema irá aprovar sua participação. Guarde seus números!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h3 className="text-2xl font-black text-[#4A2B1D] mb-6">Comprar Rifa</h3>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8E5A3C] focus:border-[#8E5A3C] outline-none transition-all"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Número de Telefone (WhatsApp)</label>
          <input 
            type="tel" 
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8E5A3C] focus:border-[#8E5A3C] outline-none transition-all"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Titular da Conta PIX</label>
          <input 
            type="text" 
            name="pixAccountName"
            required
            value={formData.pixAccountName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8E5A3C] focus:border-[#8E5A3C] outline-none transition-all"
            placeholder="Nome de quem vai fazer o PIX"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Quantidade de Rifas</label>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              name="quantity"
              min="1"
              max="50"
              required
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-24 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8E5A3C] focus:border-[#8E5A3C] outline-none transition-all text-center font-bold"
            />
            <div className="text-gray-500">
              x R$ {price.toFixed(2).replace('.', ',')} = 
              <span className="font-bold text-[#4A2B1D] ml-2 text-xl">
                R$ {(formData.quantity * price).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-8 bg-[#8E5A3C] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#7A4A30] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
      >
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Gerar PIX e Comprar'}
      </button>
    </form>
  );
}
