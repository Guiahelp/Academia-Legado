"use client";

import { Lock, Check, ChevronDown, ChevronUp, Play, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { LevelQuizModal } from "./LevelQuizModal";

interface VideoItem {
    id: string;
    title: string;
    subtitle?: string;
    duration: string;
    icon: React.ReactNode;
    videoId?: string;
    comingSoon?: boolean;
}

interface LevelCardProps {
    levelNumber: number;
    title: string;
    subtitle: string;
    emoji: string;
    videos: VideoItem[];
    isUnlocked: boolean;
    isCompleted: boolean;
    completedVideos: Set<string>;
    onVideoClick: (video: VideoItem) => void;
    onCompleteLevel: () => void;
    allVideosCompleted: boolean;
    onLockedClick?: () => void;
}

const LevelCard = ({
    levelNumber,
    title,
    subtitle,
    emoji,
    videos,
    isUnlocked,
    isCompleted,
    completedVideos,
    onVideoClick,
    onCompleteLevel,
    allVideosCompleted,
    onLockedClick,
}: LevelCardProps) => {
    const [isExpanded, setIsExpanded] = useState(levelNumber === 0 || (isUnlocked && !isCompleted));
    const [showQuiz, setShowQuiz] = useState(false);

    const completedCount = videos.filter(v => completedVideos.has(v.id) || v.comingSoon).length;
    const progress = (completedCount / videos.length) * 100;

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full glass-card p-4 rounded-xl flex items-center gap-4 hover:scale-[1.01] transition-all border-2"
                style={{
                    borderColor: isCompleted || levelNumber === 0 ? 'hsl(110 100% 54% / 0.3)' : 'hsl(292 91% 61% / 0.3)',
                    boxShadow: isCompleted || levelNumber === 0 ? '0 0 15px hsl(110 100% 54% / 0.1)' : '0 0 15px hsl(292 91% 61% / 0.1)'
                }}
            >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                    {emoji}
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Nivel {levelNumber}</p>
                    <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!isUnlocked && levelNumber > 0 && <Lock size={14} className="text-yellow-500" />}
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {isUnlocked && (
                <div className="h-1 w-full bg-white/5 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-accent shadow-neon-accent transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            )}

            {isExpanded && (
                <div className="mt-4 space-y-3 animate-fade-in px-2">
                    {videos.map((video) => {
                        const isVideoCompleted = completedVideos.has(video.id);
                        return (
                            <div
                                key={video.id}
                                onClick={() => {
                                    if (!isUnlocked && onLockedClick) onLockedClick();
                                    else if (!video.comingSoon) onVideoClick(video);
                                }}
                                className={`glass-card p-4 rounded-xl flex items-start gap-3 transition-all cursor-pointer border ${video.comingSoon ? 'opacity-50 grayscale' : 'hover:border-primary/50'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isVideoCompleted ? 'bg-accent/20' : 'bg-white/5'}`}>
                                    {isVideoCompleted ? <Check size={20} className="text-accent" /> : video.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm mb-0.5">{video.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{video.subtitle}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] text-muted-foreground">{video.duration}</span>
                                        {video.comingSoon && <span className="text-[10px] text-primary font-bold">PRÓXIMAMENTE</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {!isCompleted && allVideosCompleted && isUnlocked && (
                        <Button
                            onClick={() => setShowQuiz(true)}
                            className="w-full mt-4 h-12 bg-accent/20 hover:bg-accent/40 text-accent font-bold uppercase tracking-widest border border-accent/50 shadow-[0_0_15px_rgba(41,232,255,0.2)]"
                        >
                            <BookOpenCheck className="mr-2" size={18} /> Validar Conocimiento
                        </Button>
                    )}
                </div>
            )}

            {/* Modal de Validación Estricta */}
            {allVideosCompleted && !isCompleted && isUnlocked && (
                <LevelQuizModal
                    isOpen={showQuiz}
                    levelNumber={levelNumber}
                    levelTitle={title}
                    onClose={() => setShowQuiz(false)}
                    onSuccess={() => {
                        setShowQuiz(false);
                        onCompleteLevel(); // Solo desbloquea si el modal llama a success
                    }}
                />
            )}
        </div>
    );
};

export default LevelCard;
