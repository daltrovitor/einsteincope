'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft,
  DollarSign,
  Hash,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Image as ImageIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Raffle {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  total_numbers: number;
  status: string;
  draw_date: string;
  created_at: string;
}

interface Buyer {
  id: number;
  raffle_id: number;
  name: string;
  phone: string;
  pix_account_name: string;
  quantity: number;
  numbers: string[];
  total_value: number;
  status: string;
  created_at: string;
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export default function RaffleProfilePage() {
  const params = useParams();
  const raffleId = params?.id as string;

  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);

  // Buyers table filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Number grid pagination
  const [gridPage, setGridPage] = useState(0);

  // ── Fetch data ──────────────────────────────
  useEffect(() => {
    if (raffleId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raffleId]);

  async function fetchData() {
    setLoading(true);

    // Try to fetch by slug first, then by id (in case slug is numeric)
    let raffleRes = await supabase.from('raffles').select('*').eq('slug', raffleId).single();
    
    if (raffleRes.error && !isNaN(Number(raffleId))) {
      raffleRes = await supabase.from('raffles').select('*').eq('id', raffleId).single();
    }

    const buyersRes = raffleRes.data
      ? await supabase
          .from('raffle_buyers')
          .select('*')
          .eq('raffle_id', raffleRes.data.id)
          .order('created_at', { ascending: false })
      : { data: null };

    if (raffleRes.data) setRaffle(raffleRes.data);
    if (buyersRes.data) setBuyers(buyersRes.data);
    setLoading(false);
  }

  // ── Approve / Reject handlers ───────────────
  const updateBuyerStatus = async (buyerId: number, newStatus: string) => {
    const { error } = await supabase
      .from('raffle_buyers')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', buyerId);

    if (error) {
      alert('Erro ao atualizar status: ' + error.message);
    } else {
      fetchData();
    }
  };

  // ── Derived statistics ──────────────────────
  const stats = useMemo(() => {
    const approved = buyers.filter((b) => b.status === 'APPROVED');
    const pending = buyers.filter((b) => b.status === 'PENDING');
    const rejected = buyers.filter((b) => b.status === 'REJECTED');

    const approvedNumbers = approved.flatMap((b) => b.numbers);
    const pendingNumbers = pending.flatMap((b) => b.numbers);

    const totalRevenue = approved.reduce(
      (acc, b) => acc + Number(b.total_value),
      0,
    );
    const pendingRevenue = pending.reduce(
      (acc, b) => acc + Number(b.total_value),
      0,
    );

    return {
      totalRevenue,
      pendingRevenue,
      approvedCount: approved.length,
      pendingCount: pending.length,
      rejectedCount: rejected.length,
      soldNumbers: approvedNumbers.length,
      pendingNumbers: pendingNumbers.length,
      approvedNumbersSet: new Set(approvedNumbers),
      pendingNumbersSet: new Set(pendingNumbers),
    };
  }, [buyers]);

  // ── Number grid helpers ─────────────────────
  // Only show sold/pending numbers
  const soldAndPendingNumbers = useMemo(() => {
    const arr: Array<{ num: string; status: 'approved' | 'pending' }> = [];
    const approvedList = Array.from(stats.approvedNumbersSet);
    const pendingList = Array.from(stats.pendingNumbersSet);
    
    approvedList.forEach(num => arr.push({ num, status: 'approved' }));
    pendingList.forEach(num => arr.push({ num, status: 'pending' }));
    
    return arr.sort((a, b) => {
      const numA = parseInt(a.num, 10);
      const numB = parseInt(b.num, 10);
      return numA - numB;
    });
  }, [stats.approvedNumbersSet, stats.pendingNumbersSet]);

  const SOLD_NUMBERS_PER_PAGE = 100;
  const totalSoldPages = Math.ceil(soldAndPendingNumbers.length / SOLD_NUMBERS_PER_PAGE);
  const soldGridStart = gridPage * SOLD_NUMBERS_PER_PAGE;
  const soldGridEnd = Math.min(soldGridStart + SOLD_NUMBERS_PER_PAGE, soldAndPendingNumbers.length);

  // Build the array of numbers for the current page
  const numbersOnPage = useMemo(() => {
    return soldAndPendingNumbers.slice(soldGridStart, soldGridEnd);
  }, [soldGridStart, soldGridEnd, soldAndPendingNumbers]);

  // ── Filtered buyers for the table ───────────
  const filteredBuyers = useMemo(() => {
    return buyers.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone.includes(searchTerm);
      const matchesStatus =
        statusFilter === 'ALL' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [buyers, searchTerm, statusFilter]);

  // ── Loading / Not Found ─────────────────────
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4A2B1D] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8E5A3C] font-bold text-lg">Carregando perfil da rifa…</p>
        </div>
      </div>
    );
  }

  if (!raffle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-[#8E5A3C] font-bold text-xl">Rifa não encontrada.</p>
        <Link
          href="/sites/admin/rifas"
          className="flex items-center gap-2 text-[#4A2B1D] font-bold hover:underline"
        >
          <ArrowLeft size={18} /> Voltar para listagem
        </Link>
      </div>
    );
  }

  // ── Render ──────────────────────────────────
  const progressPercent = (stats.soldNumbers + stats.pendingNumbers) > 0
    ? Math.round((stats.soldNumbers / (stats.soldNumbers + stats.pendingNumbers)) * 100)
    : 0;

  return (
    <div className="space-y-10 pb-16">
      {/* ── Back link + Header ───────────────── */}
      <div>
        <Link
          href="/sites/admin/rifas"
          className="inline-flex items-center gap-2 text-[#8E5A3C] font-bold text-sm hover:text-[#4A2B1D] transition-colors mb-4"
        >
          <ArrowLeft size={16} /> Voltar para Rifas
        </Link>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image */}
          <div className="w-full md:w-56 h-40 md:h-36 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg border border-[#8E5A3C]/10">
            {raffle.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={raffle.image_url}
                alt={raffle.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8E5A3C]/30">
                <ImageIcon size={48} />
              </div>
            )}
          </div>

          {/* Title area */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-3xl font-black text-[#4A2B1D] tracking-tight">
                {raffle.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow ${
                  raffle.status === 'OPEN'
                    ? 'bg-green-500 text-white'
                    : raffle.status === 'DRAWN'
                    ? 'bg-purple-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {raffle.status === 'OPEN'
                  ? 'Ativa'
                  : raffle.status === 'DRAWN'
                  ? 'Sorteada'
                  : 'Encerrada'}
              </span>
            </div>
            <p className="text-[#8E5A3C] font-medium text-sm max-w-xl">
              {raffle.description}
            </p>
            <div className="flex gap-6 mt-3 text-sm text-[#8E5A3C]">
              <span className="font-bold">
                Preço: <span className="text-[#4A2B1D]">R$ {Number(raffle.price).toFixed(2)}</span>
              </span>
              {raffle.draw_date && (
                <span className="font-bold">
                  Sorteio:{' '}
                  <span className="text-[#4A2B1D]">
                    {new Date(raffle.draw_date).toLocaleDateString('pt-BR')}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: 'Faturamento Aprovado',
            value: `R$ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`,
            icon: DollarSign,
            color: 'bg-green-50 text-green-600',
            sub: `R$ ${stats.pendingRevenue.toFixed(2).replace('.', ',')} pendente`,
          },
          {
            label: 'Números Vendidos',
            value: `${stats.soldNumbers} / ${totalNumbers}`,
            icon: Hash,
            color: 'bg-blue-50 text-blue-600',
            sub: `${stats.pendingNumbers} pendente(s)`,
          },
          {
            label: 'Compradores',
            value: stats.approvedCount + stats.pendingCount + stats.rejectedCount,
            icon: Users,
            color: 'bg-purple-50 text-purple-600',
            sub: `${stats.approvedCount} aprovados`,
          },
          {
            label: 'Pagamentos Pendentes',
            value: stats.pendingCount,
            icon: Clock,
            color: 'bg-yellow-50 text-yellow-600',
            sub: `${stats.rejectedCount} rejeitado(s)`,
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[1.5rem] shadow-xl border border-[#8E5A3C]/5 flex flex-col gap-3 hover:shadow-2xl transition-shadow"
          >
            <div
              className={`w-11 h-11 ${kpi.color} rounded-xl flex items-center justify-center`}
            >
              <kpi.icon size={22} />
            </div>
            <p className="text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
              {kpi.label}
            </p>
            <p className="text-2xl font-black text-[#4A2B1D]">{kpi.value}</p>
            <p className="text-xs text-[#8E5A3C] font-medium">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Progress bar ─────────────────────── */}
      <div className="bg-white p-6 rounded-[1.5rem] shadow-xl border border-[#8E5A3C]/5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-[#8E5A3C]" />
            <span className="text-sm font-black text-[#4A2B1D] uppercase tracking-widest">
              Progresso de Vendas
            </span>
          </div>
          <span className="text-sm font-black text-[#4A2B1D]">{progressPercent}%</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #4A2B1D 0%, #8E5A3C 100%)',
            }}
          />
        </div>
        <div className="flex gap-6 mt-3 text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#4A2B1D]" /> Aprovados ({stats.soldNumbers})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-yellow-400" /> Pendentes ({stats.pendingNumbers})
          </span>
        </div>
      </div>

      {/* ── Number Grid ──────────────────────── */}
      <div className="bg-white p-6 rounded-[1.5rem] shadow-xl border border-[#8E5A3C]/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Hash size={18} className="text-[#8E5A3C]" />
            <span className="text-sm font-black text-[#4A2B1D] uppercase tracking-widest">
              Números Vendidos ({soldAndPendingNumbers.length})
            </span>
          </div>

          {totalSoldPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridPage((p) => Math.max(0, p - 1))}
                disabled={gridPage === 0}
                className="p-1.5 rounded-lg hover:bg-[#F8F5EE] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-bold text-[#8E5A3C] min-w-[120px] text-center">
                {soldGridStart + 1}–{soldGridEnd} de {soldAndPendingNumbers.length}
              </span>
              <button
                onClick={() =>
                  setGridPage((p) => Math.min(totalSoldPages - 1, p + 1))
                }
                disabled={gridPage >= totalSoldPages - 1}
                className="p-1.5 rounded-lg hover:bg-[#F8F5EE] disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {soldAndPendingNumbers.length === 0 ? (
          <div className="text-center py-12 text-[#8E5A3C] font-medium">
            Nenhum número vendido ainda
          </div>
        ) : (
          <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-1.5">
            {numbersOnPage.map(({ num, status }) => {
              const bg = status === 'approved' ? 'bg-[#4A2B1D] text-white' : 'bg-yellow-400 text-yellow-900';

              return (
                <div
                  key={num}
                  title={`#${num} — ${status === 'approved' ? 'Vendido' : 'Pendente'}`}
                  className={`${bg} text-[10px] font-mono font-bold rounded-md flex items-center justify-center h-7 select-none transition-all hover:scale-110 cursor-default`}
                >
                  {num}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Buyers Table ─────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#8E5A3C]" />
          <span className="text-sm font-black text-[#4A2B1D] uppercase tracking-widest">
            Compradores desta Rifa
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E5A3C]"
              size={20}
            />
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

        {/* Table */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#8E5A3C]/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-[#F8F5EE]/50">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Comprador
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Qtd.
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Números
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Valor
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Data
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black text-[#8E5A3C] uppercase tracking-widest">
                    Status / Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBuyers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-[#8E5A3C] font-bold"
                    >
                      Nenhum comprador encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredBuyers.map((buyer) => (
                    <tr
                      key={buyer.id}
                      className="hover:bg-[#F8F5EE]/30 transition-colors"
                    >
                      {/* Name / Phone / PIX */}
                      <td className="px-6 py-5">
                        <div className="font-black text-[#4A2B1D]">
                          {buyer.name}
                        </div>
                        <div className="text-sm text-[#8E5A3C] font-medium">
                          {buyer.phone}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          PIX: {buyer.pix_account_name}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-5 font-black text-[#4A2B1D]">
                        {buyer.quantity}
                      </td>

                      {/* Numbers */}
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {buyer.numbers?.map((num: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-white border border-[#8E5A3C]/20 text-[#4A2B1D] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold"
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Total value */}
                      <td className="px-6 py-5 font-black text-[#4A2B1D]">
                        R${' '}
                        {Number(buyer.total_value)
                          .toFixed(2)
                          .replace('.', ',')}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-[#8E5A3C] font-medium">
                        {new Date(buyer.created_at).toLocaleDateString('pt-BR')}
                      </td>

                      {/* Status / Actions */}
                      <td className="px-6 py-5">
                        {buyer.status === 'APPROVED' ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-green-100 text-green-700 uppercase tracking-tighter">
                            <CheckCircle size={14} /> Aprovado
                          </span>
                        ) : buyer.status === 'REJECTED' ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-red-100 text-red-700 uppercase tracking-tighter">
                            <XCircle size={14} /> Rejeitado
                          </span>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-yellow-100 text-yellow-700 uppercase tracking-tighter">
                              <Clock size={14} /> Pendente
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateBuyerStatus(buyer.id, 'APPROVED')
                                }
                                className="text-[10px] bg-[#4A2B1D] text-white px-3 py-1.5 rounded-lg hover:bg-[#3A2217] transition-all shadow-md font-black uppercase tracking-wider"
                              >
                                Aprovar
                              </button>
                              <button
                                onClick={() =>
                                  updateBuyerStatus(buyer.id, 'REJECTED')
                                }
                                className="text-[10px] bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-all shadow-md font-black uppercase tracking-wider"
                              >
                                Rejeitar
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
