import React from 'react';

export function CoursePlayerSkeleton() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-pulse p-4 md:p-0">
            {/* Header Skeleton */}
            <div className="glass-card border-2 border-primary/10 p-8 mb-8 relative overflow-hidden">
                <div className="h-6 bg-primary/20 rounded-full w-24 mb-4"></div>
                <div className="h-10 bg-white/10 rounded-lg w-2/3 mb-4"></div>
                <div className="h-4 bg-white/5 rounded-lg w-1/2"></div>
            </div>

            {/* Content Area Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main View Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video bg-black/40 rounded-2xl border-2 border-secondary/10 glass-card"></div>
                    
                    <div className="glass-card p-8 border-t-2 border-primary/10">
                        <div className="h-6 bg-primary/20 rounded-lg w-1/4 mb-6"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-white/5 rounded-lg w-full"></div>
                            <div className="h-4 bg-white/5 rounded-lg w-5/6"></div>
                            <div className="h-4 bg-white/5 rounded-lg w-4/6"></div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Lessons Pipeline */}
                <div className="glass-card p-6 h-fit border-2 border-white/5">
                    <div className="h-6 bg-white/10 rounded-lg w-1/2 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4 items-center p-4 rounded-xl glass-card bg-transparent border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-white/5 shrink-0"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-white/10 rounded-lg w-full"></div>
                                    <div className="h-3 bg-white/5 rounded-lg w-1/2"></div>
                                </div>
                                <div className="w-6 h-6 rounded-full border border-white/10 shrink-0"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
