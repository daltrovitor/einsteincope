'use client'

import { useState } from 'react'
import { FileText, Download, Search, HardDrive } from 'lucide-react'
import { FileAttachment } from '@/types'

export function StudentFilesClient({ initialFiles }: { initialFiles: FileAttachment[] }) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredFiles = initialFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="px-1">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Arquivos e Materiais</h1>
                    <p className="text-slate-500 text-sm md:text-base">Acesse materiais de estudo e documentos compartilhados.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar materiais..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-3xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Nome do Arquivo</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Tamanho</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Postado em</th>
                                <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file: FileAttachment) => (
                                    <tr key={file.id} className="hover:bg-primary-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center">
                                                <div className="p-2.5 bg-primary-100 text-primary-700 rounded-xl mr-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-primary-900 transition-colors">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                {file.size || '---'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-slate-400">
                                            {new Date(file.uploaded_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-md shadow-primary-500/20 active:scale-95 transition-all"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Baixar
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="p-5 bg-slate-50 rounded-full mb-4">
                                                <HardDrive className="h-10 w-10 text-slate-200" />
                                            </div>
                                            <p className="text-slate-500 font-bold">Nenhum arquivo encontrado.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {filteredFiles.length > 0 ? (
                    filteredFiles.map((file: FileAttachment) => (
                        <div key={file.id} className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 space-y-5 active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 bg-primary-100 text-primary-700 rounded-2xl">
                                    <FileText className="h-7 w-7" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-bold text-slate-900 truncate leading-tight">{file.name}</h3>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-tighter bg-primary-50 px-2 py-0.5 rounded-md">
                                            {file.size || 'N/A'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            {new Date(file.uploaded_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 py-4 bg-primary-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-primary-500/25 active:scale-[0.95] transition-all uppercase tracking-widest"
                            >
                                <Download className="h-5 w-5" />
                                Baixar Agora
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-12 rounded-3xl shadow-lg ring-1 ring-slate-200 text-center">
                        <div className="p-5 bg-slate-50 rounded-full mb-4 inline-block">
                            <HardDrive className="h-10 w-10 text-slate-200" />
                        </div>
                        <p className="text-slate-500 font-bold">Nenhum arquivo encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
