"use client";

import { Instagram, Youtube, Facebook, Video } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SocialLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
    className?: string;
}

const SocialLink = ({ href, icon: Icon, label, className }: SocialLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
            "group relative p-3 rounded-full transition-all duration-300",
            "bg-card/40 border border-border/50 backdrop-blur-sm",
            "hover:border-primary/50 hover:bg-primary/5 hover:scale-110 hover:-translate-y-1",
            "active:scale-95",
            className
        )}
    >
        <Icon
            size={24}
            className="text-foreground/70 group-hover:text-primary transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]"
        />
        {/* Neon Glow under icon on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-primary/20 blur-xl transition-opacity duration-300 -z-10" />
    </a>
);

export const SocialLinks = ({ className }: { className?: string }) => {
    const socials = [
        {
            href: "https://www.instagram.com/tribulegado/",
            icon: Instagram,
            label: "Instagram",
        },
        {
            href: "https://www.tiktok.com/@tribulegadoia",
            icon: Video, // Using Video for TikTok as representatively as possible with Lucide
            label: "TikTok",
        },
        {
            href: "https://www.youtube.com/@TribuLegado",
            icon: Youtube,
            label: "YouTube",
        },
        {
            href: "https://www.facebook.com/share/1AUqRtBwvX/",
            icon: Facebook,
            label: "Facebook",
        },
    ];

    return (
        <div className={cn("flex items-center justify-center gap-4", className)}>
            {socials.map((social) => (
                <SocialLink key={social.label} {...social} />
            ))}
        </div>
    );
};
