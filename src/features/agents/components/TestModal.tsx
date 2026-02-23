"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface Question {
    id: number;
    text: string;
    options: { value: string; label: string; icon?: "check" | "x" }[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "¿Dispones del capital semilla único de 50 USDT para activar tu posición?",
        options: [
            { value: "si", label: "SÍ, estoy listo.", icon: "check" },
            { value: "no", label: "No tengo el capital.", icon: "x" },
        ],
    },
    {
        id: 2,
        text: "Nuestro sistema hace el trabajo duro, pero tú enciendes la mecha. ¿Te comprometes a duplicar esto con 2 personas usando esta herramienta?",
        options: [
            { value: "si", label: "SÍ, acepto el reto.", icon: "check" },
            { value: "no", label: "No quiero comprometerme.", icon: "x" },
        ],
    },
    {
        id: 3,
        text: "¿Dominas ya el manejo de USDT (Billeteras/Exchanges)?",
        options: [
            { value: "si", label: "SÍ, tengo experiencia.", icon: "check" },
            { value: "nosabe", label: "No sé / Necesito aprender.", icon: "x" },
        ],
    },
    {
        id: 4,
        text: "¿Te comprometes a educarte con nuestro sistema y seguir el proceso?",
        options: [
            { value: "si", label: "SÍ, estoy comprometido.", icon: "check" },
            { value: "no", label: "No me interesa.", icon: "x" },
        ],
    },
];

interface TestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TestModal = ({ isOpen, onClose }: TestModalProps) => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showBlocked, setShowBlocked] = useState(false);

    if (!isOpen) return null;

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
        setAnswers(newAnswers);

        const questionId = questions[currentQuestion].id;

        if ((questionId === 1 || questionId === 2) && value === "no") {
            setShowBlocked(true);
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleComplete(newAnswers);
        }
    };

    const handleComplete = (finalAnswers: Record<number, string>) => {
        const p3Answer = finalAnswers[3];
        onClose();
        if (p3Answer === "nosabe") {
            router.push("/academia");
        } else {
            router.push("/contacto");
        }
    };

    const handleCloseBlocked = () => {
        onClose();
        router.push("/");
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
            {showBlocked ? (
                <div className="glass-card-primary p-8 rounded-2xl max-w-md w-full text-center animate-scale-in"
                    style={{ border: "1px solid hsl(0 84% 60% / 0.5)" }}
                >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                        style={{ border: "2px solid hsl(0 84% 60%)" }}
                    >
                        <AlertTriangle size={32} className="text-destructive" />
                    </div>
                    <h1 className="text-2xl font-bold text-destructive mb-4">NO CUMPLES CON LOS REQUISITOS</h1>
                    <p className="text-muted-foreground mb-8">Buscamos personas comprometidas. Cuando estés preparado, volveremos a hablar.</p>
                    <button onClick={handleCloseBlocked} className="btn-neon-primary w-full">Volver al Inicio</button>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="text-muted-foreground">Pregunta {currentQuestion + 1} de {questions.length}</span>
                            <span className="text-primary font-medium">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-500 shadow-neon-primary" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl animate-scale-in border-primary/20">
                        <p className="text-primary text-xs font-bold mb-4 text-center tracking-widest uppercase">Evaluación</p>
                        <h1 className="text-xl font-bold text-center mb-8 leading-relaxed">{questions[currentQuestion].text}</h1>
                        <div className="space-y-4">
                            {questions[currentQuestion].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(option.value)}
                                    className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${option.icon === "check" ? "bg-primary/10 hover:bg-primary/20 border-primary/30" : "bg-destructive/5 hover:bg-destructive/10 border-destructive/20"
                                        } border`}
                                >
                                    {option.icon === "check" ? <Check size={20} className="text-primary" /> : <X size={20} className="text-destructive" />}
                                    <span className="font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full mt-6 text-muted-foreground text-sm hover:text-primary transition-colors">Cancelar y volver</button>
                </div>
            )}
        </div>
    );
};

export default TestModal;
