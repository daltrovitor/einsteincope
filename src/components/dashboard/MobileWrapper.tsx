'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Menu, X } from 'lucide-react'
import { Role } from '@/types'

export function MobileWrapper({ children, role, name }: { children: React.ReactNode, role: Role, name: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const initial = name.charAt(0).toUpperCase()

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full">
                <Sidebar role={role} name={name} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl'}`}>
                <div className="h-full flex flex-col">
                    <div className="p-4 flex justify-end lg:hidden">
                        <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <Sidebar role={role} name={name} onLinkClick={() => setIsOpen(false)} />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 shadow-sm"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex items-center gap-2">
                            <img src="/einstein.png" alt="Logo" className="h-15 w-15" />
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-900 text-sm leading-tight">{name}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Einstein Cope</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-black text-sm ring-4 ring-primary-50 shadow-lg">
                        {initial}
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
                    <div className="mx-auto max-w-6xl w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
