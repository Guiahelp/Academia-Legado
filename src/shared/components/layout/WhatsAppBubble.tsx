"use client";

import { MessageCircle } from "lucide-react";
import { useAuth } from "@/features/auth/contexts/AuthContext";

/**
 * La burbuja de WhatsApp desaparece cuando el miembro ya tiene cuenta.
 */
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/IKZt3Nm3y6o1dBnFPt0LCf";

const WhatsAppBubble = () => {
    const { user, profile } = useAuth();
    const isLoading = false; // El hook useAuth ya maneja la carga del perfil

    if (user || profile) {
        return null;
    }

    const handleClick = () => {
        window.open(WHATSAPP_GROUP_URL, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed right-4 bottom-28 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
            style={{
                backgroundColor: '#25D366',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
            }}
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={28} className="text-white" fill="white" />
        </button>
    );
};

export default WhatsAppBubble;
