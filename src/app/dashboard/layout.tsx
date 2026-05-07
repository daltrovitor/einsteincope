import { createClient } from '@/utils/supabase/server'
import { MobileWrapper } from '@/components/dashboard/MobileWrapper'
import { redirect } from 'next/navigation'
import { Role } from '@/types'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role, name')
        .eq('id', user.id)
        .single()

    const role: Role = profile?.role || 'user'
    const name: string = profile?.name || user.email?.split('@')[0] || 'Usuário'

    return (
        <MobileWrapper role={role} name={name}>
            {children}
        </MobileWrapper>
    )
}
