"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock, Eye, EyeOff, AlertTriangle, Sparkles, Loader2, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { useAcademyAccess } from "../hooks/useAcademyAccess";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/features/auth/contexts/AuthContext";

interface PremiumGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

export default function PremiumGateModal({ isOpen, onClose, onUnlock }: PremiumGateModalProps) {
    const router = useRouter();
    const { user, isPending } = useAuth();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isUnlocking, setIsUnlocking] = useState(false);
    const { validatePassword } = useAcademyAccess();

    if (!isOpen) return null;

    const handleAction = () => {
        if (isPending) {
            onClose();
        } else if (!user) {
            window.location.href = "/signup";
        } else {
            onUnlock();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) {
            setError("Ingresa la clave");
            return;
        }

        setIsUnlocking(true);
        const result = await validatePassword(password);

        if (result.success) {
            setTimeout(() => {
                onUnlock();
                setIsUnlocking(false);
                setPassword("");
            }, 1500);
        } else {
            setIsUnlocking(false);
            setError(result.error || "Clave incorrecta");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md glass-card p-8 rounded-2xl border-primary/50 border-2">
                <button onClick={onClose} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border border-primary/50 flex items-center justify-center"><X size={16} /></button>

                {isUnlocking ? (
                    <div className="text-center py-8 animate-pulse">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-accent flex items-center justify-center shadow-neon-accent"><Unlock size={24} className="text-accent" /></div>
                        <h2 className="text-xl font-bold text-accent mb-2 tracking-tighter">¡ACCESO CONCEDIDO!</h2>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">Sincronizando con la red...</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-yellow-500 flex items-center justify-center shadow-lg"><AlertTriangle size={24} className="text-yellow-500" /></div>
                            <h2 className="text-xl font-bold tracking-tight uppercase">Acceso Restringido</h2>
                            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">Solo para socios de Tribu Legado</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    placeholder="CLAVE MAESTRA"
                                    className="text-center tracking-widest uppercase font-bold"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && <p className="text-destructive text-xs text-center font-bold uppercase">{error}</p>}
                            <Button type="submit" disabled={isUnlocking} className="btn-neon-accent w-full py-6">
                                {isUnlocking ? <Loader2 className="animate-spin" /> : "DESBLOQUEAR"}
                            </Button>
                        </form>

                        <button onClick={() => router.push("/contacto")} className="w-full mt-6 py-3 border-2 border-primary/30 rounded-xl text-primary font-bold text-sm hover:bg-primary/5 transition-all">QUIERO SER SOCIO</button>
                    </>
                )}
            </div>
        </div>
    );
}
