import { z } from 'zod';

export const LessonSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(),
  slug: z.string().min(1, 'El slug no puede estar vacío'),
  title: z.string().min(1, 'El título es obligatorio'),
  video_url: z.string().url('Debe ser una URL válida').nullable().optional(),
  contenido_markdown: z.string().nullable().optional(),
  order: z.number().int().default(0),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

export type Lesson = z.infer<typeof LessonSchema>;

export const CourseDataSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  level: z.number().int().default(1),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

export type CourseData = z.infer<typeof CourseDataSchema>;
