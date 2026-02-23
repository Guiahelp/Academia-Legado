import { createClient } from '@/lib/supabase/client'
import type { Prospect, Goal, DailyHabit } from '../types'

export const successGuideService = {
    // Prospectos
    async getProspects() {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('prospects')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data as Prospect[]
    },

    async createProspect(prospect: Omit<Prospect, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No authenticated')

        const { data, error } = await supabase
            .from('prospects')
            .insert({ ...prospect, user_id: user.id })
            .select()
            .single()
        if (error) throw error
        return data as Prospect
    },

    // Metas
    async getGoals() {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .order('target_date', { ascending: true })
        if (error) throw error
        return data as Goal[]
    },

    async createGoal(goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No authenticated')

        const { data, error } = await supabase
            .from('goals')
            .insert({ ...goal, user_id: user.id })
            .select()
            .single()
        if (error) throw error
        return data as Goal
    },

    // Hábitos Diarios
    async getDailyHabits(date: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('daily_habits')
            .select('*')
            .eq('date', date)
            .single()
        if (error && error.code !== 'PGRST116') throw error
        return data as DailyHabit | null
    },

    async upsertDailyHabit(habit: Omit<DailyHabit, 'id' | 'user_id' | 'created_at'>) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No authenticated')

        const { data, error } = await supabase
            .from('daily_habits')
            .upsert({ ...habit, user_id: user.id }, { onConflict: 'user_id,date' })
            .select()
            .single()
        if (error) throw error
        return data as DailyHabit
    },

    // Declaración de Intención (Paso 1)
    async saveIntention(intention: { meta_financiera: string, compromiso_tiempo: string, sacrificio: string }) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No authenticated')

        const { error } = await supabase
            .from('profiles')
            .update(intention)
            .eq('id', user.id)

        if (error) throw error
        return true
    },

    async getIntentionData() {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        const { data, error } = await supabase
            .from('profiles')
            .select('meta_financiera, compromiso_tiempo, sacrificio')
            .eq('id', user.id)
            .single()

        if (error && error.code !== 'PGRST116') throw error
        return data as { meta_financiera: string, compromiso_tiempo: string, sacrificio: string } | null
    }
}
