'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, Search, Filter } from 'lucide-react';

export default function AdminCompradoresPage() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const [raffles, setRaffles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: rafflesData } = await supabase.from('raffles').select('id, title');
    const { data: buyersData } = await supabase
      .from('raffle_buyers')
      .select('*, raffles(title)')
      .order('created_at', { ascending: false });
    
    setRaffles(rafflesData || []);
    setBuyers(buyersData || []);
    setLoading(false);
  }

  const approvePayment = async (id: number) => {
    const { error } = await supabase
      .from('raffle_buyers')
      .update({ status: 'APPROVED', updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) alert('Erro ao aprovar: ' + error.message);
    else fetchData();
  };

  const filteredBuyers = buyers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#4A2B1D]">Gerenciar Compradores</h1>
        <p className="text-[#8E5A3C] font-medium">Acompanhe pagamentos e valide participações.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E5A3C]" size={20} />
           <input 
             type="text"
             placeholder="Buscar por nome ou telefone..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-white focus:border-[#8E5A3C] outline-none shadow-sm transition-all"
           />
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-[#8E5A3C]/10 shadow-sm">
           <Filter size={18} className="text-[#8E5A3C]" />
           <select 
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="bg-transparent font-bold text-[#4A2B1D] outline-none"
           >
             <option value="ALL">Todos os Status</option>
             <option value="PENDING">Pendentes</option>
             <option value="APPROVED">Aprovados</option>
             <option value="REJECTED">Rejeitados</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-[#8E5A3C]/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#F8F5EE]/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">Comprador</th>
                <th className="px-8 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">Rifa</th>
                <th className="px-8 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">Números</th>
                <th className="px-8 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">Valor</th>
                <th className="px-8 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">Status / Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center text-[#8E5A3C] font-bold">Carregando dados...</td></tr>
              ) : filteredBuyers.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center text-[#8E5A3C] font-bold">Nenhum comprador encontrado.</td></tr>
              ) : filteredBuyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-[#F8F5EE]/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-black text-[#4A2B1D]">{buyer.name}</div>
                    <div className="text-sm text-[#8E5A3C] font-medium">{buyer.phone}</div>
                    <div className="text-xs text-gray-400 mt-1">PIX: {buyer.pix_account_name}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-[#8E5A3C]/10 text-[#8E5A3C] px-3 py-1 rounded-full text-xs font-bold">
                      {buyer.raffles?.title || 'Rifa Excluída'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {buyer.numbers?.map((num: string, idx: number) => (
                        <span key={idx} className="bg-white border border-[#8E5A3C]/20 text-[#4A2B1D] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-[#4A2B1D]">
                    R$ {Number(buyer.total_value).toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-8 py-6">
                    {buyer.status === 'APPROVED' ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-green-100 text-green-700 uppercase tracking-tighter">
                        <CheckCircle size={14} /> Aprovado
                      </span>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-yellow-100 text-yellow-700 uppercase tracking-tighter">
                          <Clock size={14} /> Pendente
                        </span>
                        <button 
                          onClick={() => approvePayment(buyer.id)}
                          className="text-xs bg-[#4A2B1D] text-white px-4 py-2 rounded-xl hover:bg-[#3A2217] transition-all shadow-md font-black uppercase tracking-wider"
                        >
                          Confirmar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
