'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Save, Share2, Presentation, Users, GraduationCap } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import type { DailyHabit } from '../types'

interface DailyChecklistProps {
    habit: DailyHabit | null
    isLoading: boolean
    onSave: (habitData: any) => void
}

export function DailyChecklist({ habit, isLoading, onSave }: DailyChecklistProps) {
    const [formData, setFormData] = useState({
        shared_content: habit?.shared_content || false,
        presentation_given: habit?.presentation_given || false,
        follow_up_made: habit?.follow_up_made || false,
        training_attended: habit?.training_attended || false,
        notes: habit?.notes || ''
    })

    const toggleHabit = (key: keyof typeof formData) => {
        if (typeof formData[key] === 'boolean') {
            setFormData(prev => ({ ...prev, [key]: !prev[key] }))
        }
    }

    const items = [
        { key: 'shared_content', label: 'Compartir Contenido', icon: <Share2 size={20} />, description: 'Publicaste en redes sociales hoy' },
        { key: 'presentation_given', label: 'Dar Presentación', icon: <Presentation size={20} />, description: 'Presentaste el sistema a un prospecto' },
        { key: 'follow_up_made', label: 'Hacer Seguimiento', icon: <Users size={20} />, description: 'Llamaste o chateaste con prospectos' },
        { key: 'training_attended', label: 'Capacitación', icon: <GraduationCap size={20} />, description: 'Asististe a un Zoom o viste un video academy' },
    ] as const

    return (
        <Card className="p-6 bg-card/50 backdrop-blur-xl border-white/10 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Ritual de Éxito</h3>
                    <p className="text-white/60 text-sm">La disciplina operativa crea el legado.</p>
                </div>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20 font-medium">
                    {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
                </span>
            </div>

            <div className="space-y-3 mb-6">
                {items.map((item) => {
                    const isChecked = formData[item.key as keyof typeof formData] as boolean
                    return (
                        <div
                            key={item.key}
                            onClick={() => toggleHabit(item.key)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${isChecked
                                ? 'border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(217,70,239,0.1)]'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className={`p-2.5 rounded-xl border ${isChecked ? 'bg-primary border-primary/20 text-white' : 'bg-white/5 border-white/10 text-white/40'
                                }`}>
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-semibold text-sm ${isChecked ? 'text-white' : 'text-white/80'}`}>
                                    {item.label}
                                </h4>
                                <p className="text-[10px] text-white/40 mt-0.5">{item.description}</p>
                            </div>
                            <div className={isChecked ? 'text-primary' : 'text-white/20'}>
                                {isChecked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="space-y-3">
                <textarea
                    placeholder="Notas del día..."
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white gap-2 h-11 rounded-xl shadow-lg shadow-primary/20"
                    onClick={() => onSave(formData)}
                >
                    <Save size={18} />
                    Guardar Progreso
                </Button>
            </div>
        </Card>
    )
}
