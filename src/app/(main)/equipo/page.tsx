"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { supabase } from '@/shared/lib/supabase';
import { Loader2, Users, Plus, Pencil, Trash2, ChevronDown } from 'lucide-react';

type EstadoInvitado = 'Invitación enviada' | 'Vio la web' | 'Se registró' | 'Necesita seguimiento';

interface Invitado {
    id: string;
    nombre_invitado: string;
    fecha_invitacion: string;
    estado: EstadoInvitado;
    notas: string | null;
}

const ESTADOS: EstadoInvitado[] = ['Invitación enviada', 'Vio la web', 'Se registró', 'Necesita seguimiento'];

const estadoColor: Record<EstadoInvitado, string> = {
    'Invitación enviada': 'bg-primary/20 text-primary border-primary/30',
    'Vio la web': 'bg-secondary/20 text-secondary border-secondary/30',
    'Se registró': 'bg-accent/20 text-accent border-accent/30',
    'Necesita seguimiento': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
};

export default function MiEquipoPage() {
    const { user } = useAuth();
    const [invitados, setInvitados] = useState<Invitado[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [form, setForm] = useState({
        nombre_invitado: '',
        fecha_invitacion: new Date().toISOString().split('T')[0],
        estado: 'Invitación enviada' as EstadoInvitado,
        notas: '',
    });

    const fetchInvitados = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('equipo_invitados')
                .select('*')
                .eq('usuario_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setInvitados(data as Invitado[]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchInvitados();
        else setLoading(false);
    }, [user]);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const resetForm = () => {
        setForm({ nombre_invitado: '', fecha_invitacion: new Date().toISOString().split('T')[0], estado: 'Invitación enviada', notas: '' });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSave = async () => {
        if (!user || !form.nombre_invitado.trim()) {
            showMessage('error', 'El nombre es obligatorio');
            return;
        }

        setSaving(true);
        try {
            if (editingId) {
                const { error } = await supabase
                    .from('equipo_invitados')
                    .update(form)
                    .eq('id', editingId)
                    .eq('usuario_id', user.id);
                if (error) throw error;
                showMessage('success', '¡Invitado actualizado con éxito!');
            } else {
                const { error } = await supabase
                    .from('equipo_invitados')
                    .insert({ ...form, usuario_id: user.id });
                if (error) throw error;
                showMessage('success', '¡Nuevo invitado añadido!');
            }
            await fetchInvitados();
            resetForm();
        } catch (err) {
            console.error(err);
            showMessage('error', 'Ocurrió un error al guardar.');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (inv: Invitado) => {
        setForm({
            nombre_invitado: inv.nombre_invitado,
            fecha_invitacion: inv.fecha_invitacion,
            estado: inv.estado,
            notas: inv.notas || '',
        });
        setEditingId(inv.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string, nombre: string) => {
        if (!user || !confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) return;

        try {
            const { error } = await supabase
                .from('equipo_invitados')
                .delete()
                .eq('id', id)
                .eq('usuario_id', user.id);

            if (error) throw error;

            setInvitados(prev => prev.filter(i => i.id !== id));
            showMessage('success', 'Invitado eliminado');
        } catch (err) {
            console.error(err);
            showMessage('error', 'Error al eliminar el invitado');
        }
    };

    return (
        <div className="min-h-screen p-4 pb-32 max-w-2xl mx-auto animate-fade-in pt-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold tracking-tight uppercase">
                    <span className="text-primary">Mi</span> Equipo
                </h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="btn-neon-primary px-4 py-2 text-sm uppercase tracking-widest font-bold flex items-center shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                >
                    <Plus size={16} className="mr-1" /> Añadir
                </button>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-8">
                Registra y da seguimiento a tus invitados
            </p>

            {/* Alertas */}
            {message && (
                <div className={`mb-6 p-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest border ${message.type === 'success' ? 'bg-accent/10 text-accent border-accent/50 shadow-[0_0_15px_rgba(0,255,136,0.1)]' : 'bg-red-500/10 text-red-500 border-red-500/30'} animate-fade-in`}>
                    {message.text}
                </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-center hover:border-white/20 transition-all shadow-lg animate-slide-up">
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">{invitados.length}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Invitados totales</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-center hover:border-white/20 transition-all shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <p className="text-4xl font-bold text-accent drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">{invitados.filter(i => i.estado === 'Se registró').length}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Se registraron</p>
                </div>
            </div>

            {/* Formulario */}
            {showForm && (
                <div className="glass-card p-6 rounded-2xl border border-primary/50 mb-8 animate-scale-in shadow-[0_0_30px_rgba(217,70,239,0.1)] relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50 rounded-t-2xl"></div>

                    <h2 className="font-bold mb-6 text-lg tracking-widest uppercase">{editingId ? 'Editar' : 'Nuevo'} Invitado</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Nombre *</label>
                            <input
                                type="text"
                                value={form.nombre_invitado}
                                onChange={e => setForm(f => ({ ...f, nombre_invitado: e.target.value }))}
                                className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-primary outline-none transition-all shadow-[0_0_15px_rgba(217,70,239,0.0)] focus:shadow-[0_0_15px_rgba(217,70,239,0.1)]"
                                placeholder="Nombre del invitado"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Fecha de invitación</label>
                            <input
                                type="date"
                                value={form.fecha_invitacion}
                                onChange={e => setForm(f => ({ ...f, fecha_invitacion: e.target.value }))}
                                className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-primary outline-none transition-all custom-calendar-icon text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Estado</label>
                            <div className="relative">
                                <select
                                    value={form.estado}
                                    onChange={e => setForm(f => ({ ...f, estado: e.target.value as EstadoInvitado }))}
                                    className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                                >
                                    {ESTADOS.map(e => <option key={e} value={e} className="bg-zinc-900">{e}</option>)}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Notas (opcional)</label>
                            <input
                                type="text"
                                value={form.notas}
                                onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                                className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:border-primary outline-none transition-all"
                                placeholder="Cualquier detalle relevante"
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 btn-neon-primary py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center text-sm disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                                {editingId ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="border border-white/20 py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-sm text-gray-300 hover:bg-white/10 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-primary drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                </div>
            ) : invitados.length === 0 ? (
                <div className="text-center py-20 px-4 glass-card rounded-2xl border border-white/5 animate-fade-in">
                    <Users size={48} className="mx-auto mb-4 text-gray-600" />
                    <p className="font-bold text-lg uppercase tracking-widest text-gray-300">Aún no hay invitados</p>
                    <p className="text-xs mt-2 text-gray-500 uppercase tracking-widest">Empieza registrando a tu primera conexión</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {invitados.map((inv, i) => (
                        <div
                            key={inv.id}
                            className="glass-card p-5 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-white/10 transition-all group animate-slide-up"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="w-12 h-12 rounded-full bg-black/40 border border-primary/30 shadow-[0_0_10px_rgba(217,70,239,0.2)] flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-primary">{inv.nombre_invitado.charAt(0).toUpperCase()}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap mb-1">
                                    <p className="font-bold text-white truncate text-lg tracking-tight">{inv.nombre_invitado}</p>
                                    <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${estadoColor[inv.estado]} shadow-sm`}>
                                        {inv.estado}
                                    </span>
                                </div>

                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                                    Agregado el {new Date(inv.fecha_invitacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>

                                {inv.notas && (
                                    <p className="text-sm text-gray-400 mt-2 truncate bg-black/20 p-2 rounded-lg border border-white/5">
                                        {inv.notas}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 opacity-100 sm:opacity-50 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(inv)}
                                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                    aria-label="Editar invitado"
                                >
                                    <Pencil size={16} className="text-gray-300" />
                                </button>
                                <button
                                    onClick={() => handleDelete(inv.id, inv.nombre_invitado)}
                                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                                    aria-label="Eliminar invitado"
                                >
                                    <Trash2 size={16} className="text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
