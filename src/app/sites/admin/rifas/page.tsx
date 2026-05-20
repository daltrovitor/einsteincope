'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Image as ImageIcon, Eye } from 'lucide-react';

export default function AdminRifasPage() {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRaffle, setEditingRaffle] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: 10,
    image_url: '',
    total_numbers: 1000,
    status: 'OPEN',
    draw_date: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchRaffles();
  }, []);

  async function fetchRaffles() {
    setLoading(true);
    const { data, error } = await supabase
      .from('raffles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setRaffles(data || []);
    setLoading(false);
  }

  const handleOpenModal = (raffle: any = null) => {
    if (raffle) {
      setEditingRaffle(raffle);
      setFormData({
        title: raffle.title,
        slug: raffle.slug,
        description: raffle.description || '',
        price: Number(raffle.price),
        image_url: raffle.image_url || '',
        total_numbers: raffle.total_numbers || 1000,
        status: raffle.status,
        draw_date: raffle.draw_date ? new Date(raffle.draw_date).toISOString().split('T')[0] : ''
      });
    } else {
      setEditingRaffle(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        price: 10,
        image_url: '',
        total_numbers: 1000,
        status: 'OPEN',
        draw_date: ''
      });
    }
    setIsModalOpen(true);
    setImageFile(null);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('raffles')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('raffles')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      alert('Erro ao fazer upload da imagem: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    let currentImageUrl = formData.image_url;

    if (imageFile) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        currentImageUrl = uploadedUrl;
      }
    }

    const submissionData = {
      ...formData,
      image_url: currentImageUrl
    };

    if (editingRaffle) {
      const { error } = await supabase
        .from('raffles')
        .update({
          ...submissionData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingRaffle.id);
      
      if (error) alert('Erro ao atualizar: ' + error.message);
    } else {
      const { error } = await supabase
        .from('raffles')
        .insert([submissionData]);
      
      if (error) alert('Erro ao criar: ' + error.message);
    }

    setUploading(false);
    setIsModalOpen(false);
    fetchRaffles();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta rifa?')) {
      const { error } = await supabase.from('raffles').delete().eq('id', id);
      if (error) alert('Erro ao excluir: ' + error.message);
      else fetchRaffles();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#4A2B1D]">Gerenciar Rifas</h1>
          <p className="text-[#8E5A3C] font-medium">Crie, edite e encerre suas campanhas.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4A2B1D] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3A2217] transition-all shadow-lg"
        >
          <Plus size={20} /> Nova Rifa
        </button>
      </div>

      {loading && raffles.length === 0 ? (
        <div className="text-center py-20 text-[#8E5A3C] font-bold text-xl">Carregando rifas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {raffles.map((raffle) => (
            <div key={raffle.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-[#8E5A3C]/10 flex flex-col group transition-all hover:border-[#8E5A3C]/30">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {raffle.image_url ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={raffle.image_url} alt={raffle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-[#8E5A3C]/30">
                      <ImageIcon size={48} />
                   </div>
                )}
                <div className="absolute top-4 right-4">
                   <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${raffle.status === 'OPEN' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                     {raffle.status === 'OPEN' ? 'Ativa' : 'Encerrada'}
                   </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-[#4A2B1D] mb-2">{raffle.title}</h3>
                <p className="text-[#8E5A3C] text-sm font-medium mb-4 line-clamp-2">{raffle.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                   <div className="text-[#4A2B1D] font-black text-lg">
                     R$ {Number(raffle.price).toFixed(2)}
                   </div>
                   <div className="flex gap-2">
                      <Link
                        href={`/rifas/${raffle.slug}`}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver Perfil"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        onClick={() => handleOpenModal(raffle)}
                        className="p-2 text-[#8E5A3C] hover:bg-[#F8F5EE] rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(raffle.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A2B1D]/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#F8F5EE]/50">
                <h2 className="text-2xl font-black text-[#4A2B1D]">{editingRaffle ? 'Editar Rifa' : 'Criar Nova Rifa'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors"><XCircle /></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Título do Prêmio</label>
                      <input 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                        placeholder="Ex: Secador Philco"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Slug (URL)</label>
                      <input 
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                        placeholder="ex-secador-philco"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Descrição Detalhada</label>
                   <textarea 
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none resize-none"
                      placeholder="Descreva as características do prêmio..."
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Preço (R$)</label>
                      <input 
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Total de Números</label>
                      <input 
                        type="number"
                        required
                        value={formData.total_numbers}
                        onChange={(e) => setFormData({...formData, total_numbers: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Data do Sorteio</label>
                      <input 
                        type="date"
                        value={formData.draw_date}
                        onChange={(e) => setFormData({...formData, draw_date: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Imagem do Prêmio</label>
                   <div className="flex flex-col gap-4">
                      {formData.image_url && !imageFile && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-gray-100">
                          <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, image_url: ''})}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                      
                      {imageFile && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-[#8E5A3C]">
                          <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setImageFile(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}

                      {!imageFile && !formData.image_url && (
                        <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#8E5A3C] transition-colors bg-gray-50">
                          <ImageIcon className="text-gray-400 mb-2" size={32} />
                          <span className="text-sm font-bold text-gray-500">Clique para selecionar imagem</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
                          />
                        </label>
                      )}

                      {(imageFile || formData.image_url) && (
                         <label className="text-xs font-bold text-[#8E5A3C] cursor-pointer hover:underline flex items-center gap-1">
                            Trocar imagem
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
                            />
                         </label>
                      )}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Ou URL da Imagem Externa</label>
                   <input 
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({...formData, image_url: e.target.value});
                        setImageFile(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none"
                      placeholder="https://... ou /images/..."
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-[#4A2B1D] uppercase ml-1">Status</label>
                   <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#8E5A3C] outline-none bg-white font-bold"
                   >
                      <option value="OPEN">Aberta</option>
                      <option value="CLOSED">Encerrada</option>
                      <option value="DRAWN">Sorteada</option>
                   </select>
                </div>

                <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading || uploading}
                      className="w-full bg-[#4A2B1D] text-white font-black py-4 rounded-2xl hover:bg-[#3A2217] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {uploading ? 'Fazendo upload da imagem...' : (loading ? 'Salvando...' : (editingRaffle ? 'Atualizar Rifa' : 'Criar Rifa'))}
                      {!loading && !uploading && <CheckCircle size={20} />}
                    </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
