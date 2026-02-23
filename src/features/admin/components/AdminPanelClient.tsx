'use client'

import { useState } from 'react'
import { updateUserStatus } from '@/actions/admin'
import { Button } from '@/shared/components/ui/button'
import { Check, X, Shield, Clock, AlertTriangle } from 'lucide-react'

type Profile = {
    id: string
    email: string | null
    nombre: string | null
    estado: string
    fecha_registro: string | null
    admin: boolean | null
    whatsapp_number: string | null
}

export function AdminPanelClient({ initialProfiles }: { initialProfiles: Profile[] }) {
    const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleStatusChange = async (userId: string, newStatus: string) => {
        try {
            setLoadingId(userId)
            await updateUserStatus(userId, newStatus)
            setProfiles(profiles.map(p => p.id === userId ? { ...p, estado: newStatus } : p))
        } catch (error) {
            console.error('Error changing status', error)
            alert("Hubo un error al cambiar el estado. Asegúrate de tener permisos.")
        } finally {
            setLoadingId(null)
        }
    }

    // Ordenar para mostrar pendientes primero
    const sortedProfiles = [...profiles].sort((a, b) => {
        if (a.estado === 'pendiente' && b.estado !== 'pendiente') return -1;
        if (b.estado === 'pendiente' && a.estado !== 'pendiente') return 1;
        return new Date(b.fecha_registro || 0).getTime() - new Date(a.fecha_registro || 0).getTime();
    });

    return (
        <div className="glass-card border border-white/10 rounded-2xl overflow-hidden bg-black/40">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-bold tracking-wider text-muted-foreground">
                        <tr>
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Contacto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Fecha Reg.</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedProfiles.map((p) => (
                            <tr key={p.id} className={`transition-colors hover:bg-white/5 ${p.estado === 'pendiente' ? 'bg-primary/5' : ''}`}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {p.nombre ? p.nombre.charAt(0).toUpperCase() : p.email?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{p.nombre || 'Sin nombre'}</p>
                                            <p className="text-muted-foreground text-xs">{p.email}</p>
                                            {p.admin && <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"><Shield size={10} /> Admin</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    <p>{p.whatsapp_number || 'No proveído'}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${p.estado === 'pendiente' ? 'bg-primary/20 text-primary border border-primary/30' :
                                            p.estado === 'activo' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                        {p.estado === 'pendiente' && <Clock size={12} />}
                                        {p.estado === 'activo' && <Check size={12} />}
                                        {p.estado === 'suspendido' && <AlertTriangle size={12} />}
                                        {p.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">
                                    {p.fecha_registro ? new Date(p.fecha_registro).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {loadingId === p.id ? (
                                        <div className="text-xs text-primary animate-pulse font-bold">Actualizando...</div>
                                    ) : (
                                        <div className="flex justify-end gap-2">
                                            {p.estado !== 'activo' && (
                                                <button
                                                    onClick={() => handleStatusChange(p.id, 'activo')}
                                                    className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors tooltip-trigger"
                                                    title="Aprobar Usuario"
                                                >
                                                    <Check size={16} />
                                                </button>
                                            )}
                                            {p.estado !== 'pendiente' && (
                                                <button
                                                    onClick={() => handleStatusChange(p.id, 'pendiente')}
                                                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors tooltip-trigger"
                                                    title="Regresar a Pendiente"
                                                >
                                                    <Clock size={16} />
                                                </button>
                                            )}
                                            {p.estado !== 'suspendido' && (
                                                <button
                                                    onClick={() => handleStatusChange(p.id, 'suspendido')}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors tooltip-trigger"
                                                    title="Suspender Usuario"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {profiles.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No hay usuarios registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
