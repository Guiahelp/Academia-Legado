"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

const NOTEBOOK_IMAGE = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/notebook.webp";
const NOTEBOOK_LINK = "https://notebooklm.google.com/notebook/3203dd5e-652f-4743-9b1d-98f17a8e8603";

const NotebookResource = () => {
    return (
        <div className="mt-8 mb-6">
            <a
                href={NOTEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
            >
                <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
                    style={{ border: '2px solid hsl(183 100% 50% / 0.3)', boxShadow: '0 0 20px hsl(183 100% 50% / 0.1)' }}
                >
                    <div className="relative aspect-video">
                        <Image
                            src={NOTEBOOK_IMAGE}
                            alt="Análisis Profundo - NotebookLM"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(183 100% 50% / 0.2) 100%)' }}
                        >
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{ background: 'hsl(0 0% 0% / 0.8)', border: '1px solid hsl(183 100% 50% / 0.5)' }}
                            >
                                <ExternalLink size={16} className="text-secondary" />
                                <span className="text-secondary font-medium text-sm">Abrir Análisis</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">
                    📚 Toca para abrir el Análisis Profundo con IA
                </p>
            </a>
        </div>
    );
};

export default NotebookResource;
