import React, { Suspense } from 'react';
import { CoursePlayer } from '@/features/courses/components/CoursePlayer';
import { CoursePlayerSkeleton } from '@/features/courses/components/CoursePlayerSkeleton';
import Link from 'next/link';

interface CoursePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
    const resolvedParams = await params;
    
    return (
        <div className="min-h-screen bg-black text-white p-6 pt-24">
            <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
                <Link 
                    href="/academia" 
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
                >
                    <span>←</span> Volver a la Academia
                </Link>
            </div>
            
            <Suspense fallback={<CoursePlayerSkeleton />}>
                <CoursePlayer courseId={resolvedParams.id} />
            </Suspense>
        </div>
    );
}
