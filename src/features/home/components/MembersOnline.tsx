"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";

const pioneerPhotos = [
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/hector-torres.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/mario-ramirez.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/mauricio%20munet.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/hector-barbosa.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/Patricia-florido-h.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/juan-turul.PNG",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/nidia-aguilar.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/angel-joel.webp",
    "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/carlos%20mendoza.webp",
];

export const MembersOnline = () => {
    return (
        <div className="glass-card p-6 rounded-2xl w-full max-w-md mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Link href="/contacto" className="block group">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex -space-x-3">
                        {pioneerPhotos.slice(0, 7).map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                alt={`Miembro ${i + 1}`}
                                className="w-10 h-10 rounded-full border-2 border-background object-cover avatar-neon-hover transition-all duration-300"
                                style={{ zIndex: pioneerPhotos.length - i }}
                            />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-primary bg-muted flex items-center justify-center text-xs font-semibold text-primary avatar-neon-hover transition-all duration-300">
                            +2
                        </div>
                    </div>
                </div>
                <p className="text-center text-sm text-white font-medium tracking-wider">
                    MIEMBROS EN LÍNEA
                </p>
            </Link>
        </div>
    );
};
