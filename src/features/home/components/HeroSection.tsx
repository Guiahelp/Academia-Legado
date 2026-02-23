"use client";

import { Link } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const LOGO_URL = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/logo-tribu-legado.webp";

export const HeroSection = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="animate-fade-in">
                <img
                    src={LOGO_URL}
                    alt="Logo Tribu Legado"
                    className="w-32 h-32 object-contain mx-auto mb-8"
                    style={{
                        filter: 'drop-shadow(0 0 20px hsl(292 91% 61%)) drop-shadow(0 0 40px hsl(292 91% 61% / 0.6)) drop-shadow(0 0 60px hsl(292 91% 61% / 0.4))',
                    }}
                />
            </div>

            <div className="mb-8 animate-slide-up">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    <span className="text-foreground">Academia Legado: </span>
                    <span className="text-neon-pink">Formación para la Nueva Economía</span>
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Un ecosistema educativo donde <span className="text-secondary font-medium">Empresarios y Mentores</span> guían tu camino hacia el éxito digital mediante tecnología blindada.
                </p>
            </div>
        </div>
    );
};
