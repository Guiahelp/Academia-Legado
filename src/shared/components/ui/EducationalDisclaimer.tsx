"use client";

import { AlertTriangle } from "lucide-react";

const EducationalDisclaimer = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={`rounded-xl p-4 border ${className}`}
            style={{
                background: 'linear-gradient(135deg, hsl(45 100% 50% / 0.1), hsl(35 100% 45% / 0.05))',
                borderColor: 'hsl(45 100% 50% / 0.4)',
            }}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <AlertTriangle
                    size={24}
                    className="flex-shrink-0 mt-0.5 text-yellow-500"
                />
                <div>
                    <p className="text-sm leading-relaxed font-medium text-yellow-200/80">
                        ⚠️ MATERIAL CON FINES EDUCATIVOS: Este análisis es un caso de estudio sobre protocolos de economía descentralizada. No constituye asesoramiento financiero ni promesa de rendimientos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EducationalDisclaimer;
