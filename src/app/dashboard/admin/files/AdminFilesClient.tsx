'use client'

import { useState } from 'react'
import { FileText, Download, Search, Upload, Trash2, HardDrive, Loader2, X } from 'lucide-react'
import { FileAttachment } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function AdminFilesClient({ initialFiles }: { initialFiles: FileAttachment[] }) {
    const [files, setFiles] = useState(initialFiles)
    const [isUploading, setIsUploading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let file: File | null = null

        if ('files' in e && e.files) {
            file = e.files[0]
        } else if ('target' in e && (e.target as HTMLInputElement).files) {
            file = (e.target as HTMLInputElement).files?.[0] || null
        }

        if (!file) return

        setIsUploading(true)
        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `materials/${fileName}`

            const { error: uploadError, data } = await supabase.storage
                .from('files')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('files')
                .getPublicUrl(filePath)

            // 3. Save to database
            const { error: dbError, data: newFileData } = await supabase
                .from('file_attachments')
                .insert({
                    name: file.name,
                    url: publicUrl,
                    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                })
                .select()
                .single()

            if (dbError) throw dbError

            setFiles([newFileData, ...files])
            router.refresh()
        } catch (error: any) {
            alert('Erro no upload: ' + error.message)
        } finally {
            setIsUploading(false)
            setDragActive(false)
        }
    }

    const handleDelete = async (file: FileAttachment) => {
        if (!confirm(`Tem certeza que deseja excluir o arquivo "${file.name}"?`)) return

        try {
            // Extract filename from URL (this is a bit hacky, better to store the path)
            const urlParts = file.url.split('/')
            const fileName = urlParts[urlParts.length - 1]
            const filePath = `materials/${fileName}`

            // 1. Delete from storage
            await supabase.storage.from('files').remove([filePath])

            // 2. Delete from database
            const { error } = await supabase
                .from('file_attachments')
                .delete()
                .eq('id', file.id)

            if (error) throw error

            setFiles(files.filter(f => f.id !== file.id))
            router.refresh()
        } catch (error: any) {
            alert('Erro ao excluir: ' + error.message)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer as any)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gerenciar Arquivos</h1>
                    <p className="text-slate-500 text-sm">Faça upload e gerencie os materiais para os alunos.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar arquivos por nome..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 border-2 border-dashed transition-all duration-300 group
                    ${dragActive ? 'border-primary-500 bg-primary-50/50 scale-[1.01]' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50/50'}
                `}
            >
                {isUploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl animate-in fade-in duration-300">
                        <Loader2 className="h-10 w-10 text-primary-600 animate-spin mb-4" />
                        <p className="text-primary-900 font-bold animate-pulse">Enviando arquivo...</p>
                    </div>
                )}

                <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full mb-4 transition-all duration-300 group-hover:scale-110
                        ${dragActive ? 'bg-primary-600 text-white animate-bounce' : 'bg-primary-50 text-primary-600'}
                    `}>
                        <Upload className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {dragActive ? 'Solte para enviar!' : 'Faça upload de materiais'}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-sm">
                        Arraste e solte arquivos aqui, ou clique para selecionar.
                    </p>

                    <label className="mt-4 px-8 py-3 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/25 transition-all cursor-pointer active:scale-95">
                        Selecionar Arquivo
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Limite: 50MB per file</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Materiais Postados</h3>
                    <span className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded-full text-slate-500">
                        {filteredFiles.length} de {files.length}
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Arquivo</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tamanho</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Postado em</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file) => (
                                    <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl mr-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-slate-700 truncate max-w-[250px]">{file.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Documento</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                                                {file.size || '---'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                            {new Date(file.uploaded_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                                                    title="Visualizar/Download"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(file)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Excluir Permanentemente"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-slate-50 rounded-full mb-4">
                                                <HardDrive className="h-10 w-10 text-slate-200" />
                                            </div>
                                            <p className="text-slate-900 font-bold">Nenhum arquivo encontrado</p>
                                            <p className="text-slate-400 text-xs mt-1">Tente buscar por outro nome ou faça um novo upload.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
