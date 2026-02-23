"use client";

import { GraduationCap, Bot, Users, Smartphone } from "lucide-react";

const benefitItems = [
    {
        icon: GraduationCap,
        text: "Fundamentos Sólidos",
        subtitle: "Comienza con nuestro módulo esencial de alfabetización digital y blockchain. Construye una base irrompible.",
        emoji: "📚",
        level: "Nivel 1"
    },
    {
        icon: Bot,
        text: "Automatiza tu Aprendizaje",
        subtitle: "Desbloquea asistentes de IA y flujos de trabajo que aceleran tu práctica en proyectos reales.",
        emoji: "🤖",
        level: "Nivel 2"
    },
    {
        icon: Users,
        text: "Red de Mentores de Élite",
        subtitle: "Conecta con empresarios exitosos. Resuelve desafíos, encuentra socios estratégicos y acelera tu camino al éxito.",
        emoji: "🤝",
        level: "Niveles 3+"
    },
    {
        icon: Smartphone,
        text: "Gestiona tu Trayecto",
        subtitle: "Visualiza tu progreso, gestiona recursos y mantén el rumbo desde tu panel de control.",
        emoji: "📱",
        level: "Dashboard"
    },
];

export const BenefitsSection = () => {
    return (
        <div className="w-full max-w-md mt-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-xl font-bold text-center mb-6 text-foreground">
                LO QUE <span className="text-primary">OBTIENES</span>
            </h2>
            <div className="space-y-4">
                {benefitItems.map((item, index) => (
                    <div
                        key={index}
                        className="glass-card p-4 rounded-xl hover:border-primary/50 transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">{item.emoji}</span>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-foreground font-semibold">
                                        {item.text}
                                    </p>
                                    <span className="text-xs text-primary/80 font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                                        {item.level}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
