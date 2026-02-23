import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/features/auth/contexts/AuthContext';

const TOKEN_STORAGE_KEY = 'academy_access_token';

interface UseAcademyAccessReturn {
    hasAccess: boolean;
    isLoading: boolean;
    validatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
    validateToken: () => Promise<boolean>;
    clearAccess: () => void;
}

export const useAcademyAccess = (): UseAcademyAccessReturn => {
    const { status, isLoading: authLoading } = useAuth();
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            setHasAccess(status === 'activo');
            setIsLoading(false);
        }
    }, [status, authLoading]);

    const getStoredToken = (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    };

    const storeToken = (token: string): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
        }
    };

    const clearToken = (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    };

    const validateToken = useCallback(async (): Promise<boolean> => {
        const token = getStoredToken();
        if (!token) {
            setHasAccess(false);
            setIsLoading(false);
            return false;
        }

        // For now, in dev, we accept the token if it matches our secret or just exists
        // Ideally this calls an Edge Function
        if (token === 'legado_premium_access') {
            setHasAccess(true);
            setIsLoading(false);
            return true;
        }

        setHasAccess(false);
        setIsLoading(false);
        return false;
    }, []);

    const validatePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
        // Basic local validation for migration demo
        // In production, this should be an Edge Function call
        if (password === 'TRIBU2025' || password === 'LEGADO') {
            storeToken('legado_premium_access');
            setHasAccess(true);
            return { success: true };
        }

        return { success: false, error: 'Clave incorrecta' };
    };

    const clearAccess = (): void => {
        clearToken();
        setHasAccess(false);
    };

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    return {
        hasAccess,
        isLoading,
        validatePassword,
        validateToken,
        clearAccess
    };
};
