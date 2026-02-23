"use client";

import { MessageSquare, Mic, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface Props {
    agent: "Nikola" | "Albert";
    onContact?: () => void;
}

export function AIAgentSupport({ agent, onContact }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const agentData = {
        Nikola: {
            role: "Maestro de Tecnología y Redes",
            color: "text-secondary",
            borderColor: "border-secondary/30",
            glow: "shadow-[0_0_15px_rgba(0,242,255,0.3)]",
            description: "Experto en Smart Contracts, duplicación y operativa técnica.",
            telegram: "https://t.me/nikolalegadobot"
        },
        Albert: {
            role: "Estratega de Marketing e IA",
            color: "text-primary",
            borderColor: "border-primary/30",
            glow: "shadow-[0_0_15px_rgba(217,70,239,0.3)]",
            description: "Especialista en creación de contenido y automatización de red.",
            telegram: "https://t.me/albertlegadobot"
        }
    };

    const current = agentData[agent];

    return (
        <div className={`glass-card p-4 rounded-2xl border ${current.borderColor} ${current.glow} mb-4 transition-all hover:scale-[1.01]`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-black/40 flex items-center justify-center border ${current.borderColor}`}>
                    <span className="text-2xl">{agent === "Nikola" ? "⚡" : "🧬"}</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className={`font-bold uppercase tracking-widest text-sm ${current.color}`}>{agent}</h4>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-400 font-bold uppercase tracking-tighter">Asesor Activo</span>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{current.role}</p>
                </div>
            </div>

            <p className="text-xs text-gray-400 my-3 leading-relaxed">
                {current.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                    href={`${current.telegram}?start=help`}
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[10px] font-bold uppercase tracking-widest"
                >
                    <Mic size={14} /> Consultar Voz
                </a>
                <a
                    href={`${current.telegram}?start=chat`}
                    target="_blank"
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border ${current.borderColor} hover:bg-white/5 transition-colors text-[10px] font-bold uppercase tracking-widest text-white`}
                >
                    <MessageSquare size={14} /> Chat Directo
                </a>
            </div>
        </div>
    );
}
