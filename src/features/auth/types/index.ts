import { z } from 'zod';
import { CourseSchema, LessonSchema, UserProgressSchema } from '../schemas';

export type Course = z.infer<typeof CourseSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type UserProgress = z.infer<typeof UserProgressSchema>;
