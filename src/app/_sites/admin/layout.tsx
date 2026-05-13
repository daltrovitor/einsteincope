'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ticket, Users, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8F5EE]">Carregando...</div>;
  }

  if (!isAuthenticated && pathname !== '/login') {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4">
         <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#8E5A3C]/10 text-center">
            <h1 className="text-2xl font-black text-[#4A2B1D] mb-4">Acesso Restrito</h1>
            <p className="text-[#8E5A3C] mb-8">Você precisa estar logado para acessar esta área.</p>
            <Link href="/login" className="inline-block bg-[#4A2B1D] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#3A2217] transition-all shadow-lg">
              Ir para Login
            </Link>
         </div>
      </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Geral', href: '/', icon: LayoutDashboard },
    { name: 'Rifas', href: '/rifas', icon: Ticket },
    { name: 'Compradores', href: '/compradores', icon: Users },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#4A2B1D] text-white rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#8E5A3C]/10 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 flex items-center gap-3">
             <div className="w-10 h-10 bg-[#4A2B1D] rounded-xl flex items-center justify-center text-white font-black text-xl">E</div>
             <span className="font-black text-xl text-[#4A2B1D]">Einstein Admin</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-[#4A2B1D] text-white shadow-lg' : 'text-[#8E5A3C] hover:bg-[#F8F5EE]'}`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
