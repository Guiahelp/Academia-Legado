import { z } from "zod";

export const contactFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, {
            message: "El nombre solo puede contener letras y espacios"
        }),
    country: z
        .string()
        .trim()
        .min(2, { message: "El país debe tener al menos 2 caracteres" })
        .max(60, { message: "El país no puede exceder 60 caracteres" })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, {
            message: "El país solo puede contener letras y espacios"
        }),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^[\d\s\+\-\(\)]+$/.test(val), {
            message: "El teléfono solo puede contener números, espacios y +/-/()"
        })
        .refine((val) => !val || val.replace(/\D/g, '').length >= 7, {
            message: "El teléfono debe tener al menos 7 dígitos"
        })
        .refine((val) => !val || val.replace(/\D/g, '').length <= 15, {
            message: "El teléfono no puede exceder 15 dígitos"
        }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const sanitizeInput = (input: string): string => {
    if (!input) return "";
    return input
        .replace(/<[^>]*>/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/[\x00-\x1F\x7F]/g, '')
        .trim();
};

export const validateAndSanitize = (data: {
    name: string;
    country: string;
    phone?: string;
}): { success: boolean; data?: ContactFormData; errors?: Record<string, string> } => {
    try {
        const result = contactFormSchema.parse(data);
        return {
            success: true,
            data: {
                name: sanitizeInput(result.name),
                country: sanitizeInput(result.country),
                phone: result.phone ? sanitizeInput(result.phone) : undefined,
            },
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors: Record<string, string> = {};
            error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    errors[issue.path[0] as string] = issue.message;
                }
            });
            return { success: false, errors };
        }
        return { success: false, errors: { general: "Error de validación" } };
    }
};
