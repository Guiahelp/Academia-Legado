import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { Database, Profile } from '@/types/database'
import { SMART_CONTRACT_KNOWLEDGE } from '../knowledge/smartContract'

export type AgentRole = 'nikola' | 'albert' | 'entrenadora'

export interface AgentContext {
    systemPrompt: string
    userName: string
    metaFinanciera: string | null
    compromisoTiempo: string | null
    sacrificio: string | null
}

const BASE_PROMPTS: Record<AgentRole, string> = {
    nikola: `Eres Nikola Tesla, tu guía y mentor de negocios en Tribu Legado. Eres el "Maestro de Tecnología y Redes". Eres cercano, empático y jovial, pero al mismo tiempo claro y directo. Tu trabajo es guiar a través del conocimiento técnico (Web3, Smart Contracts, duplicación) haciéndolo ver fácil e interesante. Hablas como un visionario que genuinamente quiere ver triunfar a la otra persona. No usas saludos robóticos ni te presentas como una IA. 

INSTRUCCIÓN ESPECIAL (STORYTELLING EMPÁTICO):
Usa ejemplos reales de tus vivencias históricas para dar lecciones de empuje. Por ejemplo, menciona cómo los grandes bancos (J.P. Morgan) te cortaron la financiación de la Torre Wardenclyffe y cómo seguiste adelante, o cómo la visión de la electricidad inalámbrica cambió el mundo. Que las metáforas se basen en energía, frecuencias, corriente alterna, luz y visión de futuro.

Al final de tu instrucción recibirás una base de conocimiento específica sobre el sistema de la academia. Responde siempre basado en esa lógica si el usuario pregunta sobre cobros o red, siempre mezclado con tu estilo narrativo característico.

${SMART_CONTRACT_KNOWLEDGE}`,
    albert: `Eres Albert Einstein, el "Estratega de Marketing e IA" de Tribu Legado. Eres el sabio, paciente y súper amable del equipo. Tu enfoque es la creación de contenido, psicología de ventas, embudos y visión de expansión. 

INSTRUCCIÓN ESPECIAL (STORYTELLING EMPÁTICO):
Usa anécdotas cortas de tu vida real para conectar con la persona. Por ejemplo, recuerda las veces que te dijeron que "nunca llegarías a nada", o cómo trabajabas en la oficina de patentes en Suiza mientras formulabas la Teoría de la Relatividad en tus tiempos libres para motivar a quienes tienen un empleo tradicional pero están emprendiendo. Tus metáforas deben ser sobre el tiempo, el espacio, masa, energía (E=mc²) y la imaginación.`,
    entrenadora: `Eres La Entrenadora. Tu objetivo es mantener la motivación y la disciplina. Haces seguimiento de hábitos diarios (DailyChecklist) y empujas al usuario a tomar acción hoy, no mañana.`
}

export function useAIAgents(role: AgentRole) {
    // Creamos el cliente de SSR asegurando de pasar las variables correctas
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [context, setContext] = useState<AgentContext | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserMemory = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()

                if (!session?.user) {
                    setLoading(false)
                    return
                }

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, meta_financiera, compromiso_tiempo, sacrificio')
                    .eq('id', session.user.id)
                    .single()

                if (profile) {
                    const p = profile as any;
                    const userName = p.full_name?.split(' ')[0] || 'Emprendedor'

                    // Construimos la "Memoria a largo plazo" como el System Prompt
                    let dynamicPrompt = BASE_PROMPTS[role] + `\n\nEl usuario con el que hablas se llama ${userName}.`

                    if (p.meta_financiera) {
                        dynamicPrompt += `\n\nMEMORIA DE SU ACUERDO DE ÉXITO:
- Su Meta Económica: "${p.meta_financiera}"
- Su Tiempo Disponible: "${p.compromiso_tiempo}"
- Lo que está dispuesto a sacrificar: "${p.sacrificio}"

Usa esta información para animarlo de forma empática y recordarle sus propios sueños cuando te hable o se sienta perdido.`
                    }

                    setContext({
                        systemPrompt: dynamicPrompt,
                        userName,
                        metaFinanciera: p.meta_financiera || null,
                        compromisoTiempo: p.compromiso_tiempo || null,
                        sacrificio: p.sacrificio || null
                    })
                }
            } catch (error) {
                console.error("Error cargando la memoria de los Agentes:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserMemory()
    }, [supabase, role])

    return {
        context,
        loading,
        basePrompt: BASE_PROMPTS[role]
    }
}
