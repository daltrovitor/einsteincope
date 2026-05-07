import { createClient } from '@/utils/supabase/server'
import { ExamsCalendarView } from '@/components/dashboard/ExamsCalendarView'

export default async function StudentExamsPage() {
    const supabase = await createClient()

    const { data: exams } = await supabase.from('exams').select('*')

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calendário de Provas</h1>
                <p className="text-slate-500 text-sm italic">Provas realizadas toda sexta-feira.</p>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden min-h-[600px]">
                <ExamsCalendarView exams={exams || []} />
            </div>
        </div>
    )
}
