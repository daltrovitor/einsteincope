'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { Task, Exam } from '@/types'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay()
}

// Convert Date to YYYY-MM-DD in local time
const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

interface CalendarViewProps {
    tasks: Task[]
}

export function CalendarView({ tasks = [] }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [viewMode, setViewMode] = useState<'due' | 'assigned'>('due')

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
        setSelectedDate(null)
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
        setSelectedDate(null)
    }

    const handleDateClick = (day: number) => {
        setSelectedDate(new Date(year, month, day))
    }

    const selectedDateStr = selectedDate ? formatDate(selectedDate) : ''
    const dayTasks = tasks.filter(t =>
        viewMode === 'due' ? t.due_date === selectedDateStr : t.assigned_date === selectedDateStr
    )

    return (
        <div className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
            <div className="flex-1 p-3 sm:p-6 flex flex-col min-h-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-bold text-slate-900 capitalize">
                        {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('due')}
                                className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-md transition-all ${viewMode === 'due' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Entregas
                            </button>
                            <button
                                onClick={() => setViewMode('assigned')}
                                className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-md transition-all ${viewMode === 'assigned' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Passadas
                            </button>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"><ChevronRight className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200 flex-1 auto-rows-fr">
                    {daysOfWeek.map(day => (
                        <div key={day} className="bg-slate-50 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white min-h-[80px]" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const dateStr = formatDate(new Date(year, month, day))
                        const hasTask = tasks.some(t =>
                            viewMode === 'due' ? t.due_date === dateStr : t.assigned_date === dateStr
                        )
                        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
                        const isFriday = new Date(year, month, day).getDay() === 5

                        return (
                            <div
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`bg-white min-h-[60px] sm:min-h-[80px] p-1.5 sm:p-2 cursor-pointer transition-colors relative hover:bg-slate-50 flex flex-col 
                    ${isSelected ? 'bg-blue-50/50 ring-inset ring-2 ring-primary-500 z-10' : ''}
                    ${isFriday ? 'bg-slate-50/30' : ''}
                `}
                            >
                                <div className={`text-xs sm:text-sm font-bold mb-1 ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}>{day}</div>
                                <div className="space-y-1 flex-1">
                                    {hasTask && (
                                        <div className="flex items-center text-[8px] sm:text-xs text-blue-600 bg-blue-50/80 px-1 sm:px-1.5 py-0.5 rounded truncate">
                                            <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3 sm:mr-1 flex-shrink-0" />
                                            <span className="truncate hidden sm:inline">Tarefa</span>
                                        </div>
                                    )}
                                    <div className="flex gap-0.5 sm:hidden">
                                        {hasTask && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="w-full lg:w-80 bg-slate-50 p-4 sm:p-6 overflow-y-auto">
                {selectedDate ? (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-200 capitalize">
                                {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </h3>
                        </div>

                        {/* Exam list removed as requested */}

                        <div>
                            <h4 className="text-sm font-semibold text-primary-600 mb-3 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {viewMode === 'due' ? 'Tarefas para entregar' : 'Tarefas passadas hoje'}
                            </h4>
                            {dayTasks.length > 0 ? (
                                <div className="space-y-3">
                                    {dayTasks.map(task => (
                                        <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm border border-primary-100 flex items-start group transition-shadow hover:shadow-md">
                                            <input type="checkbox" className="mt-1 rounded text-primary-600 focus:ring-primary-500 border-slate-300" />
                                            <div className="ml-3">
                                                <label className="font-medium text-slate-900 text-sm block">{task.title}</label>
                                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{task.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 italic">Nenhuma tarefa para este dia.</p>
                            )}
                        </div>

                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-sm px-4 text-center">
                        Selecione um dia no calendário para ver os detalhes
                    </div>
                )}
            </div>
        </div>
    )
}
