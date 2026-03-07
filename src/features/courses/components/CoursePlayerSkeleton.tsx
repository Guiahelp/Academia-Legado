import React from 'react';

export function CoursePlayerSkeleton() {
    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 md:p-8 animate-pulse">
            {/* Top Navigation Bar Skeleton */}
            <div className="w-full max-w-5xl flex items-center justify-center relative mt-2 md:mt-4">
                <div className="absolute left-0 lg:left-12 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5"></div>
                
                <div className="h-6 md:h-8 w-1/3 bg-white/10 rounded-full"></div>
                
                <div className="absolute right-0 lg:right-12 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5"></div>
            </div>

            {/* Video Container Skeleton */}
            <div className="w-full max-w-4xl aspect-[16/10] sm:aspect-video bg-[#0c0c0c] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden my-auto border border-white/5">
                <div className="flex flex-col items-center gap-4 w-full px-6">
                    <div className="h-4 w-3/4 max-w-xs bg-white/5 rounded-full"></div>
                    <div className="h-12 w-40 bg-white/10 rounded-full mt-2"></div>
                </div>
            </div>

            {/* Bottom Action Button Skeleton */}
            <div className="w-full max-w-3xl mb-4 md:mb-12 mx-auto">
                <div className="w-full h-14 md:h-16 bg-[#16C10E]/20 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#16C10E]/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
            
            {/* Floating 'Pregúntale a Legao' Skeleton */}
            <div className="fixed bottom-6 left-6 hidden md:flex w-56 h-12 bg-white/5 rounded-2xl shadow-2xl z-50"></div>
        </div>
    );
}
