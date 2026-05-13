'use client';

import { useState, useEffect } from 'react';
import Roulette from '@/components/campaign/Roulette';
import { CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'secador' | 'clareamento'>('secador');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/rifas');
      const data = await res.json();
      setBuyers(data || []);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const approvePayment = async (id: string) => {
    try {
      const res = await fetch('/api/admin/rifas/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchData(); // reload
      }
    } catch (error) {
      console.error('Error approving payment', error);
    }
  };

  const filteredBuyers = buyers.filter(b => b.raffleId === activeTab);
  const totalArrecadado = filteredBuyers.reduce((acc, curr) => acc + (curr.status === 'APPROVED' ? curr.totalValue : 0), 0);
  
  // Extract numbers for roulette
  const rouletteParticipants = filteredBuyers
    .filter(b => b.status === 'APPROVED')
    .flatMap(b => b.numbers.map((num: string) => ({
      name: b.name,
      phone: b.phone,
      number: num
    })));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#4A2B1D] font-bold text-2xl">Carregando Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#4A2B1D] tracking-tight">Dashboard de Rifas</h1>
          <p className="mt-2 text-lg text-gray-600">Gerencie compradores e realize sorteios.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          <button 
            onClick={() => setActiveTab('secador')}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${activeTab === 'secador' ? 'bg-[#8E5A3C] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Secador 4 em 1
          </button>
          <button 
            onClick={() => setActiveTab('clareamento')}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${activeTab === 'clareamento' ? 'bg-[#8E5A3C] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            Clareamento Caseiro
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* List of buyers */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Compradores</h2>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                  Total Arrecadado: R$ {totalArrecadado.toFixed(2).replace('.', ',')}
                </div>
              </div>

              {filteredBuyers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum comprador ainda para esta rifa.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nome / Contato</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Conta PIX</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Números</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status / Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredBuyers.map((buyer) => (
                        <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{buyer.name}</div>
                            <div className="text-sm text-gray-500">{buyer.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {buyer.pixAccountName}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {buyer.numbers.map((num: string, idx: number) => (
                                <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-mono font-bold">
                                  {num}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">({buyer.quantity} rifas)</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-900">
                            R$ {buyer.totalValue.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="px-6 py-4">
                            {buyer.status === 'APPROVED' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4" /> Aprovado
                              </span>
                            ) : (
                              <div className="flex flex-col gap-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                  <Clock className="w-4 h-4" /> Pendente
                                </span>
                                <button 
                                  onClick={() => approvePayment(buyer.id)}
                                  className="text-xs bg-[#4A2B1D] text-white px-3 py-1 rounded hover:bg-[#3A2217] transition-colors shadow-sm"
                                >
                                  Aprovar
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Roulette */}
          <div className="xl:col-span-1">
            <Roulette participants={rouletteParticipants} />
          </div>
        </div>
      </div>
    </div>
  );
}
