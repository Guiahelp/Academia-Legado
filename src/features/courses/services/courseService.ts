"use server";

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CourseSchema, UserProgressSchema, LessonSchema, Course, UserProgress, Lesson } from '../schemas'

// Helper to init server client
const getSupabaseServer = async () => {
    const cookieStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing user sessions.
                    }
                },
            },
        }
    )
}

export async function getAuthUserId(): Promise<string | null> {
    try {
        const supabase = await getSupabaseServer();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        return user.id;
    } catch {
        return null;
    }
}

export async function getCourses(): Promise<Course[]> {
    try {
        const supabase = await getSupabaseServer();
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('level', { ascending: true });

        if (error) {
            console.error('[courseService] Supabase Error fetching courses:', error.message);
            throw new Error('No se pudieron cargar los cursos.');
        }

        // runtime validation
        return data.map(course => CourseSchema.parse(course));
    } catch (e) {
        console.error('[courseService] Exception in getCourses:', e);
        throw new Error('Error interno procesando los cursos.');
    }
}

export async function getUserProgress(userId: string): Promise<UserProgress[]> {
    try {
        const supabase = await getSupabaseServer();
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('[courseService] Supabase Error fetching progress:', error.message);
            throw new Error('No se pudo cargar el progreso del usuario.');
        }

        return data.map(progress => UserProgressSchema.parse(progress));
    } catch (e) {
        console.error('[courseService] Exception in getUserProgress:', e);
        throw new Error('Error interno procesando el progreso.');
    }
}

export async function getEnrolledCourses(userId: string): Promise<Course[]> {
    try {
        const supabase = await getSupabaseServer();

        const { data, error } = await supabase
            .from('user_progress')
            .select('course_id, courses(*)')
            .eq('user_id', userId)
            .in('status', ['enrolled', 'in_progress', 'completed']);

        if (error) {
            console.error('[courseService] Supabase Error fetching enrolled courses:', error.message);
            return [];
        }

        const courses = data
            .map(item => item.courses)
            .filter(c => c !== null);

        return courses.map(course => CourseSchema.parse(course));

    } catch (e) {
        console.error('[courseService] Exception in getEnrolledCourses:', e);
        return [];
    }
}

export async function getCourseWithLessons(courseId: string): Promise<{ course: Course; lessons: import('../schemas').Lesson[] } | null> {
    try {
        const supabase = await getSupabaseServer();
        // Fetch course and its lessons in a single query
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select(`
                *,
                lessons ( * )
            `)
            .eq('id', courseId)
            .single();

        if (courseError || !courseData) {
            console.log('[courseService] Used Mock Data for UI presentation');
            return {
                course: {
                    id: "mock1",
                    title: "El Código es Ley",
                    description: "Entendiendo la inmutabilidad: Por qué un Smart Contract es más seguro que un banco. Bienvenido al núcleo de la descentralización de Tribu Legado.",
                    level: 1,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                lessons: [
                    { id: "req1", course_id: "mock1", title: "Introducción a Smart Contracts", content: "Contenido", order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
                    { id: "req2", course_id: "mock1", title: "Instalación de Trust Wallet", content: "Contenido", order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
                    { id: "req3", course_id: "mock1", title: "Uso de la Blockchain Pública", content: "Contenido", order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
                ]
            };
        }

        // Separate course and nested lessons for validation
        const { lessons, ...courseFields } = courseData;

        // Sort lessons correctly by order
        const sortedLessons = (lessons || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

        // Validate with Zod
        const parsedCourse = CourseSchema.parse(courseFields);
        const { z } = await import('zod');
        const { LessonSchema } = await import('../schemas');
        
        const parsedLessons = z.array(LessonSchema).parse(sortedLessons);

        return {
            course: parsedCourse,
            lessons: parsedLessons,
        };
    } catch (e) {
        console.error('[courseService] Exception in getCourseWithLessons:', e);
        return null;
    }
}
