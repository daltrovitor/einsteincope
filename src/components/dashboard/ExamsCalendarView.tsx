'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { Exam } from '@/types'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay()
}

const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

export function ExamsCalendarView({ exams }: { exams: Exam[] }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

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
        const date = new Date(year, month, day)
        // Highlighting that exams are usually on Fridays
        setSelectedDate(date)
    }

    const selectedDateStr = selectedDate ? formatDate(selectedDate) : ''
    const dayExams = exams.filter(e => e.exam_date === selectedDateStr)

    return (
        <div className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
            {/* Calendar Grid */}
            <div className="flex-1 p-3 sm:p-6 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900 capitalize">
                        {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex items-center gap-1">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"><ChevronRight className="h-5 w-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200 flex-1 auto-rows-fr">
                    {daysOfWeek.map(day => (
                        <div key={day} className="bg-slate-50 py-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white min-h-[60px] sm:min-h-[80px]" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const dateObj = new Date(year, month, day)
                        const dateStr = formatDate(dateObj)
                        const isFriday = dateObj.getDay() === 5
                        const hasExam = exams.some(e => e.exam_date === dateStr)
                        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year

                        return (
                            <div
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`bg-white min-h-[60px] sm:min-h-[80px] p-2 cursor-pointer transition-all relative hover:bg-slate-50 flex flex-col 
                                    ${isSelected ? 'bg-red-50/50 ring-inset ring-2 ring-red-500 z-10' : ''}
                                    ${isFriday ? 'bg-red-50/20' : ''}
                                `}
                            >
                                <div className={`text-xs sm:text-sm font-bold mb-1 ${isSelected ? 'text-red-700' : isFriday ? 'text-red-600' : 'text-slate-700'}`}>
                                    {day}
                                </div>
                                <div className="space-y-1 flex-1">
                                    {hasExam && (
                                        <>
                                            <div className="hidden sm:flex items-center text-[10px] text-red-600 bg-red-100 px-1.5 py-0.5 rounded-md font-bold truncate">
                                                <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                                                PROVA
                                            </div>
                                            <div className="flex sm:hidden">
                                                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse shadow-sm shadow-red-500/50" />
                                            </div>
                                        </>
                                    )}
                                    {isFriday && !hasExam && (
                                        <div className="text-[8px] text-red-300 font-bold uppercase tracking-tighter hidden sm:block">
                                            Dia de Prova
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="w-full lg:w-80 bg-slate-50 p-4 sm:p-6 overflow-y-auto">
                {selectedDate ? (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 border-b-2 pb-2 border-red-200 capitalize">
                                {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </h3>
                        </div>

                        {dayExams.length > 0 ? (
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-red-600 flex items-center uppercase tracking-widest">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Conteúdo da Provas
                                </h4>
                                {dayExams.map(exam => (
                                    <div key={exam.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500 animate-in slide-in-from-right duration-300">
                                        <p className="font-bold text-slate-900 text-lg mb-2">{exam.title}</p>
                                        <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
                                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                                {exam.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <AlertCircle className="h-12 w-12 text-slate-200 mb-4" />
                                <p className="text-slate-500 font-bold">Nenhuma prova agendada</p>
                                <p className="text-slate-400 text-xs mt-1">
                                    {selectedDate.getDay() === 5
                                        ? 'Fique atento aos comunicados da coordenação.'
                                        : 'Provas são realizadas geralmente às sextas-feiras.'}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-sm px-4 text-center font-medium italic">
                        Selecione um dia para ver os detalhes das provas
                    </div>
                )}
            </div>
        </div>
    )
}
