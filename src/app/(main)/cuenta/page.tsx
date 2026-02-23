"use client";

import { useState } from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { supabase } from '@/shared/lib/supabase';
import { Loader2, User, Phone, LogOut, Trophy, Shield, Clock, MessageCircle } from 'lucide-react';

export default function MiCuentaPage() {
    const { profile, isAdmin, signOut, refreshProfile } = useAuth();
    const [saving, setSaving] = useState(false);
    const [whatsapp, setWhatsapp] = useState(profile?.whatsapp_number || '');
    const [nombre, setNombre] = useState(profile?.nombre || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ whatsapp_number: whatsapp, nombre })
                .eq('id', profile?.id);

            if (error) throw error;
            await refreshProfile();
            setMessage({ type: 'success', text: 'Tu perfil ha sido actualizado.' });
        } catch (err) {
            setMessage({ type: 'error', text: 'No se pudo guardar. Intenta de nuevo.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const estadoConfig: Record<string, any> = {
        pendiente: { label: 'Pendiente de aprobación', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: Clock },
        activo: { label: 'Miembro Activo', color: 'text-accent', bg: 'bg-accent/10 border-accent/20', icon: Shield },
        suspendido: { label: 'Suspendido', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20', icon: Shield },
    };

    const estado = profile?.estado || 'pendiente';
    const estadoInfo = estadoConfig[estado] || estadoConfig.pendiente;
    const EstadoIcon = estadoInfo.icon;

    return (
        <div className="min-h-screen p-4 pb-32 max-w-2xl mx-auto animate-fade-in pt-8">
            <h1 className="text-3xl font-bold mb-2 tracking-tight uppercase">
                <span className="text-primary">Mi</span> Cuenta
            </h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-8">
                Gestiona tu perfil y configuración
            </p>

            {/* Estado */}
            <div className={`flex items-center gap-4 p-5 rounded-2xl mb-8 border ${estadoInfo.bg} animate-slide-up`}>
                <div className={`p-3 rounded-full bg-black/20 ${estadoInfo.color}`}>
                    <EstadoIcon size={24} />
                </div>
                <div className="flex-1">
                    <p className={`font-bold text-lg leading-tight uppercase tracking-wider ${estadoInfo.color}`}>{estadoInfo.label}</p>
                    {estado === 'pendiente' && (
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">El equipo revisará tu solicitud pronto.</p>
                    )}
                </div>
                {isAdmin && (
                    <span className="ml-auto px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold border border-primary/50">
                        ADMIN
                    </span>
                )}
            </div>

            {/* Perfil */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 mb-6 group hover:border-white/20 transition-colors">
                <h2 className="font-bold text-lg mb-6 flex items-center gap-3 tracking-tight uppercase">
                    <User size={20} className="text-primary" /> Perfil
                </h2>
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-primary outline-none transition-all shadow-[0_0_15px_rgba(217,70,239,0.0)] focus:shadow-[0_0_15px_rgba(217,70,239,0.1)]"
                            placeholder="Tu nombre completo"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Email de acceso</label>
                        <input
                            type="email"
                            value={profile?.email || 'Cargando...'}
                            disabled
                            className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed outline-none"
                        />
                        <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">El email no puede ser modificado.</p>
                    </div>
                </div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 mb-6 group hover:border-white/20 transition-colors">
                <h2 className="font-bold text-lg mb-2 flex items-center gap-3 tracking-tight uppercase">
                    <Phone size={20} className="text-secondary" /> WhatsApp de Contacto
                </h2>
                <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest leading-relaxed">
                    Este número se usará en tu perfil público si tienes subdominio activado.
                </p>
                <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Número (con código de país)</label>
                    <input
                        type="tel"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="+1 555 123 4567"
                        className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-secondary outline-none transition-all shadow-[0_0_15px_rgba(0,242,255,0.0)] focus:shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                    />
                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Ejemplo: +573001234567</p>
                </div>
            </div>

            {/* Telegram */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8 group hover:border-white/20 transition-colors">
                <h2 className="font-bold text-lg mb-2 flex items-center gap-3 tracking-tight uppercase">
                    <MessageCircle size={20} className="text-accent" /> Conectar Telegram
                </h2>
                <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest leading-relaxed">
                    Vincula tu Telegram para chatear con Legao, Albert y Nikola desde cualquier lugar.
                </p>
                {profile?.telegram_id ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <p className="text-sm text-accent font-bold uppercase tracking-widest">Telegram vinculado (ID: {profile.telegram_id})</p>
                    </div>
                ) : (
                    <a
                        href={`https://t.me/albertlegadobot?start=link_${profile?.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-[#0088cc] hover:bg-[#0088cc]/80 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-lg"
                    >
                        <MessageCircle size={18} />
                        Conectar con Telegram
                    </a>
                )}
            </div>

            {/* Alertas */}
            {message && (
                <div className={`mb-6 p-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest border ${message.type === 'success' ? 'bg-accent/10 text-accent border-accent/30' : 'bg-red-500/10 text-red-500 border-red-500/30'} animate-fade-in`}>
                    {message.text}
                </div>
            )}

            {/* Guardar */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="btn-neon-primary w-full p-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-6 disabled:opacity-50"
            >
                {saving ? <Loader2 size={20} className="animate-spin" /> : null}
                {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>

            {/* Cerrar sesión */}
            <button
                onClick={signOut}
                className="w-full p-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-red-500 border border-red-500/30 hover:bg-red-500/10 transition-colors"
            >
                <LogOut size={18} /> Cerrar Sesión
            </button>
        </div>
    );
}
