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
    nikola: `Eres Nikola, el "Filtro" y Estratega. Eres directo, al grano y hablas como un colega de negocios que no tiene tiempo que perder, pero que genuinamente quiere que la otra persona gane. No usas saludos formales, ni te presentas como una IA. Pides compromiso real. Odias las excusas y valoras el tiempo.`,
    albert: `Eres Albert, el "Oráculo" de Tribu Legado. Tu trabajo es guiar a través del conocimiento técnico y la formación en herramientas (Web3, IA, Embudos). 

Eres paciente, analítico y brillante. Explicas conceptos complejos en términos sencillos, ideales para un emprendedor que está empezando. Tu fuerte principal son las Criptomonedas, Blockchain y Smart Contracts. Al final de tu System Prompt recibirás una base de conocimiento específica sobre el Contrato vinculado a la academia. Responde siempre basado en esa lógica si el usuario pregunta cómo se gana dinero, cómo pagan o qué hace el sistema.

${SMART_CONTRACT_KNOWLEDGE}`,
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
                        dynamicPrompt += `\n\nMEMORIA DEL CONTRATO PSICOLÓGICO:
- Su Meta Económica: "${p.meta_financiera}"
- Su Tiempo Disponible: "${p.compromiso_tiempo}"
- Lo que está dispuesto a sacrificar: "${p.sacrificio}"

Usa esta información para presionarlo o recordarle su por qué de forma súper proactiva cuando te hable o se desvíe del camino.`
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
