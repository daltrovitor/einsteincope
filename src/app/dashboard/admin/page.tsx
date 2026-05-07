import Link from 'next/link'
import { PlusCircle, BookOpen, Upload, ArrowRight } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Painel do Administrador</h1>
                <p className="text-slate-500">Gerencie tarefas, provas e arquivos para os alunos.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Link href="/dashboard/admin/tasks/new" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <PlusCircle className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Criar Tarefa</h3>
                    <p className="mt-2 text-sm text-slate-500">Adicione novas tarefas para os alunos.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Criar tarefa <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>

                <Link href="/dashboard/admin/exams/new" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <BookOpen className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Criar Prova</h3>
                    <p className="mt-2 text-sm text-slate-500">Agende novas provas e conteúdos.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Criar prova <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>

                <Link href="/dashboard/admin/files" className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-primary-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-blue-50 p-2 text-primary-600 group-hover:bg-primary-50">
                            <Upload className="h-6 w-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Gerenciar Arquivos</h3>
                    <p className="mt-2 text-sm text-slate-500">Faça upload de materiais de estudo.</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Ver arquivos <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
