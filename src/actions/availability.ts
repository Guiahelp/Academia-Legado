'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

interface AvailabilityData {
  day_of_week: number
  start_time: string
  end_time: string
  is_available: boolean
}

export async function updateEntrepreneurAvailability(
  entrepreneurId: string,
  availabilities: AvailabilityData[]
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado' }

  // Verificar que el usuario es el empresario
  const { data: entrepreneur } = await supabase
    .from('entrepreneurs')
    .select('id')
    .eq('id', entrepreneurId)
    .eq('user_id', user.id)
    .single()

  if (!entrepreneur) return { error: 'No autorizado' }

  // Eliminar disponibilidades existentes
  await supabase
    .from('availability')
    .delete()
    .eq('entrepreneur_id', entrepreneurId)

  // Insertar nuevas
  const { error } = await supabase
    .from('availability')
    .insert(
      availabilities.map(a => ({
        ...a,
        entrepreneur_id: entrepreneurId
      }))
    )

  if (error) return { error: error.message }

  revalidatePath(`/entrepreneurs/${entrepreneurId}`)
  return { success: true }
}

export async function toggleDayAvailability(
  entrepreneurId: string,
  dayOfWeek: number,
  isAvailable: boolean
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado' }

  const { error } = await supabase
    .from('availability')
    .upsert({
      entrepreneur_id: entrepreneurId,
      day_of_week: dayOfWeek,
      is_available: isAvailable,
      start_time: '09:00:00',
      end_time: '18:00:00'
    }, {
      onConflict: 'entrepreneur_id,day_of_week'
    })

  if (error) return { error: error.message }

  revalidatePath(`/entrepreneurs/${entrepreneurId}`)
  return { success: true }
}
