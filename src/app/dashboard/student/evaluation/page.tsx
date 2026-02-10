import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, FileText, Info, GraduationCap, Calculator, HelpCircle } from 'lucide-react'

export default function EvaluationSystem() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-10">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/dashboard/student" className="group flex items-center justify-center p-2 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 transition-all">
                    <ArrowLeft className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
                </Link>
                <div>
                     <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Sistema de Avaliação</h1>
                     <p className="text-slate-500 text-sm md:text-base">Entenda como funcionam as notas e provas.</p>
                </div>
            </div>

            {/* Composição da Nota e Cálculo */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Composição */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg text-primary-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Composição da Nota</h2>
                    </div>
                     <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-semibold text-slate-700">Provas Discursivas (PD)</span>
                                <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border text-sm">10,0</span>
                            </div>
                            <div className="pl-2 space-y-1">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                    PD1 - 1ª etapa
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                    PD2 - 2ª etapa
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-semibold text-slate-700">Prova Objetiva (PO)</span>
                                <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border text-sm">1.5</span>
                            </div>
                             <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-semibold text-slate-700">Simulado (S)</span>
                                <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border text-sm">1,5</span>
                            </div>
                        </div>
                     </div>
                     
                     <div className="mt-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold text-sm">
                            <Info className="h-4 w-4" /> Observações Importantes
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-blue-600">
                            <li className="flex gap-2">
                                <span className="font-bold bg-blue-100 px-1.5 rounded text-blue-800 h-fit">L</span>
                                <span><strong>Laboratório:</strong> 10% da nota de Química/Física</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-blue-100 px-1.5 rounded text-blue-800 h-fit">V</span>
                                <span><strong>Verificação de Leitura:</strong> 10% da nota de Literatura</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Cálculo */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                <Calculator className="h-6 w-6" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Cálculo da Média</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="text-center w-full">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Nota Parcial (P)</p>
                                <div className="inline-block w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 font-mono text-base shadow-sm">
                                    P = (PD1 + PD2 + PO) / 3
                                </div>
                            </div>
                            <div className="text-center w-full">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">Nota Final (N)</p>
                                <div className="inline-block w-full bg-slate-900 text-white rounded-xl px-4 py-3 font-mono text-lg shadow-lg relative overflow-hidden">
                                    <div className="relative z-10">N = P + S</div>
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-10 h-10 bg-white/10 rounded-full blur-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-6 text-xs text-center text-slate-400">
                        A nota final é a soma da média parcial com a pontuação extra do simulado.
                    </p>
                </div>
            </div>

            {/* Grupos de Provas Discursivas */}
            <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Grupos de Provas Discursivas</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                     {/* Grupo 1 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl font-black text-slate-900">1</span>
                        </div>
                        <div className="relative">
                            <div className="mb-4 pb-3 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900">Grupo 1</h3>
                                <p className="text-xs font-medium text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-full mt-1">22 questões</p>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-700 mb-6">
                                {['Biologia', 'Química', 'Inglês', 'Redação', 'Espanhol'].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs text-slate-600 border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duração</span>
                                    <span className="font-bold text-slate-800">5h30min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Início</span>
                                    <span className="font-mono">14h30</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Término</span>
                                    <span className="font-mono">20h00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                      {/* Grupo 2 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl font-black text-slate-900">2</span>
                        </div>
                         <div className="relative">
                            <div className="mb-4 pb-3 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900">Grupo 2</h3>
                                <p className="text-xs font-medium text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-full mt-1">23 questões</p>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-700 mb-6">
                                {['Física', 'Língua Portuguesa', 'Literatura', 'Interpretação Textual', 'Geografia'].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs text-slate-600 border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duração</span>
                                    <span className="font-bold text-slate-800">5h00min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Início</span>
                                    <span className="font-mono">14h30</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Término</span>
                                    <span className="font-mono">19h30</span>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Grupo 3 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl font-black text-slate-900">3</span>
                        </div>
                        <div className="relative">
                            <div className="mb-4 pb-3 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900">Grupo 3</h3>
                                <p className="text-xs font-medium text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-full mt-1">24 questões</p>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-700 mb-6">
                                {['Matemática', 'História', 'Artes', 'Filosofia', 'Sociologia'].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs text-slate-600 border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duração</span>
                                    <span className="font-bold text-slate-800">5h00min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Início</span>
                                    <span className="font-mono">14h30</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Término</span>
                                    <span className="font-mono">19h30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Distribuição de Pontos e Prova Objetiva */}
             <div className="grid gap-6 md:grid-cols-2 mt-8">
                 {/* Distribuição */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Pontuação por Aulas</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="relative pl-6 border-l-2 border-slate-200">
                            <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                            <p className="text-sm font-bold text-slate-800 mb-3">Professores com 2 aulas</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Questão 1</span>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">a)</span> <span className="font-mono font-medium">1,0</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">b)</span> <span className="font-mono font-medium">1,5</span></div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Questão 2</span>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">a)</span> <span className="font-mono font-medium">1,0</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">b)</span> <span className="font-mono font-medium">1,5</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-6 border-l-2 border-slate-200">
                             <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                            <p className="text-sm font-bold text-slate-800 mb-3">Professores com 1 aula</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Questão 1</span>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">a)</span> <span className="font-mono font-medium">1,5</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">b)</span> <span className="font-mono font-medium">2,0</span></div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Questão 2</span>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">a)</span> <span className="font-mono font-medium">1,5</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">b)</span> <span className="font-mono font-medium">2,0</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Objetiva */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <HelpCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Prova Objetiva</h3>
                    </div>

                     <div className="space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                             <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-bold text-slate-900">1º Dia</p>
                             </div>
                             <div className="space-y-3">
                                <div className="bg-white p-2 rounded border border-slate-100">
                                    <div className="flex justify-between text-sm font-medium text-slate-800">
                                        <span>Linguagens e Códigos</span>
                                        <span className="text-slate-400">45 questões</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Inglês/Espanhol, Português, Literatura, Interpretação, Arte</p>
                                </div>
                                <div className="bg-white p-2 rounded border border-slate-100">
                                    <div className="flex justify-between text-sm font-medium text-slate-800">
                                        <span>Ciências Humanas</span>
                                        <span className="text-slate-400">45 questões</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex flex-col items-center text-center">
                             <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-bold mb-2 uppercase tracking-wide">Simulado</span>
                             <h4 className="text-2xl font-black text-amber-900 mb-1">90 Questões</h4>
                             <p className="text-sm text-amber-800 font-medium">Valendo até 1,5 pontos extras</p>
                        </div>
                     </div>
                </div>
             </div>
        </div>
    )
}
