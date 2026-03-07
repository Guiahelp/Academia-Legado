import React from 'react';
import { getCourseWithLessons } from '../services/courseService';
import Link from 'next/link';
import { Volume2, X, Check, RotateCcw, Bot } from 'lucide-react';

interface CoursePlayerProps {
    courseId: string;
}

export async function CoursePlayer({ courseId }: CoursePlayerProps) {
    const data = await getCourseWithLessons(courseId);

    if (!data || !data.course) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-12 text-center text-red-500 bg-black">
                <span className="text-4xl mb-4">⚠️</span>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">Contenido no encontrado</h2>
                <p className="text-zinc-500 text-sm">El curso que intentas cargar no existe o hubo un error al obtenerlo.</p>
            </div>
        );
    }

    const { course, lessons } = data;
    // Seleccionar la primera lección por defecto para el demo
    const currentLesson = lessons[0] || { title: "Cargando..." };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 md:p-8 animate-in fade-in duration-500">
            {/* Top Navigation Bar - Exact layout from screenshot */}
            <div className="w-full max-w-5xl flex items-center justify-center relative mt-2 md:mt-4">
                <button className="absolute left-0 lg:left-12 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <h2 className="text-[#f43f5e] md:text-fuchsia-500 font-bold text-base md:text-xl text-center px-16 truncate max-w-[80%] drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                    {currentLesson.title.length > 35 ? currentLesson.title.substring(0, 35) + '...' : currentLesson.title}
                </h2>
                
                <Link href="/academia" className="absolute right-0 lg:right-12 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
            </div>

            {/* Video Container - Center */}
            <div className="w-full max-w-4xl aspect-[16/10] sm:aspect-video bg-[#0c0c0c] rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden my-auto border border-white/5">
                {/* Fallback/Error state cloned directly from original screenshot */}
                <div className="text-center p-6 flex flex-col items-center z-10 w-full">
                    <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-xs md:max-w-md px-4">
                        Video placeholder. Integración de motor de contenido en progreso.
                    </p>
                    <button className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                        <RotateCcw className="w-5 h-5" /> <span className="text-sm md:text-base">Reintentar</span>
                    </button>
                </div>
            </div>

            {/* Bottom Action Button - Glowing Neon Green */}
            <div className="w-full max-w-3xl mb-4 md:mb-12 relative z-10 mx-auto">
                <button className="w-full bg-[#16C10E] hover:bg-[#15b00c] text-black font-extrabold py-4 md:py-5 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(22,193,14,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(22,193,14,0.5)] active:scale-[0.98]">
                    <Check className="w-6 h-6 md:w-7 md:h-7 stroke-[3]" />
                    <span className="text-base md:text-lg tracking-wide">Marcar como completado</span>
                </button>
            </div>
            
            {/* Floating 'Pregúntale a Legao' - Exact replica from corner */}
            <div className="fixed bottom-6 left-6 hidden md:flex items-center gap-3 bg-gradient-to-r from-fuchsia-400 to-cyan-400 text-black font-bold py-3 px-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-2xl z-50">
               <Bot className="w-6 h-6" /> 
               <span className="text-sm md:text-base">Pregúntale a Legao</span>
               {/* Small green dot indicator */}
               <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#16C10E] border-2 border-black rounded-full"></div>
            </div>
        </div>
    );
}
