'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { CreateEntrepreneurDTO, UpdateEntrepreneurDTO } from '@/types/database'

export async function createEntrepreneur(data: CreateEntrepreneurDTO) {
  const supabase = await createClient()

  const { error } = await supabase.from('entrepreneurs').insert(data)

  if (error) return { error: error.message }

  // Actualizar rol del usuario a entrepreneur
  await supabase
    .from('profiles')
    .update({ role: 'entrepreneur' })
    .eq('id', data.user_id)

  revalidatePath('/entrepreneurs')
  return { success: true }
}

export async function updateEntrepreneur(id: string, data: UpdateEntrepreneurDTO) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('entrepreneurs')
    .update(data)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/entrepreneurs')
  revalidatePath(`/entrepreneurs/${id}`)
  return { success: true }
}

export async function getEntrepreneurByUserId(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('entrepreneurs')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data
}
