'use client'

import { useState } from 'react'
import { Search, Filter, Phone, MessageSquare, Mic, Bot, Send } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import type { Prospect } from '../types'

interface ProspectListProps {
    prospects: Prospect[]
    isLoading: boolean
}

export function ProspectList({ prospects, isLoading }: ProspectListProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProspects = prospects.filter(p =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'followed_up': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            case 'closed': return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20'
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'contacted': return 'Contacto Inicial'
            case 'followed_up': return 'Seguimiento'
            case 'closed': return 'Equipo'
            case 'rejected': return 'En Pausa'
            default: return status
        }
    }

    const openTelegramBot = () => {
        // Redirección al bot provisto por el usuario
        window.open('https://t.me/TribuLegado_bot', '_blank')
    }

    return (
        <Card className="p-4 md:p-6 bg-[#0a0f1c] backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <UsersIcon />
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Centro de Operaciones</h3>
                    </div>
                    <p className="text-white/50 text-xs uppercase tracking-widest">Base de prospectos y equipo</p>
                </div>

                {/* Voice Action Primary Button - Highly Visual */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <Button
                        onClick={openTelegramBot}
                        className="relative w-full bg-[#0a0f1c] border border-primary/50 hover:bg-[#0a0f1c] hover:border-primary text-white font-bold h-16 rounded-2xl shadow-[0_0_20px_rgba(255,211,0,0.1)] transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
                    >
                        <div className="bg-primary/20 rounded-full p-2 relative">
                            <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping"></div>
                            <Mic size={24} className="text-primary relative z-10" />
                        </div>
                        <span className="text-base tracking-wide uppercase">Cargar Audio a Telegram</span>
                    </Button>
                </div>
            </div>

            <div className="relative z-10 flex gap-2 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar prospectos..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="ghost" className="border border-white/10 bg-white/5 hover:bg-white/10 gap-2 shrink-0">
                    <Bot size={18} className="text-secondary" />
                    <span className="hidden sm:inline">Asistente IA</span>
                </Button>
            </div>

            <div className="relative z-10 space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
                    ))
                ) : filteredProspects.length === 0 ? (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
                        <Mic className="text-white/20" size={32} />
                        <p className="text-white/40 text-sm">Tu base de datos está vacía.<br />Usa el comando de voz para agregar uno.</p>
                    </div>
                ) : (
                    filteredProspects.map((prospect) => (
                        <div
                            key={prospect.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group gap-4 relative overflow-hidden"
                            style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)' }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-white font-bold border border-white/10 relative shadow-inner">
                                    {prospect.full_name.charAt(0)}
                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f1c] ${getStatusColor(prospect.status).split(' ')[0]}`} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white/90 group-hover:text-white transition-colors text-sm sm:text-base">
                                        {prospect.full_name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${getStatusColor(prospect.status)}`}>
                                            {getStatusLabel(prospect.status)}
                                        </span>
                                        <span className="text-xs text-white/40">{prospect.phone || 'Pendiente'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end sm:self-auto w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-0 justify-end">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-full">
                                    <Phone size={14} />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-full">
                                    <MessageSquare size={14} />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/40 hover:text-primary hover:bg-primary/10 rounded-full">
                                    <Send size={14} />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    )
}

function UsersIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
}
