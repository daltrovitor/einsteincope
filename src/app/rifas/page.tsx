import Navbar from '@/components/campaign/Navbar';
import { Footer } from '@/components/campaign/FinalSections';
import Einstein3D from '@/components/campaign/Einstein3D';
import Link from 'next/link';
import Image from 'next/image';

export default function RifasLandingPage() {
  return (
    <main className="bg-[#F8F5EE] min-h-screen pt-24 pb-0 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex justify-center items-center">
          <div className="w-[800px] h-[800px] bg-[#8E5A3C] rounded-full blur-[120px] mix-blend-multiply opacity-30"></div>
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-[#8E5A3C] text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-6 shadow-md">
              Apoie Nossa Causa
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#4A2B1D] mb-6 leading-tight">
              Rifa Solidária <br/>
              <span className="text-[#8E5A3C]">Turma Einstein COPE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Participe e ajude quem mais precisa! Toda a renda será destinada à arrecadação de alimentos para instituições que realmente precisam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#premios" className="bg-[#4A2B1D] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3A2217] transition-all hover:scale-105 active:scale-95 shadow-xl text-center">
                Ver Prêmios
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[400px] lg:h-[600px] relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
            <div className="absolute inset-0 bg-[#4A2B1D]/10 z-10 pointer-events-none"></div>
            <Einstein3D />
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="premios" className="py-24 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#4A2B1D] mb-4">Escolha sua Rifa</h2>
            <p className="text-xl text-[#8E5A3C] font-medium">Sorteio dia 25 de Maio • R$ 10,00 cada</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Prize 1 */}
            <div className="bg-[#F8F5EE] rounded-3xl overflow-hidden shadow-lg border-2 border-[#8E5A3C]/20 hover:border-[#8E5A3C] transition-all hover:-translate-y-2 duration-300 flex flex-col group">
              <div className="h-[300px] bg-white relative p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EE] to-transparent z-10 opacity-80"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" 
                  alt="Secador Philco 4 em 1" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-20 bg-[#F8F5EE]">
                <div className="bg-[#8E5A3C] text-white self-start px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4 shadow-sm">
                  Prêmio 1
                </div>
                <h3 className="text-3xl font-black text-[#4A2B1D] mb-2">Secador Philco 4 em 1</h3>
                <p className="text-[#8E5A3C] mb-6 font-medium">Dobrável • Motor BLDC • Tecnologia de Íons</p>
                <div className="mt-auto">
                  <Link href="/rifas/secador" className="block w-full bg-[#4A2B1D] text-white text-center py-4 rounded-2xl font-bold text-xl hover:bg-[#3A2217] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    Comprar Rifa
                  </Link>
                </div>
              </div>
            </div>

            {/* Prize 2 */}
            <div className="bg-[#F8F5EE] rounded-3xl overflow-hidden shadow-lg border-2 border-[#8E5A3C]/20 hover:border-[#8E5A3C] transition-all hover:-translate-y-2 duration-300 flex flex-col group">
              <div className="h-[300px] bg-white relative p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EE] to-transparent z-10 opacity-80"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop" 
                  alt="Clareamento Dental Caseiro" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-20 bg-[#F8F5EE]">
                <div className="bg-[#8E5A3C] text-white self-start px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4 shadow-sm">
                  Prêmio 2
                </div>
                <h3 className="text-3xl font-black text-[#4A2B1D] mb-2">Clareamento Caseiro</h3>
                <p className="text-[#8E5A3C] mb-6 font-medium">CD3 Odontologia • Moldado no Consultório</p>
                <div className="mt-auto">
                  <Link href="/rifas/clareamento" className="block w-full bg-[#4A2B1D] text-white text-center py-4 rounded-2xl font-bold text-xl hover:bg-[#3A2217] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    Comprar Rifa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
