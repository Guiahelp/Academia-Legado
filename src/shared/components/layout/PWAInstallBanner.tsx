"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

export function PWAInstallBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Verificar si ya está instalada
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        if (isStandalone) {
            setShowBanner(false);
            return;
        }

        // Escuchar el evento de instalación para Android/Chrome
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        });

        // Mostrar banner para iOS si no está instalada (basado en tiempo de sesión o visita)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        if (isIOS && !isStandalone) {
            const shown = localStorage.getItem('pwa_banner_shown');
            if (!shown) {
                setShowBanner(true);
            }
        }
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowBanner(false);
            }
            setDeferredPrompt(null);
        } else {
            // Instrucción para iOS
            alert("Para instalar: Toca el botón 'Compartir' ↓ y luego 'Añadir a la pantalla de inicio' ➕");
            localStorage.setItem('pwa_banner_shown', 'true');
            setShowBanner(false);
        }
    };

    if (!showBanner) return null;

    return (
        <div className="fixed top-2 left-0 right-0 z-[100] px-4 animate-slide-down">
            <div className="glass-card-primary p-4 rounded-2xl flex items-center justify-between gap-4 shadow-2xl border-primary/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-neon-primary">
                        <Download className="text-white" size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white">Instalar Academia</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Acceso rápido desde tu móvil</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleInstall}
                        className="btn-neon-primary py-2 px-4 rounded-lg text-[10px] uppercase font-bold tracking-widest"
                    >
                        Instalar
                    </button>
                    <button
                        onClick={() => setShowBanner(false)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}
