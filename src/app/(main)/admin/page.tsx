import { getProfiles, checkIsAdmin } from '@/actions/admin'
import { redirect } from 'next/navigation'
import { AdminPanelClient } from '@/features/admin/components/AdminPanelClient'

export default async function AdminPage() {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
        redirect('/academia')
    }

    const profiles = await getProfiles()

    return (
        <div className="min-h-screen p-4 pt-8 pb-32 max-w-5xl mx-auto animate-fade-in relative z-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">PANEL DE CONTROL</span>
                </h1>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Gestión de Usuarios Activos y Pendientes</p>
            </div>

            <AdminPanelClient initialProfiles={profiles} />
        </div>
    )
}
