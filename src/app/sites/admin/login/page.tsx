'use client';

import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real production app, this would be a server action or API call
    // For this demonstration, we use the user's previously defined password
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      window.location.href = '/';
    } else {
      setError(true);
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
          <p className="text-center text-[#8E5A3C] mb-10 font-medium">Insira sua senha para continuar.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-[#4A2B1D] uppercase tracking-widest mb-3 ml-1">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                }}
                autoFocus
                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all outline-none text-lg ${error ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-[#8E5A3C] focus:bg-white'}`}
                placeholder="••••••••"
              />
              {error && (
                <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-bold animate-shake">
                    <span>⚠️ Senha incorreta. Tente novamente.</span>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2B1D] text-white font-black py-5 rounded-2xl hover:bg-[#3A2217] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar no Sistema'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-[#8E5A3C] font-medium text-sm">Einstein Raffle Platform v2.0</p>
    </div>
  );
}
