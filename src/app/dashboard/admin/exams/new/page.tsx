'use client'

import { useActionState } from 'react'
import { createExam } from './actions'
import { Loader2 } from 'lucide-react'

const initialState = {
    error: '',
}

export default function CreateExamPage() {
    const [state, formAction, isPending] = useActionState(createExam, initialState)

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Nova Prova</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <form action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700">Título</label>
                        <input type="text" name="title" id="title" required className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 border outline-none transition-all" />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-slate-700">Conteúdo da Prova</label>
                        <textarea name="content" id="content" rows={4} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 border outline-none transition-all"></textarea>
                    </div>

                    <div>
                        <label htmlFor="exam_date" className="block text-sm font-medium text-slate-700">Data da Prova</label>
                        <input type="date" name="exam_date" id="exam_date" required className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 px-3 border outline-none transition-all" />
                    </div>

                    {state?.error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                            {state.error}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : 'Criar Prova'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
