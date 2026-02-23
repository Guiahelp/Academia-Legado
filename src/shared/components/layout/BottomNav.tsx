"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Play, Map, GraduationCap, MessageCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const navItems = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/agentes", label: "Agentes", icon: Play },
    { path: "/guia", label: "Guía", icon: Map },
    { path: "/academia", label: "Academia", icon: GraduationCap },
    { path: "/contacto", label: "Contacto", icon: MessageCircle },
];

const BottomNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav className="bottom-nav active:scale-95 transition-transform duration-150">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={cn(
                                "bottom-nav-item relative flex-1",
                                isActive && "active"
                            )}
                        >
                            <Icon
                                size={22}
                                className={cn(
                                    "transition-colors duration-300",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-xs font-medium transition-colors duration-300",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
