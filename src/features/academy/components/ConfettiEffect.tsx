"use client";

import { useEffect, useState } from "react";

interface ConfettiEffectProps {
    isActive: boolean;
    onComplete?: () => void;
}

const ConfettiEffect = ({ isActive, onComplete }: ConfettiEffectProps) => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        delay: number;
        color: string;
        size: number;
    }>>([]);

    useEffect(() => {
        if (isActive) {
            const colors = [
                'hsl(292 91% 61%)', // Primary pink
                'hsl(183 100% 50%)', // Secondary cyan
                'hsl(110 100% 54%)', // Accent green
                'hsl(45 100% 50%)',  // Gold
            ];

            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
            }));

            setParticles(newParticles);

            const timer = setTimeout(() => {
                setParticles([]);
                onComplete?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    if (!isActive || particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute animate-confetti"
                    style={{
                        left: `${particle.x}%`,
                        top: '-20px',
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animationDelay: `${particle.delay}s`,
                        boxShadow: `0 0 10px ${particle.color}`,
                    }}
                />
            ))}
            <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall 3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ConfettiEffect;
