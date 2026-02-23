'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function checkIsAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    const { data: profile } = await supabase
        .from('profiles')
        .select('admin')
        .eq('id', user.id)
        .single()

    return profile?.admin === true
}

export async function getProfiles() {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
        throw new Error('No autorizado')
    }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('fecha_registro', { ascending: false })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function updateUserStatus(userId: string, newStatus: string) {
    const isAdmin = await checkIsAdmin()
    if (!isAdmin) {
        throw new Error('No autorizado')
    }

    const supabase = await createClient()
    const { error } = await supabase
        .from('profiles')
        .update({ estado: newStatus, updated_at: new Date().toISOString() })
        .eq('id', userId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin', 'page')
    return { success: true }
}
