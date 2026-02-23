"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Volume2, VolumeX, ArrowRight, Play } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import TikTokSubtitle from "@/shared/components/ui/TikTokSubtitle";
import YouTubePopup from "@/shared/components/ui/YouTubePopup";
import TestModal from "@/features/agents/components/TestModal";
import EducationalDisclaimer from "@/shared/components/ui/EducationalDisclaimer";

type AgentStage = "albert-video" | "nikola-video" | "complete";

const ALBERT_VIDEO = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/Albert-Agent-com.mp4";
const ALBERT_AUDIO = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/albert%20.MP3";
const ALBERT_IMAGE = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/albert.webp";

const NIKOLA_VIDEO = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/Agente%20Nikola.mp4";
const NIKOLA_AUDIO = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/Agente-nikola-audio.MP3";
const NIKOLA_IMAGE = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/agent-nikola.webp";

const YOUTUBE_VIDEO_ID = "Q2B8PkeUHQI";

const ALBERT_SUBTITLES = `Bienvenido, soy Albert. En este momento proceso en tiempo real el éxito de miles de usuarios que, como tú, decidieron dejar de luchar solos. Hemos dominado la tecnología; y es tu turno de aprovecharla. Únete a la Tribu Legado, yo trabajaré para ti. No viniste a esforzarte; viniste a ganar con nuestro sistema. ¿Listo para ver abundancia real? Toca el botón y avancemos.`;

const NIKOLA_SUBTITLES = `Soy Nikola. Presta atención. En el sistema Tribu, la suerte no existe; existe la matemática algorítmica. Lo que vas a ver a continuación no es magia, es un Smart Contract ejecutando prosperidad. Dedica los siguientes 5 minutos a entender cómo funciona el motor de tu prosperidad. No saltes nada. El sistema te estará evaluando.`;

export default function AgentesPage() {
    const router = useRouter();
    const [stage, setStage] = useState<AgentStage>("albert-video");
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCTA, setShowCTA] = useState(false);
    const [showYouTubePopup, setShowYouTubePopup] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (!hasStarted) return;

        setShowCTA(false);
        setIsPlaying(false);

        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().catch((err) => {
                    console.error("Audio play failed:", err);
                    // Force CTA if audio completely fails
                    setShowCTA(true);
                });
                setIsPlaying(true);
            }
            if (videoRef.current) {
                videoRef.current.play().catch(() => { });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [stage, hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
        if (audioRef.current) audioRef.current.play().catch(() => { });
        if (videoRef.current) videoRef.current.play().catch(() => { });
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setShowCTA(true);
    };

    const handleSkip = () => {
        router.push("/guia");
    };

    const handleAdvanceFromAlbert = () => {
        setStage("nikola-video");
    };

    const handleOpenYouTube = () => {
        setShowYouTubePopup(true);
    };

    const handleApplyToTribe = () => {
        setShowYouTubePopup(false);
        setShowTestModal(true);
    };

    const renderAlbertVideo = () => (
        <div className="fixed inset-0 z-0 flex flex-col bg-black">
            <video
                ref={videoRef}
                src={ALBERT_VIDEO}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                autoPlay={hasStarted}
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <audio ref={audioRef} src={ALBERT_AUDIO} onEnded={handleAudioEnded} />

            {!hasStarted && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="glass-card-primary p-8 rounded-3xl text-center space-y-6 max-w-xs animate-scale-in">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30 shadow-neon-primary">
                            <Play className="text-primary fill-primary" size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase italic tracking-tight">Agente <span className="text-primary">Invitado</span></h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed">Haz clic para escuchar el mensaje de Albert y comenzar tu viaje.</p>
                        <Button onClick={handleStart} className="btn-neon-primary w-full py-6 font-bold uppercase tracking-widest text-sm">COMENZAR</Button>
                    </div>
                </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col justify-end p-4 pb-32 max-w-md mx-auto w-full">
                <div className={`glass-card-primary p-6 rounded-2xl w-full text-center transition-all duration-500 mb-6 ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <img src={ALBERT_IMAGE} alt="Albert" className="w-20 h-20 rounded-full mx-auto mb-4 avatar-neon object-cover" />
                    <h2 className="text-xl font-bold text-neon-pink mb-2">AGENTE ALBERT</h2>
                    <Button onClick={handleAdvanceFromAlbert} className="btn-neon-primary w-full gap-2">AVANCEMOS <ArrowRight size={18} /></Button>
                </div>

                <div className="flex items-center justify-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-neon-pink tracking-tighter">ALBERT</h1>
                    <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-full ${isMuted ? 'bg-destructive/50' : 'bg-primary/20'}`}>
                        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                </div>

                <div className="min-h-[80px] mb-6"><TikTokSubtitle text={ALBERT_SUBTITLES} isPlaying={isPlaying} duration={25} /></div>
                <button onClick={handleSkip} className="text-muted-foreground text-xs hover:text-primary transition-colors uppercase tracking-widest">Saltar presentación →</button>
            </div>
        </div>
    );

    const renderNikolaVideo = () => (
        <div className="fixed inset-0 z-0 flex flex-col bg-black">
            <video
                ref={videoRef}
                src={NIKOLA_VIDEO}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <audio ref={audioRef} src={NIKOLA_AUDIO} onEnded={handleAudioEnded} />

            <div className="relative z-10 flex-1 flex flex-col justify-end p-4 pb-32 max-w-md mx-auto w-full">
                <div className={`glass-card-secondary p-6 rounded-2xl w-full text-center transition-all duration-500 mb-6 ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <img src={NIKOLA_IMAGE} alt="Nikola" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-neon-cyan" />
                    <h2 className="text-xl font-bold text-neon-cyan mb-2">AGENTE NIKOLA</h2>
                    <EducationalDisclaimer className="mb-4 text-left scale-90" />
                    <Button onClick={handleOpenYouTube} className="btn-neon-outline w-full gap-2"><Play size={18} /> VER VIDEO</Button>
                </div>

                <div className="flex items-center justify-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-neon-cyan tracking-tighter">NIKOLA</h1>
                    <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-full ${isMuted ? 'bg-destructive/50' : 'bg-primary/20'}`}>
                        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                </div>

                <div className="min-h-[80px] mb-6"><TikTokSubtitle text={NIKOLA_SUBTITLES} isPlaying={isPlaying} duration={20} /></div>
                <button onClick={handleSkip} className="text-muted-foreground text-xs hover:text-primary transition-colors uppercase tracking-widest">Saltar presentación →</button>
            </div>

            <YouTubePopup videoId={YOUTUBE_VIDEO_ID} isOpen={showYouTubePopup} onClose={() => setShowYouTubePopup(false)} showCTA={true} ctaText="¿Aplicar a la Tribu?" onCtaClick={handleApplyToTribe} />
            <TestModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} />
        </div>
    );

    const renderComplete = () => (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card-primary p-8 rounded-2xl max-w-md w-full text-center animate-scale-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-gradient flex items-center justify-center text-3xl">🚀</div>
                <h1 className="text-2xl font-bold text-neon-pink mb-4">¡Excelente!</h1>
                <p className="text-muted-foreground mb-8">Has conocido a nuestros agentes. Ahora verifica si cumples con los requisitos para unirte.</p>
                <Button onClick={() => setShowTestModal(true)} className="btn-neon-primary w-full gap-2 font-bold uppercase tracking-wider py-6">Aplicar Ahora <ArrowRight size={20} /></Button>
            </div>
            <TestModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} />
        </div>
    );

    if (stage === "albert-video") return renderAlbertVideo();
    if (stage === "nikola-video") return renderNikolaVideo();
    return renderComplete();
}
