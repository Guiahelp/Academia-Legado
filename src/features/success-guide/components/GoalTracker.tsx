'use client'

import { useState } from 'react'
import { Calendar, Target, Trophy, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import type { Goal } from '../types'

interface GoalTrackerProps {
    goals: Goal[]
    isLoading: boolean
}

export function GoalTracker({ goals, isLoading }: GoalTrackerProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'financial': return <Trophy className="text-yellow-500" size={18} />
            case 'team': return <Target className="text-blue-500" size={18} />
            case 'personal': return <Calendar className="text-purple-500" size={18} />
            default: return <Target size={18} />
        }
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'financial': return 'Financiera'
            case 'team': return 'Equipo'
            case 'personal': return 'Personal'
            default: return category
        }
    }

    return (
        <Card className="p-6 bg-card/50 backdrop-blur-xl border-white/10 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Mis Hitos</h3>
                    <p className="text-white/60 text-sm">Define y alcanza tus conquistas empresariales.</p>
                </div>
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white">
                    <Plus size={18} />
                </Button>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    [...Array(2)].map((_, i) => (
                        <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
                    ))
                ) : goals.length === 0 ? (
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-white/40">No hay metas definidas.</p>
                    </div>
                ) : (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10">
                                        {getCategoryIcon(goal.category)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                                            {goal.title}
                                        </h4>
                                        <p className="text-xs text-white/40 mt-1">
                                            {getCategoryLabel(goal.category)} • {new Date(goal.target_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${goal.is_completed
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-white/5 border-white/20 text-transparent group-hover:border-primary'
                                    }`}>
                                    {goal.is_completed && <ChevronRight size={14} className="rotate-90" />}
                                </div>
                            </div>

                            {/* Progreso simple (visual) */}
                            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r from-primary to-secondary transition-all ${goal.is_completed ? 'w-full' : 'w-1/3'}`}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    )
}
