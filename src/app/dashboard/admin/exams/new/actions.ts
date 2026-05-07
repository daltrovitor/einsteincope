'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createExam(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const exam_date = formData.get('exam_date') as string

    if (!title || !exam_date) {
        return { error: 'Título e data da prova são obrigatórios.' }
    }

    const { error } = await supabase
        .from('exams')
        .insert({ title, content, exam_date })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard/admin')
}
