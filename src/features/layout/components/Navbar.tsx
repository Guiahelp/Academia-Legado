'use client'

import Link from 'next/link'
import { useAuth } from '@/features/auth/contexts/AuthContext'
import { LogOut, User as UserIcon } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
    const { user, profile, signOut } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        window.location.href = '/'
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo or Brand */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight bg-neon-gradient bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
                            Tribu Legado
                        </span>
                    </Link>
                </div>

                {/* User Profile / Actions */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 rounded-full border border-border/50 p-1 pr-3 transition-colors hover:bg-white/5"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    {profile?.foto_perfil_url ? (
                                        <img
                                            src={profile.foto_perfil_url}
                                            alt="Avatar"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon size={16} />
                                    )}
                                </div>
                                <span className="text-sm font-medium hidden sm:block">
                                    {profile?.nombre || 'Emprendedor'}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border/50 bg-popover p-2 shadow-glass animate-in fade-in slide-in-from-top-2">
                                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground border-b border-border/50 mb-1">
                                        {profile?.email || user.email}
                                    </div>
                                    <Link
                                        href="/cuenta"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-white/10"
                                    >
                                        Mi Cuenta
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                                    >
                                        <LogOut size={16} />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                            >
                                Ingresar
                            </Link>
                            <Link
                                href="/signup"
                                className="relative inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:scale-105"
                                style={{ background: 'var(--gradient-neon)' }}
                            >
                                Comenzar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
