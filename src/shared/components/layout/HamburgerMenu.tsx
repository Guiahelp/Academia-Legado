"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { SocialLinks } from './SocialLinks';
import {
    Home, Play, Map, GraduationCap, MessageCircle,
    Users, User, LogIn, Menu, X, Shield
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);
    const { user, profile, isAdmin, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { path: '/', label: 'Inicio', icon: Home },
        { path: '/agentes', label: 'Agentes IA', icon: Play },
        { path: '/guia', label: 'Guía de Éxito', icon: Map },
        { path: '/academia', label: 'Academia', icon: GraduationCap },
        { path: '/mi-equipo', label: 'Mi Equipo', icon: Users, requireAuth: true },
        { path: '/mi-cuenta', label: 'Mi Cuenta', icon: User, requireAuth: true },
        { path: '/contacto', label: 'Contacto', icon: MessageCircle },
    ];

    const visibleItems = navItems.filter(item => {
        if (item.requireAuth && !user) return false;
        return true;
    });

    const handleNavigate = (path: string) => {
        router.push(path);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed top-4 right-4 z-50 w-10 h-10 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
                aria-label="Abrir menú"
            >
                <Menu size={20} className="text-foreground" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-72 bg-background border-l border-white/10 z-[70] transition-transform duration-300 ease-out flex flex-col",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <button
                        onClick={() => handleNavigate('/')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-black/50 border border-white/10">
                            <img
                                src="https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/logo-tribu-legado.webp"
                                alt="Logo Tribu Legado"
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm tracking-tight">Tribu Legado</p>
                        </div>
                    </button>
                    <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {visibleItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <li key={item.path}>
                                    <button
                                        onClick={() => handleNavigate(item.path)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                            active
                                                ? "bg-primary/20 text-primary"
                                                : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                        )}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-white/10 space-y-6">
                    <div className="space-y-3">
                        <p className="text-[10px] text-center font-bold tracking-widest text-muted-foreground uppercase opacity-50">
                            Síguenos
                        </p>
                        <SocialLinks className="gap-3" />
                    </div>

                    {user ? (
                        <button
                            onClick={() => { signOut(); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                        >
                            <LogIn size={18} />
                            Cerrar Sesión
                        </button>
                    ) : (
                        <button
                            onClick={() => handleNavigate('/auth')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-all"
                        >
                            <LogIn size={18} />
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
