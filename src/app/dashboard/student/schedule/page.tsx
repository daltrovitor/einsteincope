import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SchedulePage() {
    const timeSlots = [
        '07:00 - 07:50',
        '07:50 - 08:40',
        '09:00 - 09:50',
        '09:50 - 10:40',
        '11:00 - 11:45',
        '11:45 - 12:30',
        '12:30 - 13:15'
    ]

    const days = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO']

    const scheduleData: Record<string, string[]> = {
        'SEGUNDA': ['TURCO (BIO)', 'LAFAYETTE (MAT)', 'GIOVANNI (SOC)', 'REGIS (FÍS)', 'VICTOR TEIXEIRA (GEO)', 'JHONNY (MAT)', 'VICTOR TEIXEIRA (GEO)'],
        'TERÇA': ['CONSUELO (ARTE)', 'GILDÃO (QUÍ)', 'DOO (BIO)', 'JEFTÉ (HIS)', 'ADRIANO DINIZ (MAT)', 'MALAVOLTA (LIT)', 'VICTOR FERNANDES (FÍS)'],
        'QUARTA': ['REGIS (FÍS)', 'CRISTIANO (PV)', 'VICTOR FERNANDES (FÍS)', 'WESLEY (GRA)', 'ELÔ (QUÍ)', 'DOO (BIO)', 'WESLEY (GRA)'],
        'QUINTA': ['MALAVOLTA (LIT)', 'THIAGO BELO (BIO)', 'LAB (F/Q)', 'RAFAELLA (RED)', 'THIAGO BELO (BIO)', 'MAYARA (FILO)', 'JHONNY (MAT)'],
        'SEXTA': ['RAFAELLA (RED)', 'GILDÃO (QUÍ)', 'PLÍNIO (ING)', 'LAFAYETTE (MAT)', 'HUGO (TEX)', 'JEFTÉ (HIS)', 'ELÔ (QUÍ)'],
        'SÁBADO': ['----------', '----------', '----------', '----------', '----------', '----------', '----------']
    }

    return (
        <div className="min-h-full bg-slate-50 pb-12 animate-in fade-in duration-700">
            {/* Header / Brand Area */}
            <div className="max-w-[1200px] mx-auto mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/dashboard/student" className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-primary-600 shadow-sm border border-transparent hover:border-slate-200">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Horário Escolar</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-200 relative">
                    {/* Top Branding Section - Matches Image */}
                    <div className="bg-[#1e3a5f] p-4 sm:p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#d97706]"></div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-widest mb-1 sm:mb-2 opacity-90">COPE</h1>
                        <div className="inline-block bg-[#d97706] px-4 sm:px-8 py-1 sm:py-2 rounded-full shadow-lg">
                            <span className="text-white font-bold text-sm sm:text-2xl tracking-wider uppercase">
                                1ª SÉRIE • EINSTEIN
                            </span>
                        </div>
                    </div>

                    {/* Mobile Scroll Hint */}
                    <div className="md:hidden bg-slate-100/80 px-4 py-2 text-[10px] font-bold text-slate-500 flex items-center justify-center gap-2 border-b border-slate-200">
                        <span>Deslize para ver o horário completo</span>
                        <ArrowRight className="h-3 w-3 animate-pulse" />
                    </div>

                    {/* Schedule Table */}
                    <div className="overflow-x-auto scrollbar-hide md:scrollbar-default">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1e3a5f] text-white">
                                    <th className="px-4 py-4 text-sm font-bold border border-slate-700/50 bg-[#2d4a6e]">HORAS</th>
                                    {days.map(day => (
                                        <th key={day} className="px-4 py-4 text-sm font-bold border border-slate-700/50 min-w-[140px]">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((slot, rowIndex) => (
                                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-100/50'}>
                                        <td className="px-4 py-5 text-center text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 whitespace-nowrap">
                                            {slot}
                                        </td>
                                        {days.map(day => (
                                            <td
                                                key={`${day}-${rowIndex}`}
                                                className={`px-3 py-5 text-center text-[11px] md:text-xs font-bold border border-slate-200 transition-colors hover:bg-primary-50/30
                                                    ${scheduleData[day][rowIndex] === '----------' ? 'text-slate-300' : 'text-slate-700'}
                                                    ${rowIndex % 2 !== 0 && scheduleData[day][rowIndex] !== '----------' ? 'bg-slate-200/40' : ''}
                                                `}
                                            >
                                                {scheduleData[day][rowIndex]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-slate-400 text-[10px] sm:text-xs px-2">
                    <p>* Horário sujeito a alterações pela coordenação.</p>
                    <p>Einstein Cope • 2026</p>
                </div>
            </div>
        </div>
    )
}
