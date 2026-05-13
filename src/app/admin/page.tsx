'use client';

import { useState, useEffect } from 'react';
import Roulette from '@/components/campaign/Roulette';
import { CheckCircle, Clock, Lock } from 'lucide-react';
import Logo from '@/components/campaign/Logo';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'secador' | 'clareamento'>('secador');

  useEffect(() => {
    // Check if previously authenticated in this session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demonstration purposes. In production, use proper auth.
    if (password === 'admin123') { // Or check against an env variable
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError(false);
      setLoading(true);
      fetchData();
    } else {
      setLoginError(true);
    }
  };

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8F5EE] text-[#4A2B1D] font-bold text-2xl">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#8E5A3C]/10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-[#F8F5EE] rounded-full flex items-center justify-center border border-[#8E5A3C]/20">
               <Lock className="w-10 h-10 text-[#8E5A3C]" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-center text-[#4A2B1D] mb-2">Acesso Restrito</h1>
          <p className="text-center text-[#8E5A3C] mb-8 font-medium">Faça login para acessar o painel de administração.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#4A2B1D] mb-2">Senha de Administrador</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#8E5A3C] focus:ring-0 transition-colors"
                placeholder="••••••••"
              />
              {loginError && <p className="text-red-500 text-sm mt-2 font-medium">Senha incorreta. Tente novamente.</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-[#4A2B1D] text-white font-bold py-4 rounded-xl hover:bg-[#3A2217] transition-colors shadow-lg"
            >
              Entrar no Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[#F8F5EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#4A2B1D] tracking-tight">Dashboard de Rifas</h1>
            <p className="mt-2 text-lg text-[#8E5A3C] font-medium">Gerencie compradores e realize sorteios.</p>
          </div>
          <button 
            onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="px-6 py-2 border-2 border-[#8E5A3C] text-[#8E5A3C] font-bold rounded-full hover:bg-[#8E5A3C] hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          <button 
            onClick={() => setActiveTab('secador')}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${activeTab === 'secador' ? 'bg-[#4A2B1D] text-white shadow-lg' : 'bg-white text-[#8E5A3C] hover:bg-white/60 border border-[#8E5A3C]/20'}`}
          >
            Secador 4 em 1
          </button>
          <button 
            onClick={() => setActiveTab('clareamento')}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${activeTab === 'clareamento' ? 'bg-[#4A2B1D] text-white shadow-lg' : 'bg-white text-[#8E5A3C] hover:bg-white/60 border border-[#8E5A3C]/20'}`}
          >
            Clareamento Caseiro
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* List of buyers */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#8E5A3C]/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#4A2B1D]">Compradores</h2>
                <div className="bg-[#4A2B1D] text-white px-4 py-2 rounded-full font-bold">
                  Arrecadado: R$ {totalArrecadado.toFixed(2).replace('.', ',')}
                </div>
              </div>

              {filteredBuyers.length === 0 ? (
                <p className="text-[#8E5A3C] text-center py-8 font-medium">Nenhum comprador ainda para esta rifa.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#8E5A3C] uppercase tracking-wider">Nome / Contato</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#8E5A3C] uppercase tracking-wider">Conta PIX</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#8E5A3C] uppercase tracking-wider">Números</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#8E5A3C] uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#8E5A3C] uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBuyers.map((buyer) => (
                        <tr key={buyer.id} className="hover:bg-[#F8F5EE] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#4A2B1D]">{buyer.name}</div>
                            <div className="text-sm text-[#8E5A3C]">{buyer.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#8E5A3C] font-medium">
                            {buyer.pixAccountName}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {buyer.numbers.map((num: string, idx: number) => (
                                <span key={idx} className="bg-[#F8F5EE] text-[#4A2B1D] text-xs px-2 py-1 rounded font-mono font-bold border border-[#8E5A3C]/20">
                                  {num}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-[#8E5A3C] mt-1 font-medium">({buyer.quantity} rifas)</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-[#4A2B1D]">
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
                                  className="text-xs bg-[#4A2B1D] text-white px-3 py-2 rounded-lg hover:bg-[#3A2217] transition-colors shadow-sm font-bold"
                                >
                                  Aprovar Pgto
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
