'use client'

import { useState } from 'react'
import { useProspects, useGoals, useDailyHabit } from '../hooks/useSuccessGuide'
import { ProspectList } from './ProspectList'
import { GoalTracker } from './GoalTracker'
import { DailyChecklist } from './DailyChecklist'
import { successGuideService } from '../services/successGuideService'
import { Target, TrendingUp, Brain, Rocket, Shield, Sparkles, Bot, Users, Zap, CheckCircle2, Lock, X } from "lucide-react";
import { AIAssistantModal } from './AIAssistantModal'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { useAuth } from '@/features/auth/contexts/AuthContext'
import { OneClickShare } from '@/shared/components/layout/OneClickShare'
import { GraduationCap, MessageSquare } from 'lucide-react'

const FASES = [
    {
        nombre: "Fase 1: Fundamentos",
        pasos: [
            { id: 1, titulo: "Declaración de Intención", icon: <Target className="text-primary" size={24} /> },
            { id: 2, titulo: "Tu 'Por Qué'", icon: <Brain className="text-primary" size={24} /> },
            { id: 3, titulo: "El Vehículo", icon: <Zap className="text-primary" size={24} /> },
        ]
    },
    {
        nombre: "Fase 2: Crecimiento",
        pasos: [
            { id: 4, titulo: "Lista Inteligente CRM", icon: <Users className="text-secondary" size={24} /> },
            { id: 5, titulo: "Contenido que Conecta", icon: <Bot className="text-secondary" size={24} /> },
            { id: 6, titulo: "Sistema de Invitación", icon: <Rocket className="text-secondary" size={24} /> },
        ]
    },
    {
        nombre: "Fase 3: Expansión",
        pasos: [
            { id: 7, titulo: "Seguimiento Automatizado", icon: <TrendingUp className="text-accent" size={24} /> },
            { id: 8, titulo: "Cierre y Bienvenida", icon: <Shield className="text-accent" size={24} /> },
            { id: 9, titulo: "Ciclo de Mejora", icon: <Sparkles className="text-accent" size={24} /> },
        ]
    }
];

export default function SuccessGuideLayout() {
    const { isPending, status } = useAuth()
    const { prospects, loading: loadingProspects, refetch: refetchProspects } = useProspects()
    const { goals, loading: loadingGoals, refetch: refetchGoals } = useGoals()
    const today = new Date().toISOString().split('T')[0]
    const { habit, loading: loadingHabit, refetch: refetchHabit } = useDailyHabit(today)

    // State for AI Modal
    const [selectedStep, setSelectedStep] = useState<{ id: number, titulo: string } | null>(null)
    const [showLockedModal, setShowLockedModal] = useState(false)
    const [isZenMode, setIsZenMode] = useState(false)
    const isLocked = false; // TEMPORALMENTE DESBLOQUEADO: isPending || status === 'guest'

    const handleSaveHabit = async (habitData: any) => {
        if (isLocked) return;
        try {
            await successGuideService.upsertDailyHabit({
                ...habitData,
                date: today
            })
            refetchHabit()
        } catch (error) {
            console.error('Error saving habit:', error)
        }
    }

    return (
        <div className={`space-y-8 pb-20 md:pb-0 relative`}>
            {showLockedModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card p-8 rounded-3xl max-w-sm w-full relative border-primary/30 text-center animate-scale-in">
                        <button onClick={() => setShowLockedModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-white">
                            <X size={20} />
                        </button>
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 mb-4">
                            <Lock className="text-primary" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase italic mb-2">Acceso <span className="text-primary">Restringido</span></h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {status === 'guest' ? 'Inicia sesión para interactuar con las herramientas de éxito.' : 'Tu cuenta está en revisión. Las herramientas se desbloquearán tras la aprobación.'}
                        </p>
                        <Button asChild className="btn-neon-primary w-full">
                            <Link href={status === 'guest' ? '/login' : '/'}>
                                {status === 'guest' ? 'INICIAR SESIÓN' : 'VOLVER AL INICIO'}
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
            {/* Header Mobile-Optimized */}
            <header className="animate-fade-in mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 uppercase">Guía del <span className="text-primary">Éxito</span></h1>
                    <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest font-medium mb-4">Mapas de Operación Activos.</p>
                </div>
                <div className="flex flex-col gap-2 mx-auto md:mx-0">
                    <Button
                        onClick={() => setIsZenMode(!isZenMode)}
                        variant="outline"
                        className="border-primary/50 text-xs text-primary hover:bg-primary/10 transition-colors w-full md:w-fit shadow-[0_0_10px_rgba(255,211,0,0.1)]"
                    >
                        {isZenMode ? "← Volver a Vista Completa" : "🧘 Modo Zen (Simple)"}
                    </Button>
                </div>
                {isLocked && (
                    <div className="glass-card border-primary/50 bg-primary/5 p-4 rounded-2xl flex items-center justify-between gap-4 animate-slide-up text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Lock className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest">Modo Lectura</p>
                                <p className="text-[10px] text-muted-foreground uppercase leading-tight">
                                    {status === 'guest' ? 'Inicia sesión para usar las herramientas.' : 'Cuenta en revisión. Herramientas activas tras aprobación.'}
                                </p>
                            </div>
                        </div>
                        <Button onClick={() => setShowLockedModal(true)} variant="outline" size="sm" className="border-primary/50 text-xs hidden md:flex">Desbloquear</Button>
                    </div>
                )}
            </header>

            {isZenMode ? (
                <div className="space-y-6 animate-fade-in w-full max-w-md mx-auto mt-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Modo <span className="text-primary">Simplificado</span></h2>
                        <p className="text-sm text-muted-foreground">Tres acciones. Cero distracciones.</p>
                    </div>

                    <Link href="/academia" className="block w-full">
                        <button className="w-full relative group active:scale-[0.98] transition-all duration-300">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
                            <div className="relative h-20 bg-black/40 border border-blue-500/30 hover:border-blue-500/80 rounded-3xl flex items-center justify-center gap-4 shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                                    <GraduationCap size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="text-left w-2/3">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-blue-400 transition-colors">Academia</h3>
                                    <p className="text-[10px] text-blue-400/80 uppercase tracking-widest truncate">Aprender las bases</p>
                                </div>
                            </div>
                        </button>
                    </Link>

                    <OneClickShare />

                    <a href="https://t.me/nikolalegadobot" target="_blank" rel="noopener noreferrer" className="block w-full">
                        <button className="w-full relative group active:scale-[0.98] transition-all duration-300">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
                            <div className="relative h-20 bg-black/40 border border-purple-500/30 hover:border-purple-500/80 rounded-3xl flex items-center justify-center gap-4 shadow-[0_0_20px_rgba(168,85,247,0.1)] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                                    <MessageSquare size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="text-left w-2/3">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-purple-400 transition-colors">Soporte IA</h3>
                                    <p className="text-[10px] text-purple-400/80 uppercase tracking-widest truncate">Hablar con Oráculo</p>
                                </div>
                            </div>
                        </button>
                    </a>
                </div>
            ) : (
                <>
                    {/* Timeline View para Guía del Éxito */}
                    <div className="relative">
                        {isLocked && <div className="absolute inset-0 z-20 bg-transparent cursor-pointer" onClick={() => setShowLockedModal(true)} />}
                        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-8">
                            {FASES.map((fase, i) => (
                                <div key={i} className="relative animate-slide-up" style={{ animationDelay: `${i * 0.15}s` }}>

                                    {/* Indicador de Fase */}
                                    <div className="absolute -left-[21px] md:-left-[29px] w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#0a0f1c] border-2 border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,211,0,0.15)] z-10">
                                        <span className="text-primary font-bold">{i + 1}</span>
                                    </div>

                                    <div className="pl-8 md:pl-12 pt-1 md:pt-3">
                                        <h2 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider">{fase.nombre}</h2>

                                        <div className="space-y-4">
                                            {fase.pasos.map((paso) => (
                                                <div
                                                    key={paso.id}
                                                    onClick={() => setSelectedStep({ id: paso.id, titulo: paso.titulo })}
                                                    className="glass-card p-4 md:p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all cursor-pointer group flex items-center gap-4 relative overflow-hidden active:scale-[0.98]"
                                                    style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
                                                >
                                                    {/* Glow effect on hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-black/40 border border-white/5 group-hover:border-primary/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                                        {paso.icon}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-sm">Paso {paso.id}</span>
                                                        </div>
                                                        <h3 className="font-bold text-white/90 group-hover:text-white truncate">{paso.titulo}</h3>
                                                    </div>

                                                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-black transition-colors">
                                                        <Bot size={16} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Otras Herramientas */}
                    <div className="relative mt-8">
                        {isLocked && <div className="absolute inset-0 z-20 bg-transparent cursor-pointer" onClick={() => setShowLockedModal(true)} />}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProspectList prospects={prospects} isLoading={loadingProspects} />
                            <div className="space-y-6">
                                <GoalTracker goals={goals} isLoading={loadingGoals} />
                                <DailyChecklist habit={habit} isLoading={loadingHabit} onSave={handleSaveHabit} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* IA Assistant Modal */}
            {selectedStep && (
                <AIAssistantModal
                    isOpen={true}
                    onClose={() => setSelectedStep(null)}
                    stepTitle={selectedStep.titulo}
                    stepId={selectedStep.id}
                />
            )}
        </div>
    )
}
