/**
 * Tipos para la Guía del Éxito 2026
 */

export type ProspectStatus = 'contacted' | 'followed_up' | 'closed' | 'rejected'

export interface Prospect {
    id: string
    user_id: string
    full_name: string
    phone?: string
    social_media?: string
    status: ProspectStatus
    notes?: string
    created_at: string
    updated_at: string
}

export interface Goal {
    id: string
    user_id: string
    title: string
    description?: string
    target_date: string
    is_completed: boolean
    category: 'financial' | 'personal' | 'team'
    created_at: string
    updated_at: string
}

export interface DailyHabit {
    id: string
    user_id: string
    date: string
    shared_content: boolean
    presentation_given: boolean
    follow_up_made: boolean
    training_attended: boolean
    notes?: string
    created_at: string
}
