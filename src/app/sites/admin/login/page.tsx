'use client';

import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' 
          ? 'Email ou senha incorretos.' 
          : authError.message);
      } else {
        // Redireciona para o dashboard
        window.location.href = '/';
      }
    } catch (err: any) {
      setError('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10 border-2 border-[#8E5A3C]/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A2B1D]/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8E5A3C]/5 rounded-full -ml-12 -mb-12"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-[#F8F5EE] rounded-2xl flex items-center justify-center border border-[#8E5A3C]/20 shadow-inner">
               <Lock className="w-10 h-10 text-[#8E5A3C]" />
            </div>
          </div>

          <h1 className="text-3xl font-black text-center text-[#4A2B1D] mb-2 tracking-tight">Painel Administrativo</h1>
          <p className="text-center text-[#8E5A3C] mb-10 font-medium">Faça login para acessar o sistema.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#4A2B1D] uppercase tracking-widest mb-3 ml-1">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#8E5A3C] focus:bg-white transition-all outline-none text-lg"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#4A2B1D] uppercase tracking-widest mb-3 ml-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#8E5A3C] focus:bg-white transition-all outline-none text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm font-bold p-4 rounded-xl border border-red-100 animate-shake">
                  ⚠️ {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2B1D] text-white font-black py-5 rounded-2xl hover:bg-[#3A2217] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
