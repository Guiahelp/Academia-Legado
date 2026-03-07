import { z } from 'zod';

export const CourseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, 'El título es requerido'),
    description: z.string().nullable().optional(),
    level: z.number().int().default(1),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});

export const LessonSchema = z.object({
    id: z.string().uuid(),
    courseId: z.string().uuid(),
    title: z.string().min(1, 'El título es requerido'),
    content: z.string().nullable().optional(),
    order: z.number().int().default(0),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});

export const UserProgressSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    courseId: z.string().uuid(),
    lessonId: z.string().uuid().nullable().optional(),
    status: z.enum(['enrolled', 'in_progress', 'completed']),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});
