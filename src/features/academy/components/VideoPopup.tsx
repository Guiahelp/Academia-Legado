"use client";

import { X, Volume2, VolumeX, Check, RefreshCw, Loader2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";

interface VideoPopupProps {
  videoId: string;
  title: string;
  onClose: () => void;
  onComplete: () => void;
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

const VideoPopup = ({ videoId, title, onClose, onComplete }: VideoPopupProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const cleanVideoId = extractVideoId(videoId);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [videoId]);

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
    if (!isLoading) return;
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 15000);
    return () => clearTimeout(timeout);
  }, [isLoading, retryCount]);

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const videoUrl = `https://www.youtube-nocookie.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${isMuted ? '&mute=1' : ''}`;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start p-4 pt-8 bg-black/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-sm flex items-center justify-between mb-4">
        <button onClick={() => setIsMuted(!isMuted)} className="p-3 rounded-full bg-white/5 border border-white/10">
          {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
        </button>
        <h3 className="text-base font-bold text-primary flex-1 text-center px-2 line-clamp-1">{title}</h3>
        <button onClick={onClose} className="p-3 rounded-full bg-white/5 border border-white/10"><X size={28} className="text-white" /></button>
      </div>

      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-muted/20" style={{ aspectRatio: '9/16', maxHeight: '60vh' }}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
            <Loader2 size={48} className="text-primary animate-spin mb-4" />
            <p className="text-sm text-gray-400">Cargando...</p>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 p-6">
            <p className="text-sm text-gray-400 mb-4 text-center">Error al cargar.</p>
            <Button onClick={handleRetry} variant="outline"><RefreshCw size={18} /> Reintentar</Button>
          </div>
        )}
        <iframe
          key={`${cleanVideoId}-${retryCount}`}
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={handleIframeLoad}
        />
      </div>

      <Button onClick={handleComplete} className="btn-neon-accent w-full max-w-sm mt-6 gap-2">
        <Check size={20} />
        <span>Completar</span>
      </Button>
    </div>
  );
};

export default VideoPopup;
