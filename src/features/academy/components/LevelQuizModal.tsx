import { useState, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Sparkles, Brain } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface Question {
    text: string
    options: string[]
    correctIndex: number
}

// Batería estática de preguntas por módulo
const QUIZ_DATA: Record<number, Question[]> = {
    0: [ // Nivel 0: Fundamentos Tribu
        {
            text: "¿De cuánto es el aporte inicial único para ingresar a Tribu?",
            options: ["$150 USDT", "$50 USDT", "$100 USDT", "Es gratis"],
            correctIndex: 1
        },
        {
            text: "¿Quién custodia tu dinero en este sistema P2P?",
            options: ["La empresa Tribu", "Nadie, va de billetera a billetera", "Un fondo fiduciario", "El creador del sistema"],
            correctIndex: 1
        },
        {
            text: "¿Cuál es la primera fase del sistema (donde todos inician)?",
            options: ["Zona Zafiro", "Zona Diamante", "Zona Esmeralda", "Zona Cristal"],
            correctIndex: 3
        }
    ],
    1: [ // Nivel 1: El Despertar
        {
            text: "¿Cuál es el propósito real del 'Contrato Psicológico'?",
            options: ["Pagar impuestos", "Fijar una meta y un compromiso real", "Aprender a programar", "Cumplir un requisito legal"],
            correctIndex: 1
        },
        {
            text: "La Economía del Regalo (Gift Economy) se caracteriza por...",
            options: ["Inversiones con Retorno Asegurado (ROI)", "Aportes voluntarios entre personas (P2P)", "Comprar criptomonedas y guardarlas", "Un salario mensual fijo"],
            correctIndex: 1
        },
        {
            text: "Para no rendirte en el trayecto, lo más importante es...",
            options: ["Definir tu 'Por Qué' u objetivo final", "Saber la teoría del Blockchain", "Tener muchos referidos", "Revisar Binance todos los días"],
            correctIndex: 0
        }
    ],
    2: [ // Nivel 2: El Arsenal Digital
        {
            text: "¿Qué red Blockchain y moneda usamos principalmente para los aportes?",
            options: ["Red Ethereum (ETH)", "Red Bitcoin (BTC)", "Red BEP-20 (USDT)", "Red Solana (SOL)"],
            correctIndex: 2
        },
        {
            text: "¿Para qué sirve exactamente el Gas Fee (BNB)?",
            options: ["Para pagarle a la Academia", "Para pagar la comisión a la red Blockchain", "Es el dinero que se regala", "Para comprar más USDT"],
            correctIndex: 1
        },
        {
            text: "¿Cuál es el mejor método para vender y comprar cripto localmente?",
            options: ["Binance P2P", "Un banco tradicional", "Western Union", "PayPal"],
            correctIndex: 0
        }
    ],
    // Nivel 3 (Arquitectura de red) no necesita quiz porque es el final, pero lo preparamos porsi.
    3: [
        {
            text: "¿Cuál es la estrategia principal de duplicación recomendada?",
            options: ["Tener 100 directos", "Tener 2 directos fuertes y bajarlos en profundidad", "No tener referidos", "Buscar inversores pasivos"],
            correctIndex: 1
        },
        {
            text: "¿Qué significa 'Filtrar' a los prospectos?",
            options: ["Convencer a todos", "Separar a los curiosos de los constructores", "Ignorar a los que preguntan", "Bloquearlos en Telegram"],
            correctIndex: 1
        },
        {
            text: "El 'Acopio' en la Zona Cristal se utiliza para:",
            options: ["Aumentar la ganancia del creador", "Apoyar al tablero más antiguo automáticamente", "Pagar el servidor web", "Comprar otra posición para ti"],
            correctIndex: 1
        }
    ]
}

interface LevelQuizModalProps {
    isOpen: boolean
    levelNumber: number
    levelTitle: string
    onClose: () => void
    onSuccess: () => void // Se dispara cuando aprueba
}

export function LevelQuizModal({ isOpen, levelNumber, levelTitle, onClose, onSuccess }: LevelQuizModalProps) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [showError, setShowError] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Resetear el estado si cambia el nivel
    useEffect(() => {
        if (isOpen) {
            setCurrentQuestionIdx(0)
            setSelectedOption(null)
            setShowError(false)
            setIsFinished(false)
        }
    }, [isOpen, levelNumber])

    if (!isOpen) return null

    const questions = QUIZ_DATA[levelNumber] || []

    // Fallback de seguridad si un nivel no tiene preguntas
    if (questions.length === 0) {
        onSuccess();
        return null;
    }

    const currentQuestion = questions[currentQuestionIdx]

    const handleVerify = () => {
        if (selectedOption === null) return

        if (selectedOption === currentQuestion.correctIndex) {
            setShowError(false)
            if (currentQuestionIdx < questions.length - 1) {
                // Siguiente pregunta
                setTimeout(() => {
                    setCurrentQuestionIdx(prev => prev + 1)
                    setSelectedOption(null)
                }, 500)
            } else {
                // Aprobó todo
                setIsFinished(true)
                setTimeout(() => {
                    onSuccess()
                }, 1500)
            }
        } else {
            // Se equivocó
            setShowError(true)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-[#0a0f1c] rounded-3xl border border-secondary/30 shadow-[0_0_40px_rgba(41,232,255,0.15)] relative overflow-hidden flex flex-col">

                {/* Cabecera */}
                <div className="p-6 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-2 rounded-lg text-secondary">
                            <Brain size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold uppercase tracking-wide text-white">Validación Estricta</h2>
                            <p className="text-sm text-secondary">Nivel {levelNumber}: {levelTitle}</p>
                        </div>
                    </div>
                </div>

                {/* Cuerpo del Quiz */}
                <div className="p-6 flex-1">
                    {isFinished ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 size={40} className="text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase">¡Conocimiento Validado!</h3>
                            <p className="text-muted-foreground">Has demostrado que dominas este nivel. El sistema te otorgará acceso a la siguiente fase.</p>
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-bold text-secondary uppercase tracking-widest border border-secondary/30 px-3 py-1 rounded-full">
                                    Pregunta {currentQuestionIdx + 1} de {questions.length}
                                </span>
                            </div>

                            <p className="text-lg text-white mb-8 leading-relaxed font-medium">
                                {currentQuestion.text}
                            </p>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedOption(idx);
                                            setShowError(false);
                                        }}
                                        className={"w-full text-left p-4 rounded-xl border transition-all duration-200 " + (selectedOption === idx ? "bg-secondary/10 border-secondary shadow-[0_0_15px_rgba(41,232,255,0.2)]" : "bg-white/5 border-white/10 hover:bg-white/10")}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={"w-6 h-6 rounded-full border flex items-center justify-center " + (selectedOption === idx ? "border-secondary" : "border-white/30")}>
                                                {selectedOption === idx && <div className="w-3 h-3 rounded-full bg-secondary" />}
                                            </div>
                                            <span className={"text-sm md:text-base " + (selectedOption === idx ? "text-white font-medium" : "text-white/80")}>
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {showError && (
                                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-center gap-3 animate-in shake duration-300">
                                    <AlertCircle size={20} className="text-destructive flex-shrink-0" />
                                    <p className="text-sm text-destructive font-medium">Respuesta incorrecta. El conocimiento exige precisión. Intenta de nuevo.</p>
                                </div>
                            )}

                            <Button
                                onClick={handleVerify}
                                disabled={selectedOption === null}
                                className="w-full h-14 mt-8 bg-secondary hover:bg-secondary/80 text-black font-bold text-lg uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Verificar Respuesta <Sparkles size={18} className="ml-2" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
