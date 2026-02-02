import { createClient } from '@/utils/supabase/server'
import { AdminFilesClient } from './AdminFilesClient'

export default async function AdminFiles() {
    const supabase = await createClient()

    const { data: files } = await supabase
        .from('file_attachments')
        .select('*')
        .order('uploaded_at', { ascending: false })

    return <AdminFilesClient initialFiles={files || []} />
}
