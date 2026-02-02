'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, BookOpen, Clock, FileText, Upload, PlusCircle, LogOut } from 'lucide-react'
import { Role } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const studentLinks = [
    { name: 'Visão Geral', href: '/dashboard/student', icon: Home },
    { name: 'Calendário', href: '/dashboard/student/calendar', icon: Calendar },
    { name: 'Provas', href: '/dashboard/student/exams', icon: BookOpen },
    { name: 'Horário', href: '/dashboard/student/schedule', icon: Clock },
    { name: 'Arquivos', href: '/dashboard/student/files', icon: FileText },
]

const adminLinks = [
    { name: 'Painel Admin', href: '/dashboard/admin', icon: Home },
    { name: 'Nova Tarefa', href: '/dashboard/admin/tasks/new', icon: PlusCircle },
    { name: 'Nova Prova', href: '/dashboard/admin/exams/new', icon: BookOpen },
    { name: 'Upload Arquivos', href: '/dashboard/admin/files', icon: Upload },
]

export function Sidebar({ role, name, onLinkClick }: { role: Role, name?: string, onLinkClick?: () => void }) {
    const pathname = usePathname()
    const router = useRouter()
    const links = role === 'admin' ? adminLinks : studentLinks
    const initial = name?.charAt(0).toUpperCase() || '?'

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        if (onLinkClick) onLinkClick()
        router.push('/login')
    }

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 w-full lg:w-64 shadow-sm">
            <div className=" border-b border-slate-100 flex items-center gap-3">
                <img src="/einstein.png" alt="Logo" className="h-20 w-20 shrink-0" />
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none uppercase">Einstein</h2>
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Cope</span>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => {
                    const isActive = link.href.endsWith('/admin') || link.href.endsWith('/student')
                        ? pathname === link.href
                        : pathname === link.href || pathname.startsWith(link.href + '/')
                    const Icon = link.icon
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onLinkClick}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-slate-100 space-y-4">
                {name && (
                    <div className="flex items-center px-4 py-3 gap-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm shrink-0">
                            {initial}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 truncate">{name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">Logado como {role === 'admin' ? 'Admin' : 'Aluno'}</span>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sair
                </button>
            </div>
        </div>
    )
}
