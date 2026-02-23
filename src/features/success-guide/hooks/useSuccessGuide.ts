'use client'

import { useState, useEffect } from 'react'
import { successGuideService } from '../services/successGuideService'
import type { Prospect, Goal, DailyHabit } from '../types'

export function useProspects() {
    const [prospects, setProspects] = useState<Prospect[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProspects = async () => {
        try {
            const data = await successGuideService.getProspects()
            setProspects(data)
        } catch (error) {
            console.error('Error fetching prospects:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProspects()
    }, [])

    return { prospects, loading, refetch: fetchProspects }
}

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>([])
    const [loading, setLoading] = useState(true)

    const fetchGoals = async () => {
        try {
            const data = await successGuideService.getGoals()
            setGoals(data)
        } catch (error) {
            console.error('Error fetching goals:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    return { goals, loading, refetch: fetchGoals }
}

export function useDailyHabit(date: string) {
    const [habit, setHabit] = useState<DailyHabit | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchHabit = async () => {
        try {
            const data = await successGuideService.getDailyHabits(date)
            setHabit(data)
        } catch (error) {
            console.error('Error fetching habits:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHabit()
    }, [date])

    return { habit, loading, refetch: fetchHabit }
}
