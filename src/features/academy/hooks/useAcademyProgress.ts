import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function useAcademyProgress() {
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Nivel 0 por defecto (Fundamentos)
    const [currentLevel, setCurrentLevel] = useState<number>(0)
    const [loadingProgress, setLoadingProgress] = useState(true)

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()

                if (!session?.user) {
                    setLoadingProgress(false)
                    return
                }

                const { data: rawProfile } = await supabase
                    .from('profiles')
                    .select('current_academy_level')
                    .eq('id', session.user.id)
                    .single()

                const profile = rawProfile as unknown as { current_academy_level: number } | null | never;

                if (profile && 'current_academy_level' in profile && profile.current_academy_level !== undefined && profile.current_academy_level !== null) {
                    setCurrentLevel(profile.current_academy_level)
                }
            } catch (error) {
                console.error("Error cargando el progreso de la academia:", error)
            } finally {
                setLoadingProgress(false)
            }
        }

        fetchProgress()
    }, [supabase])

    // Función a llamar cuando el usuario aprueba un Quiz de un nivel específico
    const unlockNextLevel = async (levelCompleted: number) => {
        const nextLevel = levelCompleted + 1;

        // Evitamos peticiones si su nivel en BD ya es superior o igual al próximo
        if (nextLevel <= currentLevel) return;

        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session?.user) return

            // Actualización optimista en UI
            setCurrentLevel(nextLevel)

            // Persistencia en Backend
            const { error } = await supabase
                .from('profiles')
                // @ts-ignore (Columna nueva en DB aún no en types)
                .update({ current_academy_level: nextLevel })
                .eq('id', session.user.id)

            if (error) {
                console.error("Error al desbloquear el siguiente nivel en DB:", error)
                // Opcional: Revertir optimismo si falla (setCurrentLevel(currentLevel))
            }
        } catch (error) {
            console.error("Error de subida al guardar nivel:", error)
        }
    }

    return {
        currentLevel,
        loadingProgress,
        unlockNextLevel,
        isLevelUnlocked: (levelNumber: number) => levelNumber <= currentLevel
    }
}
