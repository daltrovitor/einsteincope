'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Users, Ticket, DollarSign, ArrowUpRight, Calendar } from 'lucide-react';
import Roulette from '@/components/campaign/Roulette';

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    totalRaffles: 0,
    totalBuyers: 0,
    totalApproved: 0,
    totalRevenue: 0
  });
  const [activeRaffleId, setActiveRaffleId] = useState<string | null>(null);
  const [raffles, setRaffles] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: rafflesData } = await supabase.from('raffles').select('*');
    const { data: buyersData } = await supabase.from('raffle_buyers').select('*');
    
    if (rafflesData && buyersData) {
      setRaffles(rafflesData);
      setBuyers(buyersData);
      
      const approved = buyersData.filter(b => b.status === 'APPROVED');
      const revenue = approved.reduce((acc, curr) => acc + Number(curr.total_value), 0);
      
      setStats({
        totalRaffles: rafflesData.length,
        totalBuyers: buyersData.length,
        totalApproved: approved.length,
        totalRevenue: revenue
      });

      if (rafflesData.length > 0) {
        setActiveRaffleId(String(rafflesData[0].id));
      }
    }
    setLoading(false);
  }

  const activeRaffle = raffles.find(r => String(r.id) === activeRaffleId);
  const raffleBuyers = buyers.filter(b => String(b.raffle_id) === activeRaffleId && b.status === 'APPROVED');
  
  const rouletteParticipants = raffleBuyers.flatMap(b => 
    b.numbers.map((num: string) => ({
      name: b.name,
      phone: b.phone,
      number: num
    }))
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-[#4A2B1D] tracking-tight">Bem-vindo, Admin</h1>
        <p className="text-[#8E5A3C] font-medium text-lg">Aqui está um resumo do seu sistema de rifas.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Rifas Criadas', value: stats.totalRaffles, icon: Ticket, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Pedidos', value: stats.totalBuyers, icon: Users, color: 'bg-purple-50 text-purple-600' },
          { label: 'Pagos / Aprovados', value: stats.totalApproved, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
          { label: 'Receita Total', value: `R$ ${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-orange-50 text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#8E5A3C]/5 flex flex-col gap-4">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
               <stat.icon size={24} />
            </div>
            <div>
               <p className="text-sm font-bold text-[#8E5A3C] uppercase tracking-widest mb-1">{stat.label}</p>
               <p className="text-3xl font-black text-[#4A2B1D]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Sorteio Section */}
        <div className="xl:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-[#4A2B1D]/5 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <h2 className="text-2xl font-black text-[#4A2B1D]">Realizar Sorteio</h2>
                    <p className="text-[#8E5A3C] font-medium">Selecione uma rifa e rode a roleta.</p>
                 </div>
                 <select 
                   value={activeRaffleId || ''}
                   onChange={(e) => setActiveRaffleId(e.target.value)}
                   className="bg-[#F8F5EE] border-2 border-transparent focus:border-[#8E5A3C] px-4 py-2 rounded-xl font-bold text-[#4A2B1D] outline-none transition-all"
                 >
                    {raffles.map(r => (
                       <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                 </select>
              </div>

              <div className="bg-[#F8F5EE] rounded-[2rem] p-10 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-[#8E5A3C]/20">
                 {activeRaffleId ? (
                    <Roulette participants={rouletteParticipants} />
                 ) : (
                    <p className="text-[#8E5A3C] font-bold">Selecione uma rifa para começar.</p>
                 )}
              </div>
           </div>
        </div>

        {/* Quick Actions / Recent */}
        <div className="space-y-6">
           <div className="bg-[#4A2B1D] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={100} /></div>
              <h3 className="text-xl font-black mb-2">Acesso Rápido</h3>
              <p className="text-white/70 text-sm mb-6">Links úteis para o dia a dia.</p>
              
              <div className="space-y-3">
                 <a href="/rifas" className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all group">
                    <span className="font-bold">Nova Rifa</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </a>
                 <a href="/compradores" className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all group">
                    <span className="font-bold">Ver Compradores</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </a>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#8E5A3C]/5">
              <div className="flex items-center gap-2 mb-6">
                 <Calendar className="text-[#8E5A3C]" size={20} />
                 <h3 className="text-lg font-black text-[#4A2B1D]">Próximos Sorteios</h3>
              </div>
              
              <div className="space-y-4">
                 {raffles.filter(r => r.status === 'OPEN').slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F8F5EE] transition-colors cursor-pointer">
                       <div className="w-12 h-12 bg-[#8E5A3C]/10 rounded-xl flex flex-col items-center justify-center">
                          <span className="text-[10px] font-black text-[#8E5A3C] uppercase">{new Date(r.draw_date).toLocaleString('pt-BR', { month: 'short' })}</span>
                          <span className="text-lg font-black text-[#4A2B1D] leading-none">{new Date(r.draw_date).getDate()}</span>
                       </div>
                       <div>
                          <p className="font-bold text-[#4A2B1D] text-sm line-clamp-1">{r.title}</p>
                          <p className="text-xs text-[#8E5A3C] font-medium">R$ {Number(r.price).toFixed(2)}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
