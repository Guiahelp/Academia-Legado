import React from 'react';
import { CoursePlayerSkeleton } from '@/features/courses/components/CoursePlayerSkeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24 text-center">
             <div className="mb-8 flex justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
            </div>
            <CoursePlayerSkeleton />
        </div>
    );
}
