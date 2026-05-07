'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    console.log('--- LOGIN DEBUG ---')
    console.log('User ID:', data.user.id)
    console.log('User Email:', data.user.email)

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

    if (profileError) {
        console.error('Profile Error:', profileError.message)
    }

    console.log('Profile found:', profile)
    const role = profile?.role || 'user'
    console.log('Final Role:', role)
    console.log('-------------------')

    if (role === 'admin') {
        redirect('/dashboard/admin')
    } else {
        redirect('/dashboard/student')
    }
}
