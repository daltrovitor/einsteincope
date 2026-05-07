'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createTask(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const assigned_date = formData.get('assigned_date') as string
    const due_date = formData.get('due_date') as string

    if (!title || !due_date) {
        return { error: 'Título e data de cobrança são obrigatórios.' }
    }

    const { error } = await supabase
        .from('tasks')
        .insert({ title, description, assigned_date, due_date })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard/admin')
}
