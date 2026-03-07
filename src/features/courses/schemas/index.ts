import { z } from 'zod';

export const CourseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, 'Course title cannot be empty'),
    description: z.string().nullable().optional(),
    level: z.number().int().default(1),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional()
});

export const LessonSchema = z.object({
    id: z.string().uuid(),
    course_id: z.string().uuid(),
    title: z.string().min(1, 'Title needed'),
    content: z.string().nullable().optional(),
    order: z.number().int().default(0),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional()
});

export const UserProgressSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    course_id: z.string().uuid(),
    lesson_id: z.string().uuid().nullable().optional(),
    status: z.enum(['enrolled', 'in_progress', 'completed']),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional()
});

export type Course = z.infer<typeof CourseSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type UserProgress = z.infer<typeof UserProgressSchema>;
