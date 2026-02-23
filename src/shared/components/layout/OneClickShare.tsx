"use client";

import { MessageCircle, Share2 } from "lucide-react";

interface Props {
    message?: string;
    url?: string;
    className?: string;
}

export const OneClickShare = ({
    message = "Hola! Encontré un sistema basado en contratos inteligentes (web3) enfocado en libertad financiera. Te comparto el acceso a la Academia Legado para que le eches un vistazo:",
    url = "https://tribulegado.com",
    className = ""
}: Props) => {
    const handleShare = () => {
        const text = encodeURIComponent(`${message}\n\n${url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <button
            onClick={handleShare}
            className={`w-full relative group active:scale-[0.98] transition-all duration-300 ${className}`}
        >
            {/* Glow effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500" />

            <div className="relative h-20 bg-black/40 border border-green-500/30 hover:border-green-500/80 rounded-3xl flex items-center justify-center gap-4 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:bg-black/60 overflow-hidden isolate">
                {/* Internal Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 relative z-10">
                    <MessageCircle size={24} className="text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-left relative z-10">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-green-400 transition-colors">Compartir Plan</h3>
                    <p className="text-xs text-green-400/80 uppercase tracking-widest flex items-center gap-1">
                        <Share2 size={10} /> Enviar invitación por WhatsApp
                    </p>
                </div>
            </div>
        </button>
    );
};
