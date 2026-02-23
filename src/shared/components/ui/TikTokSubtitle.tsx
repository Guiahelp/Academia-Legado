"use client";

import { useState, useEffect, useMemo } from "react";

interface TikTokSubtitleProps {
    text: string;
    isPlaying: boolean;
    duration?: number; // Duration in seconds for the full text
}

const TikTokSubtitle = ({ text, isPlaying, duration = 30 }: TikTokSubtitleProps) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    // Split text into chunks of ~8 words for TikTok-style display
    const chunks = useMemo(() => {
        const words = text.split(" ");
        const chunkSize = 8;
        const result: string[] = [];

        for (let i = 0; i < words.length; i += chunkSize) {
            result.push(words.slice(i, i + chunkSize).join(" "));
        }

        return result;
    }, [text]);

    const chunkDuration = useMemo(() => {
        return (duration * 1000) / (chunks.length || 1);
    }, [duration, chunks.length]);

    useEffect(() => {
        if (!isPlaying) {
            setCurrentIndex(0);
            setDisplayText(chunks[0] || "");
            return;
        }

        setDisplayText(chunks[0] || "");
        setCurrentIndex(0);

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + 1;
                if (next >= chunks.length) {
                    return prev; // Stay on last chunk
                }
                setDisplayText(chunks[next]);
                return next;
            });
        }, chunkDuration);

        return () => clearInterval(interval);
    }, [isPlaying, chunks, chunkDuration]);

    return (
        <div className="subtitle-tiktok w-full max-w-xs mx-auto">
            <p
                className="text-lg font-bold text-white text-center leading-relaxed drop-shadow-lg animate-fade-in"
                key={currentIndex}
                style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)'
                }}
            >
                {displayText}
            </p>
        </div>
    );
};

export default TikTokSubtitle;
