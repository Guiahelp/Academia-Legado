'use client';

import React, { useEffect, useState } from 'react';
import { getAuthUserId, getCourses, getUserProgress } from '../services/courseService';

export function ProgressDashboard() {
    const [percentage, setPercentage] = useState(0);
    const [stats, setStats] = useState({ total: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const [hasSession, setHasSession] = useState(true);

    useEffect(() => {
        async function loadProgress() {
            try {
                const userId = await getAuthUserId();
                if (!userId) {
                    setHasSession(false);
                    setLoading(false);
                    return;
                }

                const [courses, progress] = await Promise.all([
                    getCourses(),
                    getUserProgress(userId)
                ]);

                const totalCourses = courses.length;
                const completedCourses = progress.filter(p => p.status === 'completed').length;
                
                setStats({ total: totalCourses, completed: completedCourses });
                setPercentage(totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        
        loadProgress();
    }, []);

    if (!hasSession && !loading) {
        return null; // Visitantes sin sesión simplemente no ven el dashboard de progreso
    }

    if (loading) return null;

    return (
        <div className="glass-card p-6 rounded-2xl mb-8 border border-secondary/20 shadow-neon-secondary flex flex-col md:flex-row items-center gap-6 animate-slide-up">
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                {/* Neon Circular Progress placeholder effect */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" className="stroke-muted/30" strokeWidth="6" />
                    <circle cx="48" cy="48" r="40" fill="none" className="stroke-secondary drop-shadow-[0_0_8px_#39FF14] transition-all duration-1000 ease-in-out" strokeWidth="8" strokeDasharray="251" strokeDashoffset={251 - (251 * percentage) / 100} strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-secondary drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">{percentage}%</span>
                </div>
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground tracking-tight uppercase">Base de Datos <span className="text-transparent bg-clip-text bg-neon-gradient">Sincronizada</span></h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">Tu nivel de maestría actual avalado por el algoritmo en tiempo real. Has completado <strong className="text-foreground">{stats.completed}</strong> de <strong className="text-foreground">{stats.total}</strong> módulos de inmersión.</p>
            </div>
        </div>
    );
}
