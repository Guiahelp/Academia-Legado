"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, X, Sparkles, Shield, Cpu, Link, Wallet, Globe, Bot, Scale, Rocket, Brain, Users, Target, TrendingUp, Zap, Lock, Lightbulb, DollarSign, Key, Eye, Network, Mic, Loader2, Clock } from "lucide-react";
import LevelCard from "@/features/academy/components/LevelCard";
import VideoPopup from "@/features/academy/components/VideoPopup";
import FlipCardFAQ from "@/features/academy/components/FlipCardFAQ";
import DownloadZone from "@/features/academy/components/DownloadZone";
import NotebookResource from "@/features/academy/components/NotebookResource";
import ConfettiEffect from "@/features/academy/components/ConfettiEffect";
import PremiumGateModal from "@/features/academy/components/PremiumGateModal";
import { AIAgentSupport } from "@/features/academy/components/AIAgentSupport";
import { useAcademyAccess } from "@/features/academy/hooks/useAcademyAccess";
import { useAcademyProgress } from "@/features/academy/hooks/useAcademyProgress";
import { useAuth } from "@/features/auth/contexts/AuthContext";

const ORACULO_AUDIO = "https://jnvpzjjgcdclcwgjgkpk.supabase.co/storage/v1/object/public/assets/voz-oraculo.MP3";
const ALBERT_IMAGE = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/albert.webp";

interface VideoItem {
    id: string; title: string; subtitle?: string; duration: string; icon: React.ReactNode; videoId?: string; comingSoon?: boolean;
}

const level0Videos: VideoItem[] = [
    { id: "l0-1", title: "Smart Contracts y cómo funciona Tribu", duration: "5:00 min", icon: <Sparkles size={20} className="text-secondary" />, videoId: "HYgvMz8Bnok" },
    { id: "l0-2", title: "Creando cuenta en Binance profesionalmente", duration: "3:00 min", icon: <Globe size={20} className="text-secondary" />, videoId: "KbR0RLP0IXM" },
    { id: "l0-3", title: "Compra USDT P2P en moneda local", duration: "3:00 min", icon: <Wallet size={20} className="text-secondary" />, videoId: "8dXj0nwT7hk" },
    { id: "l0-4", title: "Tutorial de Registro en Tribu", duration: "2:30 min", icon: <Link size={20} className="text-secondary" />, videoId: "jWVTgShpIXc" },
    { id: "l0-5", title: "Duplicación del Sistema", duration: "2:00 min", icon: <Cpu size={20} className="text-secondary" />, videoId: "rUstOZhKEZ0" },
    { id: "l0-6", title: "Casos de Éxito", duration: "1 min", icon: <Rocket size={20} className="text-secondary" />, videoId: "aFk6cXo7R-A" },
];

const level1Videos: VideoItem[] = [
    { id: "l1-1", title: "Rompiendo la Matrix Financiera", subtitle: "Por qué el empleo tradicional colapsó y la Economía Colaborativa es el nuevo petróleo.", duration: "15 min", icon: <Brain size={20} className="text-secondary" />, comingSoon: true },
    { id: "l1-2", title: "El Código es Ley (Code is Law)", subtitle: "Entendiendo la inmutabilidad: Por qué un Smart Contract es más seguro que un banco.", duration: "12 min", icon: <Shield size={20} className="text-secondary" />, comingSoon: true },
    { id: "l1-3", title: "Tu Semilla de Libertad", subtitle: "El efecto compuesto de un único aporte: La matemática detrás del salto de Cristal a Diamante.", duration: "10 min", icon: <Sparkles size={20} className="text-secondary" />, comingSoon: true },
    { id: "l1-4", title: "De Empleado a Dueño de Sistema", subtitle: "Reprogramación Mental: Deja de trabajar por dinero y haz que el algoritmo trabaje por ti.", duration: "18 min", icon: <TrendingUp size={20} className="text-secondary" />, comingSoon: true },
    { id: "l1-5", title: "La Economía del Regalo (Gift Economy)", subtitle: "Legalidad y Filosofía: La diferencia vital entre 'Inversión' y 'Donación P2P'.", duration: "14 min", icon: <Scale size={20} className="text-secondary" />, comingSoon: true },
    { id: "l1-6", title: "El Mapa del Tesoro: Visualización", subtitle: "Define tu 'Por Qué': El combustible emocional para no rendirte hasta llegar a la cima.", duration: "12 min", icon: <Target size={20} className="text-secondary" />, comingSoon: true },
];

const level2Videos: VideoItem[] = [
    { id: "l2-1", title: "Tu Banco en el Bolsillo", subtitle: "Configuración blindada de Trust Wallet y Metamask: Tu bóveda personal inhackeable.", duration: "15 min", icon: <Wallet size={20} className="text-secondary" />, videoId: "Mv_eEsRXfR4" },
    { id: "l2-2", title: "El Puente Fiat-Cripto", subtitle: "Maestría en Binance P2P: Cómo convertir tu moneda local en activos digitales en 5 minutos.", duration: "12 min", icon: <Link size={20} className="text-secondary" />, comingSoon: true },
    { id: "l2-3", title: "El Dólar Digital (USDT)", subtitle: "Estabilidad en el caos: Por qué usamos Stablecoins y cómo evitar la volatilidad del mercado.", duration: "10 min", icon: <DollarSign size={20} className="text-secondary" />, comingSoon: true },
    { id: "l2-4", title: "El Combustible de la Red (BNB)", subtitle: "Entendiendo el Gas Fee: Qué es y por qué necesitas tener saldo para que el contrato ejecute.", duration: "8 min", icon: <Zap size={20} className="text-secondary" />, comingSoon: true },
    { id: "l2-5", title: "Blindaje de Activos Nivel Militar", subtitle: "2FA, Frases Semilla y Anti-Phishing: Cómo ser invisible para los estafadores digitales.", duration: "18 min", icon: <Key size={20} className="text-secondary" />, comingSoon: true },
    { id: "l2-6", title: "Transparencia Radical (BscScan)", subtitle: "Auditoría en tiempo real: Aprende a rastrear cada centavo en la Blockchain pública.", duration: "14 min", icon: <Eye size={20} className="text-secondary" />, comingSoon: true },
];

const level3Videos: VideoItem[] = [
    { id: "l3-1", title: "El Algoritmo de la Duplicación", subtitle: "La matemática del 2x2: Cómo crear una avalancha de crecimiento exponencial.", duration: "15 min", icon: <Network size={20} className="text-secondary" />, comingSoon: true },
    { id: "l3-2", title: "Ingeniería de Posiciones", subtitle: "Estrategia de Tablero: Dónde colocar a tus socios clave para acelerar el ciclado.", duration: "12 min", icon: <Target size={20} className="text-secondary" />, comingSoon: true },
    { id: "l3-3", title: "El Arte de Filtrar (No Perseguir)", subtitle: "Marketing de Atracción: Usa la WebApp y la IA para separar a los curiosos de los constructores.", duration: "14 min", icon: <Lightbulb size={20} className="text-secondary" />, comingSoon: true },
    { id: "l3-4", title: "Psicología de Ventas y Cierre", subtitle: "Manejo de Objeciones: Qué responder con elegancia ante la duda.", duration: "18 min", icon: <Mic size={20} className="text-secondary" />, comingSoon: true },
    { id: "l3-5", title: "Tráfico Infinito (Redes Sociales)", subtitle: "Marca Personal: Cómo configurar tus perfiles para atraer prospectos.", duration: "16 min", icon: <Globe size={20} className="text-secondary" />, comingSoon: true },
    { id: "l3-6", title: "Gestión de Tribus (Comunidad)", subtitle: "El Fuego del Grupo: Cómo mantener activo tu chat de WhatsApp.", duration: "12 min", icon: <Users size={20} className="text-secondary" />, comingSoon: true },
];

const levels = [
    { number: 0, title: "FUNDAMENTOS TRIBU", subtitle: "Aprende las bases del sistema", emoji: "🎯", videos: level0Videos },
    { number: 1, title: "EL DESPERTAR", subtitle: "Mentalidad de abundancia", emoji: "🧠", videos: level1Videos },
    { number: 2, title: "EL ARSENAL DIGITAL", subtitle: "Dominio técnico cripto", emoji: "⚡", videos: level2Videos },
    { number: 3, title: "ARQUITECTURA DE RED", subtitle: "Expansión y Comunidad", emoji: "👑", videos: level3Videos },
];

export default function AcademiaPage() {
    const { status, isPending } = useAuth();
    const { hasAccess, isLoading: isAccessLoading } = useAcademyAccess();
    const { currentLevel, loadingProgress, unlockNextLevel, isLevelUnlocked } = useAcademyProgress();
    const [localAccess, setLocalAccess] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    useEffect(() => {
        if (hasAccess) setLocalAccess(true);
    }, [hasAccess]);

    const [showOraculo, setShowOraculo] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sv = localStorage.getItem("academy_completed_videos");
            if (sv) setCompletedVideos(new Set(JSON.parse(sv)));
        }
    }, []);

    const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("academy_completed_videos", JSON.stringify([...completedVideos]));
        }
    }, [completedVideos]);

    useEffect(() => {
        if (showOraculo && audioRef.current && (hasAccess || localAccess || status === 'guest' || isPending)) {
            // Intentar autoplay, si falla el usuario usará el botón Play
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

            audioRef.current.onended = () => setIsPlaying(false);
        }
    }, [showOraculo, hasAccess, localAccess, status, isPending]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleVideoComplete = (videoId: string) => setCompletedVideos(prev => new Set([...prev, videoId]));

    const handleCompleteLevel = async (levelNumber: number) => {
        if (isPending || status === 'guest') {
            setShowPremiumModal(true);
            return;
        }
        if (levelNumber === 0 && !hasAccess) {
            setShowPremiumModal(true);
            return;
        }
        await unlockNextLevel(levelNumber);
        setShowConfetti(true);
    };

    const isLevelCompleted = (levelNumber: number) => levelNumber < currentLevel;
    const areAllVideosInLevelCompleted = (videos: VideoItem[]) => videos.every(v => v.comingSoon || completedVideos.has(v.id));
    const handleLockedClick = () => setShowPremiumModal(true);

    const handleUnlock = () => {
        if (status === 'guest') {
            window.location.href = '/signup';
        } else {
            setShowPremiumModal(true);
        }
    };

    const _isLevelUnlockedFinal = (levelNumber: number) => {
        if (isPending || status === 'guest') return false;
        return levelNumber === 0 || ((hasAccess || localAccess) && isLevelUnlocked(levelNumber));
    };

    if (isAccessLoading || loadingProgress) return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground animate-pulse font-bold tracking-widest uppercase">Verificando Acceso y Rango...</p>
        </div>
    );

    return (
        <div className="min-h-screen p-4 pt-8 pb-32 animate-fade-in relative z-10 max-w-2xl mx-auto">
            <ConfettiEffect isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
            <PremiumGateModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} onUnlock={handleUnlock} />

            {isPending && (
                <div className="mb-8 glass-card border-primary/50 bg-primary/5 p-4 rounded-2xl flex items-center gap-4 animate-slide-up">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="text-primary w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Cuenta Pendiente</p>
                        <p className="text-[10px] text-muted-foreground uppercase leading-tight">Tu acceso a los niveles avanzados se habilitará tras la aprobación del administrador.</p>
                    </div>
                </div>
            )}

            {showOraculo && (true /* TEMPORALMENTE DESBLOQUEADO: hasAccess || localAccess */) && (
                <div className="glass-card p-5 rounded-2xl mb-8 border-2 border-secondary/20 shadow-neon-accent animate-slide-up">
                    <audio ref={audioRef} src={ORACULO_AUDIO} />
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0 border-2 border-primary/50 overflow-hidden relative shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                                <img src={ALBERT_IMAGE} alt="Albert" className="w-full h-full object-cover opacity-90" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-primary text-lg uppercase tracking-wider">El Oráculo (Albert)</h3>
                                    <div className="flex items-center gap-2">
                                        <button onClick={togglePlay} className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-primary/20 hover:bg-primary/30' : 'bg-primary/20 hover:bg-primary/30'} flex items-center gap-2 text-xs font-bold uppercase`}>
                                            {isPlaying ? <><Pause size={16} className="text-primary" /> <span className="text-primary hidden sm:inline">Pausar</span></> : <><Play size={16} className="text-primary" /> <span className="text-primary hidden sm:inline">Escuchar</span></>}
                                        </button>
                                        <button onClick={() => setShowOraculo(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed max-h-48 overflow-y-auto pr-2 scrollbar-hide space-y-3">
                            <p>Bienvenido a la Academia Legado. Soy Albert, tu Oráculo.</p>
                            <p>Frente a ti tienes el mapa maestro. Hemos condensado todo el poder del sistema Tribu y la blockchain en esta biblioteca de videos y guías.</p>
                            <p>Tu primera misión es absorber este conocimiento. Las respuestas que buscas para recibir tus beneficios ya están grabadas aquí abajo.</p>
                            <p className="text-primary font-bold">El futuro ya está aquí. Empieza por el primer video.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">ACADEMIA</span> LEGADO
                </h1>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">4 Niveles • Progresión Desbloqueada</p>
            </div>

            {!(hasAccess || localAccess) && (
                <div className="flex justify-center mb-8">
                    <button onClick={handleLockedClick} className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 animate-pulse" style={{ background: 'linear-gradient(135deg, hsl(45 100% 50% / 0.1), hsl(35 100% 45% / 0.05))', border: '1px solid hsl(45 100% 50% / 0.5)', color: 'hsl(45 100% 50%)', boxShadow: '0 0 20px hsl(45 100% 50% / 0.2)' }}>
                        <Lock size={16} /> <span>CONTENIDO PREMIUM - DESBLOQUEAR AHORA</span>
                    </button>
                </div>
            )}

            <div className="space-y-2">
                {levels.map((level) => (
                    <LevelCard key={level.number} levelNumber={level.number} title={level.title} subtitle={level.subtitle} emoji={level.emoji} videos={level.videos} isUnlocked={_isLevelUnlockedFinal(level.number)} isCompleted={isLevelCompleted(level.number)} completedVideos={completedVideos} onVideoClick={(video) => setCurrentVideo(video)} onCompleteLevel={() => handleCompleteLevel(level.number)} allVideosCompleted={areAllVideosInLevelCompleted(level.videos)} onLockedClick={handleLockedClick} />
                ))}
            </div>

            <FlipCardFAQ />
            <NotebookResource />
            <DownloadZone />

            <div className="mt-12 mb-8">
                <h2 className="text-center font-bold text-xl uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                    <Zap className="text-secondary" /> Soporte de Agentes <Zap className="text-secondary" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AIAgentSupport agent="Nikola" />
                    <AIAgentSupport agent="Albert" />
                </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot size={24} className="text-primary" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-primary tracking-tight">Tutor IA Interactivo</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Toca aquí para resolver dudas 24/7</p>
                </div>
            </div>

            {currentVideo && currentVideo.videoId && (
                <VideoPopup videoId={currentVideo.videoId} title={currentVideo.title} onClose={() => setCurrentVideo(null)} onComplete={() => handleVideoComplete(currentVideo.id!)} />
            )}
        </div>
    );
}
