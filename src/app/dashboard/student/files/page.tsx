import { FileText, Download, Search, HardDrive } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { FileAttachment } from '@/types'

export default async function StudentFiles() {
    const supabase = await createClient()

    const { data: files } = await supabase
        .from('file_attachments')
        .select('*')
        .order('uploaded_at', { ascending: false })

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Arquivos e Materiais</h1>
                    <p className="text-slate-500 text-sm">Acesse materiais de estudo e documentos compartilhados.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar arquivos..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome do Arquivo</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tamanho</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data de Upload</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {files && files.length > 0 ? (
                                files.map((file: FileAttachment) => (
                                    <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-blue-50 text-primary-600 rounded-lg mr-3 group-hover:bg-primary-50">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{file.size || '---'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(file.uploaded_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                                            >
                                                <Download className="h-3.5 w-3.5 mr-1.5" />
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-slate-50 rounded-full mb-4">
                                                <HardDrive className="h-8 w-8 text-slate-300" />
                                            </div>
                                            <p className="text-slate-500 font-medium">Nenhum arquivo encontrado.</p>
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
                {files && files.length > 0 ? (
                    files.map((file: FileAttachment) => (
                        <div key={file.id} className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-200 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-primary-600 rounded-xl">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-bold text-slate-900 truncate">{file.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-1.5 py-0.5 rounded">
                                            {file.size || 'N/A'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">
                                            {new Date(file.uploaded_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 active:scale-95 transition-transform"
                            >
                                <Download className="h-4 w-4" />
                                Baixar Arquivo
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 text-center">
                        <div className="p-4 bg-slate-50 rounded-full mb-4 inline-block">
                            <HardDrive className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-bold">Nenhum arquivo encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
