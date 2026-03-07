import React from 'react';
import { courseService } from '../services/courseService';

interface CoursePlayerProps {
    courseId: string;
}

export async function CoursePlayer({ courseId }: CoursePlayerProps) {
    const data = await courseService.getCourseWithLessons(courseId);

    if (!data || !data.course) {
        return (
            <div className="w-full max-w-5xl mx-auto glass-card flex flex-col items-center justify-center p-12 text-center text-destructive animate-fade-in border-destructive/30">
                <span className="text-4xl mb-4">⚠️</span>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-destructive-foreground">Contenido no encontrado</h2>
                <p className="text-muted-foreground">El curso que intentas cargar no existe o hubo un error al obtenerlo.</p>
            </div>
        );
    }

    const { course, lessons } = data;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in relative z-10 px-4 md:px-0">
            {/* Header Area */}
            <div className="glass-card border-2 border-primary/30 p-8 shadow-neon-primary animate-slide-up relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-glow pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/50 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_hsl(292_91%_61%_/_0.3)]">
                            Nivel {course.level}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-neon-gradient mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                        {course.title}
                    </h1>
                    {course.description && (
                        <p className="text-muted-foreground text-sm md:text-md max-w-3xl leading-relaxed">
                            {course.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Display Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Video/Content Area */}
                <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="aspect-video bg-black/50 rounded-2xl border-2 border-secondary/30 shadow-neon-secondary flex items-center justify-center relative group overflow-hidden glass-card">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                        <div className="z-20 text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-secondary drop-shadow-[0_0_15px_hsl(183_100%_50%_/_0.5)] border border-secondary/50 group-hover:scale-110 transition-transform">
                                <span className="block text-2xl ml-1">▶</span>
                            </div>
                            <p className="text-secondary font-bold tracking-widest uppercase text-sm drop-shadow-md">Selecciona una lección</p>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-t-2 border-primary/20">
                        <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-xl">📄</span> Detalles del Contenido
                        </h3>
                        <div className="prose prose-invert prose-zinc max-w-none prose-p:text-muted-foreground">
                            <p>
                                Aquí se renderizará el módulo seleccionado con sus anotaciones y tareas (Draft).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Lessons Pipeline */}
                <div className="glass-card p-6 h-fit sticky top-24 border-2 border-white/5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest drop-shadow-sm">
                        <span className="text-accent text-xl">≡</span> Rutas de Aprendizaje
                    </h3>

                    {lessons && lessons.length > 0 ? (
                        <div className="space-y-3">
                            {lessons.map((lesson, idx) => (
                                <button
                                    key={lesson.id}
                                    className="w-full flex gap-4 items-center p-4 rounded-xl transition-all duration-300 glass-card bg-transparent border border-white/5 hover:border-primary/50 hover:bg-white/5 group focus:outline-none hover:scale-[1.02]"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 text-muted-foreground flex items-center justify-center font-bold shrink-0 group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-inner">
                                        {idx + 1}
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="text-sm font-bold text-foreground group-hover:text-primary truncate transition-colors">
                                            {lesson.title}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest truncate">
                                            Módulo {lesson.order}
                                        </p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_10px_hsl(292_91%_61%_/_0.3)] transition-all">
                                        <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-primary"></div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-6 border border-dashed border-white/10 rounded-xl">
                            <p className="text-muted-foreground text-xs uppercase tracking-widest">Módulos en Construcción</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
