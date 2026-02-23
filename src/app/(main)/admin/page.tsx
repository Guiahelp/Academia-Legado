import { getProfiles, checkIsAdmin } from '@/actions/admin'
import { AdminPanelClient } from '@/features/admin/components/AdminPanelClient'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    try {
        const isAdmin = await checkIsAdmin()
        if (!isAdmin) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center animate-fade-in relative z-10">
                    <ShieldAlert size={64} className="text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                    <h1 className="text-3xl font-bold mb-4 uppercase tracking-tight">Acceso Denegado</h1>
                    <p className="text-muted-foreground mb-8">No posees los credenciales de Administrador necesarios para visualizar esta zona protegida.</p>
                    <Link href="/academia" className="btn-neon-primary px-8 py-3 rounded-full font-bold">
                        VOLVER A LA ACADEMIA
                    </Link>
                </div>
            )
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
    } catch (error) {
        console.error("Error cargando panel de admin:", error)
        return (
            <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
                <p className="text-red-400">Error interno del servidor. Contacta a soporte.</p>
            </div>
        )
    }
}
