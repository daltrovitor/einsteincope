import { createClient } from '@/utils/supabase/server'

export default async function DebugPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return <div className="p-8">Não logado</div>

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="p-8 space-y-4 font-mono text-sm">
            <h1 className="text-xl font-bold">Debug de Login</h1>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p><strong>Auth User ID:</strong> {user.id}</p>
                <p><strong>Auth Email:</strong> {user.email}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg">
                <p><strong>Profile Found:</strong> {profile ? 'SIM' : 'NÃO'}</p>
                {error && <p className="text-red-500"><strong>Erro Profile:</strong> {error.message}</p>}
                {profile && (
                    <pre className="mt-2">{JSON.stringify(profile, null, 2)}</pre>
                )}
            </div>
            <p className="text-xs text-slate-500 italic">Acesse /dashboard/debug para ver isso.</p>
        </div>
    )
}
