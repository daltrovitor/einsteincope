import Link from 'next/link'
import { Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function StudentDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single()

    const name = profile?.name || user.email?.split('@')[0] || 'Aluno'

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
            <div className="px-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Olá, {name}!</h1>
                <p className="text-slate-500 text-sm md:text-base">Aqui está o resumo das suas atividades escolares.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Link href="/dashboard/student/calendar" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <Calendar className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Calendário</h3>
                    <p className="mt-2 text-sm text-slate-500">Veja suas tarefas e entregas pendentes.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Ver calendário <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>

                <Link href="/dashboard/student/exams" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <BookOpen className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Provas</h3>
                    <p className="mt-2 text-sm text-slate-500">Confira as datas das próximas avaliações.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Ver provas <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>

                <Link href="/dashboard/student/schedule" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <Clock className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Horário</h3>
                    <p className="mt-2 text-sm text-slate-500">Consulte sua grade de aulas semanal.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Ver horários <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
