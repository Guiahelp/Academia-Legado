'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CreateAppointmentDTO, UpdateAppointmentDTO, AppointmentStatus } from '@/types/database'

// Helper to send appointment emails
async function sendAppointmentEmails(params: {
  type: 'created' | 'status_changed'
  appointmentId: string
  clientName: string
  clientEmail: string
  entrepreneurName: string
  entrepreneurEmail: string
  scheduledAt: string
  appointmentType: string
  duration: number
  status?: 'confirmed' | 'cancelled' | 'completed'
}) {
  try {
    const scheduledDate = new Date(params.scheduledAt)
    const appointmentDate = scheduledDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const appointmentTime = scheduledDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://saas-factory-theta.vercel.app'

    await fetch(`${baseUrl}/api/email/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: params.type,
        appointmentId: params.appointmentId,
        clientName: params.clientName,
        clientEmail: params.clientEmail,
        entrepreneurName: params.entrepreneurName,
        entrepreneurEmail: params.entrepreneurEmail,
        appointmentDate,
        appointmentTime,
        appointmentType: params.appointmentType,
        duration: params.duration,
        status: params.status,
      }),
    })
  } catch (error) {
    console.error('Error sending appointment emails:', error)
  }
}

export async function createAppointment(data: CreateAppointmentDTO) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'No autenticado' }

  // Get client profile info
  const { data: clientProfile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  // Obtener o crear client_id del usuario
  let { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!client) {
    // Auto-crear perfil de cliente si no existe
    const { data: newClient, error: createError } = await supabase
      .from('clients')
      .insert({ user_id: user.id })
      .select('id')
      .single()

    if (createError) return { error: createError.message }
    client = newClient
  }

  // Obtener datos del empresario
  const { data: entrepreneur } = await supabase
    .from('entrepreneurs')
    .select('user_id, profile:profiles(full_name, email)')
    .eq('id', data.lawyer_id)
    .single()

  // Obtener tipo de cita
  const { data: appointmentType } = await supabase
    .from('appointment_types')
    .select('name, duration_minutes')
    .eq('id', data.appointment_type_id)
    .single()

  const { data: appointment, error } = await supabase
    .from('appointments')
    .insert({
      ...data,
      entrepreneur_id: data.lawyer_id, // Map lawyer_id from DTO to entrepreneur_id in DB if needed, but the column might need rename too.
      client_id: client.id,
      duration_minutes: appointmentType?.duration_minutes || 30
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  // Send email notifications (non-blocking)
  if (appointment && entrepreneur?.profile && clientProfile) {
    // Handle profile as it might be an array from the join
    const entrepreneurProfileData = Array.isArray(entrepreneur.profile) ? entrepreneur.profile[0] : entrepreneur.profile
    if (entrepreneurProfileData) {
      sendAppointmentEmails({
        type: 'created',
        appointmentId: appointment.id,
        clientName: clientProfile.full_name || 'Miembro',
        clientEmail: clientProfile.email,
        entrepreneurName: entrepreneurProfileData.full_name || 'Mentor',
        entrepreneurEmail: entrepreneurProfileData.email,
        scheduledAt: data.scheduled_at,
        appointmentType: appointmentType?.name || 'Mentoría',
        duration: appointmentType?.duration_minutes || 30,
      })
    }
  }

  revalidatePath('/appointments')
  redirect('/appointments')
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  cancellationReason?: string
) {
  const supabase = await createClient()

  // Get appointment details for email
  const { data: appointment } = await supabase
    .from('appointments')
    .select(`
      *,
      client:clients(user_id, profile:profiles(full_name, email)),
      entrepreneur:entrepreneurs(user_id, profile:profiles(full_name, email)),
      appointment_type:appointment_types(name)
    `)
    .eq('id', id)
    .single()

  const updateData: UpdateAppointmentDTO = { status }
  if (cancellationReason) {
    updateData.cancellation_reason = cancellationReason
  }

  const { error } = await supabase
    .from('appointments')
    .update(updateData)
    .eq('id', id)

  if (error) return { error: error.message }

  // Send email for status changes (confirmed, cancelled, completed)
  if (appointment && ['confirmed', 'cancelled', 'completed'].includes(status)) {
    // Handle profiles as they might be arrays from the join
    const clientProfileData = Array.isArray(appointment.client?.profile)
      ? appointment.client?.profile[0]
      : appointment.client?.profile
    const entrepreneurProfileData = Array.isArray(appointment.entrepreneur?.profile)
      ? appointment.entrepreneur?.profile[0]
      : appointment.entrepreneur?.profile

    if (clientProfileData && entrepreneurProfileData) {
      sendAppointmentEmails({
        type: 'status_changed',
        appointmentId: id,
        clientName: clientProfileData.full_name || 'Miembro',
        clientEmail: clientProfileData.email,
        entrepreneurName: entrepreneurProfileData.full_name || 'Mentor',
        entrepreneurEmail: entrepreneurProfileData.email,
        scheduledAt: appointment.scheduled_at,
        appointmentType: appointment.appointment_type?.name || 'Mentoría',
        duration: appointment.duration_minutes,
        status: status as 'confirmed' | 'cancelled' | 'completed',
      })
    }
  }

  revalidatePath('/appointments')
  revalidatePath(`/appointments/${id}`)
  return { success: true }
}

export async function addAppointmentNotes(id: string, notes: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('appointments')
    .update({ notes })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath(`/appointments/${id}`)
  return { success: true }
}

export async function rescheduleAppointment(id: string, newDate: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('appointments')
    .update({ scheduled_at: newDate, status: 'pending' })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/appointments')
  return { success: true }
}
