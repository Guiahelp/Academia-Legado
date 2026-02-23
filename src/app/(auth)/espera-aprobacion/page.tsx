'use client';

import { Shield, Clock, MessageSquare, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

export default function EsperaAprobacionPage() {
    const { profile, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />

            <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 text-center space-y-8">
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/20 flex items-center justify-center">
                        <Shield className="text-primary w-12 h-12" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">
                        Cuenta en <span className="text-primary">Revisión</span>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest leading-relaxed">
                        Hola <span className="text-white font-bold">{profile?.nombre || 'Emprendedor'}</span>, tu solicitud ha sido enviada a la mesa de control de Tribu Legado.
                    </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Clock className="text-primary w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Estado</p>
                            <p className="text-white font-bold uppercase tracking-tight">Pendiente de Aprobación</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                            <MessageSquare className="text-secondary w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Siguiente Paso</p>
                            <p className="text-white font-bold uppercase tracking-tight">Contacta a tu mentor</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        asChild
                        className="w-full h-14 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest rounded-xl transition-all shadow-neon-primary"
                    >
                        <Link href="/">
                            <ArrowLeft className="mr-2" size={18} /> Volver al Inicio
                        </Link>
                    </Button>

                    <button
                        onClick={() => signOut()}
                        className="text-xs text-muted-foreground hover:text-white uppercase tracking-widest font-bold flex items-center justify-center gap-2 mx-auto pt-4 transition-colors"
                    >
                        <LogOut size={14} /> Cerrar Sesión
                    </button>
                </div>
            </div>

            <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                Sistema de Seguridad de Academia Legado • V1.0
            </p>
        </div>
    );
}
