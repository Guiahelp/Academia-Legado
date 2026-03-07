'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, User, Flame } from 'lucide-react'
import { useAuth } from '@/features/auth/contexts/AuthContext'

const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/academia', label: 'Academia', icon: BookOpen },
    { href: '/guia', label: 'Guía del Éxito', icon: Flame },
    { href: '/cuenta', label: 'Mi Cuenta', icon: User },
]

export function Sidebar() {
    const pathname = usePathname()
    const { user } = useAuth()

    if (!user) return null // Hide sidebar for guests

    return (
        <aside className="hidden md:flex w-64 flex-col gap-4 border-r border-border/50 bg-card/30 p-4 min-h-[calc(100vh-4rem)]">
            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/'
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all
                ${isActive
                                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_15px_rgba(217,70,239,0.1)]'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }
              `}
                        >
                            <Icon size={20} className={isActive ? 'text-neon-primary drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : ''} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Futuristic Progress Snippet or Status */}
            <div className="mt-auto mb-4 p-4 rounded-xl border border-secondary/20 bg-secondary/5 hidden lg:block">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Estado Neural</h4>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#39FF14]" />
                    <span className="text-sm font-semibold text-accent drop-shadow-[0_0_4px_rgba(57,255,20,0.5)]">Sincronizado</span>
                </div>
            </div>
        </aside>
    )
}
