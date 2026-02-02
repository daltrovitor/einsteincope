import { createClient } from '@/utils/supabase/server'
import { CalendarView } from '@/components/dashboard/CalendarView'

export default async function CalendarPage() {
    const supabase = await createClient()

    const { data: tasks } = await supabase.from('tasks').select('*')

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6 px-4 sm:px-0">
                <h1 className="text-2xl font-bold text-slate-900">Calendário de Tarefas</h1>
                <p className="text-slate-500">Gerencie suas entregas e deveres de casa.</p>
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
                <CalendarView tasks={tasks || []} />
            </div>
        </div>
    )
}
