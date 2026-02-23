import Link from "next/link";
import { BookOpen, Link as LinkIcon } from "lucide-react";
import { HeroSection } from "@/features/home/components/HeroSection";
import { MembersOnline } from "@/features/home/components/MembersOnline";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { BenefitsSection } from "@/features/home/components/BenefitsSection";
import { SocialLinks } from "@/shared/components/layout/SocialLinks";

export default function HomePage() {
    return (
        <div className="min-h-screen px-4 py-8 pb-36 flex flex-col items-center">
            {/* Hero Section */}
            <HeroSection />

            {/* Members Online Section */}
            <MembersOnline />

            {/* Secondary CTA - Explorar Academia */}
            <div className="w-full max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Link href="/academia" className="block">
                    <button className="btn-neon-outline w-full flex items-center justify-center gap-3">
                        <BookOpen size={20} />
                        <span className="font-bold tracking-wide">EXPLORAR ACADEMIA</span>
                    </button>
                </Link>
            </div>

            {/* CÓMO FUNCIONA Section */}
            <HowItWorks />

            {/* LO QUE OBTIENES Section */}
            <BenefitsSection />

            {/* Platform Badge */}
            <div className="mt-12 animate-fade-in w-full max-w-md px-4" style={{ animationDelay: "0.5s" }}>
                <div className="glass-card p-6 border-primary/20 bg-primary/5 space-y-4 mb-8">
                    <p className="text-center font-bold tracking-widest text-primary text-xs uppercase">
                        ÚNETE A NUESTRA COMUNIDAD
                    </p>
                    <SocialLinks className="gap-6" />
                </div>

                <p className="text-center text-muted-foreground/60 text-sm tracking-widest">
                    ACADEMIA DE ÉLITE DIGITAL
                </p>
            </div>

            {/* Sticky CTA Button */}
            <div className="fixed bottom-20 left-0 right-0 z-40 px-4">
                <div className="max-w-md mx-auto">
                    <Link href="/agentes" className="block">
                        <button className="btn-neon-primary w-full flex items-center justify-center gap-3 shadow-2xl">
                            <LinkIcon size={20} />
                            <span className="font-bold tracking-wide">INICIAR VIAJE LEGADO</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
