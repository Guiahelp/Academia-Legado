import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Lesson, LessonSchema } from '../types/course';

const getSupabaseServer = async () => {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // ignore inside server components
                    }
                },
            },
        }
    );
};

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
    try {
        const supabase = await getSupabaseServer();
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('[getCourseService] Supabase Error fetching lesson by slug:', error.message);
            return null;
        }

        if (!data) return null;

        return LessonSchema.parse(data);
    } catch (e) {
        console.error('[getCourseService] Exception in getLessonBySlug:', e);
        return null;
    }
}
