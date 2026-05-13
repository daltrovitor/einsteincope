import Navbar from '@/components/campaign/Navbar';
import { Footer } from '@/components/campaign/FinalSections';
import RafflePurchaseForm from '@/components/campaign/RafflePurchaseForm';
import Image from 'next/image';

export default function RifaSecador() {
  const PIX_KEY = '5517997380962'; // Using a dummy key or the real one if we had it, fallback

  return (
    <main className="bg-[#F8F5EE] min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <div className="bg-[#8E5A3C] text-white inline-block px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-6 shadow-md">
            Prêmio 1
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#4A2B1D] mb-4">Secador Philco 4 em 1 Dobrável</h1>
          <p className="text-xl md:text-2xl text-[#8E5A3C] font-medium">Motor BLDC - PSC3500 | 127V</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#8E5A3C] h-fit">
            <h2 className="text-2xl font-black text-[#4A2B1D] mb-6">Detalhes do Prêmio</h2>
            
            <ul className="space-y-4 mb-8">
              {[
                '4 em 1: seca, alisa, modela e dá volume',
                'Motor BLDC: mais potência, menos ruído e mais durabilidade',
                'Dobrável: compacto e perfeito para qualquer lugar',
                'Tecnologia de Íons: menos frizz e mais brilho',
                'Design moderno e sofisticado',
                'Marca: Philco'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="bg-[#8E5A3C] text-white rounded-full p-1 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </span>
                  <span className="text-gray-700 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
              <h3 className="font-bold text-orange-800 mb-2">Informações do Sorteio</h3>
              <p className="text-orange-700">Valor da rifa: <strong className="text-xl">R$ 10,00</strong></p>
              <p className="text-orange-700">Participe até: <strong>25 de Maio</strong></p>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <RafflePurchaseForm 
              raffleId="secador" 
              price={10} 
              pixKey={PIX_KEY}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
