"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/shared/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
    user: User | null;
    profile: any | null;
    isAdmin: boolean;
    isLoading: boolean;
    status: 'pendiente' | 'activo' | 'suspendido' | 'guest';
    isPending: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
            if (!error && data) {
                console.log('Profile loaded:', data);
                setProfile(data);
            } else if (error) {
                console.error('Error fetching profile:', error);
            }
        } catch (e) {
            console.error('Fetch profile exception:', e);
        }
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id);
        }
    };

    useEffect(() => {
        let isMounted = true;

        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (isMounted) {
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id).then(() => {
                        if (isMounted) setIsLoading(false);
                    });
                } else {
                    setIsLoading(false);
                }
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setIsLoading(false);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    // Navigation hooks kept for potential future use or other redirects
    const router = useRouter();
    const pathname = usePathname();

    // The forceful redirect to '/espera-aprobacion' has been removed.
    // Users in 'pendiente' status can now browse the site, but interactions
    // will be locked individually within the protected pages (Academia, Guia).


    return (
        <AuthContext.Provider value={{
            user,
            profile,
            isAdmin: profile?.admin === true,
            isLoading,
            signOut,
            refreshProfile,
            status: profile?.estado || 'guest',
            isPending: profile?.estado === 'pendiente'
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
