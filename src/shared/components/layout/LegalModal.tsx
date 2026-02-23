"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

const LegalModal = ({ isOpen, onClose, title, content }: LegalModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div
                className="glass-card max-w-lg w-full max-h-[80vh] overflow-hidden animate-scale-in border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-primary">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    <div className="prose prose-invert prose-sm max-w-none">
                        {content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="btn-neon-primary w-full text-sm py-3 font-bold"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
