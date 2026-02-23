"use client";

import { useState } from "react";
import LegalModal from "./LegalModal";
import { SocialLinks } from "./SocialLinks";
import { TERMS_CONTENT, DISCLAIMER_CONTENT, PRIVACY_CONTENT } from "@/shared/lib/legalContent";

const Footer = () => {
    const [activeModal, setActiveModal] = useState<"terms" | "disclaimer" | "privacy" | null>(null);

    return (
        <>
            <footer className="py-8 px-4 text-center space-y-6 pb-28 border-t border-border/30">
                <div className="space-y-4">
                    <p className="text-foreground/80 text-sm tracking-widest font-medium uppercase">
                        ACADEMIA LEGADO
                    </p>
                    <SocialLinks className="pt-2" />
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-foreground/70">
                    <button
                        onClick={() => setActiveModal("terms")}
                        className="hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-primary/30"
                    >
                        Términos y Condiciones
                    </button>
                    <span className="text-foreground/30">|</span>
                    <button
                        onClick={() => setActiveModal("disclaimer")}
                        className="hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-primary/30"
                    >
                        Disclaimer
                    </button>
                    <span className="text-foreground/30">|</span>
                    <button
                        onClick={() => setActiveModal("privacy")}
                        className="hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-primary/30"
                    >
                        Privacidad
                    </button>
                </div>

                <div className="max-w-md mx-auto pt-4 border-t border-border/20">
                    <p className="text-xs text-foreground/60 leading-relaxed">
                        Tribu Legado es una academia de formación tecnológica. Proporcionamos cursos sobre blockchain, inteligencia artificial y herramientas digitales. No somos una entidad financiera ni ofrecemos asesoramiento de inversión.
                    </p>
                </div>
            </footer>

            <LegalModal
                isOpen={activeModal === "terms"}
                onClose={() => setActiveModal(null)}
                title="Términos y Condiciones"
                content={TERMS_CONTENT}
            />

            <LegalModal
                isOpen={activeModal === "disclaimer"}
                onClose={() => setActiveModal(null)}
                title="Descargo de Responsabilidad"
                content={DISCLAIMER_CONTENT}
            />

            <LegalModal
                isOpen={activeModal === "privacy"}
                onClose={() => setActiveModal(null)}
                title="Política de Privacidad"
                content={PRIVACY_CONTENT}
            />
        </>
    );
};

export default Footer;
