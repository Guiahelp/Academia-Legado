"use client";

import { X, Volume2, VolumeX, RefreshCw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

interface YouTubePopupProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
    showCTA?: boolean;
    ctaText?: string;
    ctaRedirect?: string;
    onCtaClick?: () => void;
}

const extractVideoId = (input: string): string => {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match) return match[1];
    }
    return input;
};

const YouTubePopup = ({
    videoId,
    isOpen,
    onClose,
    showCTA = false,
    ctaText = "Continuar",
    ctaRedirect = "/academia",
    onCtaClick
}: YouTubePopupProps) => {
    const router = useRouter();
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const cleanVideoId = extractVideoId(videoId);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            setHasError(false);
        }
    }, [isOpen, videoId]);

    const handleIframeLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const handleRetry = useCallback(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
        setHasError(false);
    }, []);

    useEffect(() => {
        if (!isOpen || !isLoading) return;
        const timeout = setTimeout(() => {
            if (isLoading) {
                setHasError(true);
                setIsLoading(false);
            }
        }, 15000);
        return () => clearTimeout(timeout);
    }, [isOpen, isLoading, retryCount]);

    if (!isOpen) return null;

    const handleCTA = () => {
        if (onCtaClick) {
            onCtaClick();
        } else {
            onClose();
            router.push(ctaRedirect);
        }
    };

    const videoUrl = `https://www.youtube-nocookie.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${isMuted ? '&mute=1' : ''}&key=${retryCount}`;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start p-4 pt-8 bg-black/95 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="w-full max-w-sm flex items-center justify-between mb-4">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full hover:bg-white/10 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
                </button>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full hover:bg-destructive/50 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    <X size={28} className="text-white" />
                </button>
            </div>

            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-muted/20" style={{ aspectRatio: '9/16', maxHeight: '60vh' }}>
                {isLoading && !hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
                        <Loader2 size={48} className="text-primary animate-spin mb-4" />
                        <p className="text-sm text-gray-400">Cargando video...</p>
                    </div>
                )}

                {hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 p-6">
                        <p className="text-sm text-gray-400 mb-4 text-center">Error al cargar el video.</p>
                        <button onClick={handleRetry} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white">
                            <RefreshCw size={18} />
                            <span>Reintentar</span>
                        </button>
                    </div>
                )}

                <iframe
                    key={`${cleanVideoId}-${retryCount}`}
                    src={videoUrl}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    onLoad={handleIframeLoad}
                />
            </div>

            {showCTA && (
                <button
                    onClick={handleCTA}
                    className="btn-neon-primary w-full max-w-sm mt-6 flex items-center justify-center gap-2"
                >
                    <span>{ctaText}</span>
                </button>
            )}
        </div>
    );
};

export default YouTubePopup;
