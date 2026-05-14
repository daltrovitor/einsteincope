import Navbar from '@/components/campaign/Navbar';
import { Footer } from '@/components/campaign/FinalSections';
import RafflePurchaseForm from '@/components/campaign/RafflePurchaseForm';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface RafflePageProps {
  params: Promise<{ slug: string }>
}

export default async function RifaPage({ params }: RafflePageProps) {
  const { slug } = await params;
  
  const { data: raffle } = await supabase
    .from('raffles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!raffle) {
    notFound();
  }

  const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY || '7c653110-0380-458c-ba23-fd3e291e6104';

  // Parse description for bullets if needed, or just display as text
  const features = raffle.description?.split('\n').filter((f: string) => f.trim().length > 0) || [];

  return (
    <main className="bg-[#F8F5EE] min-h-screen pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <div className="bg-[#8E5A3C] text-white inline-block px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-6 shadow-md">
            Rifa Ativa
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#4A2B1D] mb-4">{raffle.title}</h1>
          <p className="text-xl md:text-2xl text-[#8E5A3C] font-medium">Participe e concorra!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Section */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-[#8E5A3C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={raffle.image_url || 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop'} 
                alt={raffle.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#8E5A3C]">
              <h2 className="text-2xl font-black text-[#4A2B1D] mb-6">Detalhes do Prêmio</h2>
              
              <div className="prose prose-brown max-w-none mb-8">
                <p className="text-gray-700 font-medium text-lg whitespace-pre-line">
                  {raffle.description}
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-orange-800 mb-2">Informações do Sorteio</h3>
                <p className="text-orange-700">Valor da rifa: <strong className="text-xl">R$ {Number(raffle.price).toFixed(2).replace('.', ',')}</strong></p>
                <p className="text-orange-700">Status: <strong>{raffle.status === 'OPEN' ? 'Aberto' : 'Encerrado'}</strong></p>
                {raffle.draw_date && (
                  <p className="text-orange-700">Data estimada: <strong>{new Date(raffle.draw_date).toLocaleDateString('pt-BR')}</strong></p>
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <RafflePurchaseForm 
              raffleId={raffle.slug} 
              price={Number(raffle.price)} 
              pixKey={PIX_KEY}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
