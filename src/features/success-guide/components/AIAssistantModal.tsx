'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Mic, Send, Bot, CheckCircle2, UserPlus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { successGuideService } from '../services/successGuideService';
import { useAIAgents } from '@/features/agents/hooks/useAIAgents';
import { ProspectForm } from './ProspectForm';

interface AIAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    stepTitle: string;
    stepId: number;
}

type ChatMessage = { role: 'assistant' | 'user' | 'system', content: string };

const NIKOLA_IMAGE = "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/agent-nikola.webp";

const NIKOLA_RESPONSES: Record<number, Record<string, string>> = {
    2: {
        "familia": "La familia es el motor más potente, pero también la responsabilidad más grande. Si lo haces por ellos, no tienes permiso de rendirte.",
        "libertad": "Libertad no es hacer nada, es tener el poder de elegir qué hacer. Con este vehículo, esa libertad está a un contrato de distancia.",
        "viajar": "El mundo es grande, pero tu zona de confort es pequeña. Vamos a expandirla. El primer viaje lo paga tu enfoque de hoy.",
        "default": "Ese 'Por Qué' debe quemarte por dentro. Si no te quita el sueño, no es lo suficientemente grande. Piénsalo bien."
    },
    3: {
        "funciona": "Es simple: Economía colaborativa + Smart Contracts. Tú aportas visión, el sistema aporta la infraestructura inquebrantable.",
        "paga": "Pagos directos a tu billetera. Sin intermediarios, sin jefes de nómina, sin retrasos. Transparencia total en la blockchain.",
        "default": "El vehículo es pura ingeniería financiera. Mi trabajo es que tú sepas conducirlo a máxima velocidad."
    },
    4: {
        "agregar": "Toma el control. Llena este formato con los datos de tu prospecto. Clasifícalo con honestidad: ¿es alguien que suma o solo bulto?",
        "clasifico": "Caliente es gente que confía en ti. Frío es gente que aún no sabe quién eres. Prospecto es el que ya vio algo. Equipo es el que ya firmó.",
        "default": "Tu lista es tu inventario. Sin inventario, no hay tienda. ¿A quién vamos a subir al barco hoy?"
    },
    5: {
        "tiktok": "TikTok no quiere perfección, quiere consistencia. Sube 3 videos al día sobre tu proceso. No vendas, educa.",
        "historias": "Muestra que eres una persona real con metas reales. 1 historia de estilo de vida por cada 2 de negocio. Equilibrio.",
        "default": "El contenido es tu anzuelo. Si el anzuelo es malo, no pescas nada. Hagamos que ese contenido sea irresistible."
    },
    6: {
        "amigo": "A los amigos háblales directo: 'Bro, encontré un sistema basado en contratos inteligentes y me acordé de ti. Vamos a hacer dinero, dime cuándo tienes 15 min para mostrarte.'",
        "desconocido": "Postura profesional: 'Hola [Nombre]. Vi tu perfil y tienes el nivel para lo que estamos armando en Tribu Legado. Es tecnología web3 y ganancias pasivas. ¿Te interesa ver los detalles?'",
        "llamada": "La llamada NO es para presentar. Es para agendar. Genera urgencia: 'Estoy por entrar a una reunión, pero me urge mostrarte algo. ¿Te conectas a las 8 o a las 9?'. Fin.",
        "default": "La invitación es el filtro, no el cierre. Genera curiosidad y urgencia. Menos palabras, más postura."
    },
    7: {
        "día": "Día 3 es crucial. Mensaje corto: 'Hermano, el equipo sigue creciendo. Me quedan pocos espacios para trabajar directo esta semana y quiero que uno sea tuyo. ¿Dudas o firmamos?'",
        "no": "Un 'No' de un prospecto no es personal, es falta de información o mal timing. No ruegues. Diles: 'Entendido. Seguiré construyendo'. Ponlos en seguimiento a 30 días.",
        "cierre": "El cierre es pura postura. Pregunta directo: 'Del 1 al 10, ¿qué tan listo estás para arrancar?'. Si es 10, manda el link. Si es menos, pregunta: '¿Qué falta para llegar a 10?'",
        "default": "La fortuna está en el seguimiento. La clave es dar valor extra en cada contacto sin parecer desesperado."
    },
    8: {
        "tutorial": "Tu primer paso oficial es repasar el Nivel 0 de la Academia. Es la base de todo. No intentes inventar la rueda si ya tenemos el sistema que funciona.",
        "pasos": "Siguientes pasos: 1) Configurar tu wallet. 2) Adquirir los USDT/MATIC. 3) Ingresar a tu primer tablero. ¡Acción!",
        "telegram": "El grupo de Telegram no es opcional, es tu salvavidas. Es la tribu. Si no estás ahí conectando y viendo el fuego del equipo, te vas a enfriar rápido.",
        "default": "La bienvenida es cuando el reloj real empieza a correr. Queremos verte ganar dinero en tus primeras 48 horas."
    },
    9: {
        "números": "Lo que no se mide, no crece. Revisa tus stats: ¿A cuántos invitaste? ¿Cuántos vieron la info? Optimiza el paso donde estás perdiendo más gente.",
        "días": "El plan de 90 días separa a los líderes de los turistas. Consistencia brutal por 3 meses y tu negocio será irreconocible. No frenes.",
        "rango": "Para subir al siguiente nivel de tableros necesitas duplicación. No se trata de cuántos metes tú, sino de cuántos de tu equipo están usando esta misma guía.",
        "default": "La mejora continua es la marca de un empresario real. Nunca te conformes con los resultados de ayer."
    }
}

export function AIAssistantModal({ isOpen, onClose, stepTitle, stepId }: AIAssistantModalProps) {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const { context: agentContext, loading: agentLoading } = useAIAgents('nikola');
    const [step1State, setStep1State] = useState(0);
    const [intentionData, setIntentionData] = useState({ meta_financiera: '', compromiso_tiempo: '', sacrificio: '' });
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Initial message based on step
    useEffect(() => {
        if (agentLoading) return;

        if (isOpen && chatHistory.length === 0) {
            if (stepId === 1) {
                successGuideService.getIntentionData().then(data => {
                    if (data && data.meta_financiera) {
                        setStep1State(3);
                        const memoryGreetings = agentContext?.metaFinanciera
                            ? `¡Qué gusto saludarte de nuevo ${agentContext.userName}! Aún tengo súper presente esa meta de ${agentContext.metaFinanciera} que me compartiste. Tu Acuerdo de Éxito sigue activo, ¡así que continuemos hacia adelante!`
                            : '¡Hola! Qué bueno tenerte acá devuelta. Sigamos avanzando con todo.';
                        setChatHistory([{
                            role: 'assistant',
                            content: memoryGreetings
                        }]);
                    } else {
                        setChatHistory([{
                            role: 'assistant',
                            content: `¡Hola${agentContext?.userName ? ` ${agentContext.userName}` : ''}! Qué alegría que estés por aquí. Antes de ponernos manos a la obra con todo este mundo digital, me encantaría conocerte un poquito mejor. Así podré guiarte de forma más precisa.
\nCuéntame con confianza: **¿Qué objetivo económico principal te gustaría alcanzar con este proyecto?** (Ej: "$1,000 USD extra para estar más tranquilo a fin de mes")`
                        }]);
                        setStep1State(0);
                    }
                });
            } else {
                setChatHistory([
                    {
                        role: 'assistant',
                        content: `¡Excelente verte en esta sección! Llegamos al Paso ${stepId}: "${stepTitle}". ¿Cómo te sientes con esto? ¿Empezamos o tienes alguna pregunta primero?`
                    }
                ]);
            }
        }
    }, [isOpen, chatHistory.length, stepId, stepTitle, agentContext, agentLoading]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        // --- Integración Web Speech API (Voz Nativa) ---
        if (chatHistory.length > 0) {
            const lastMsg = chatHistory[chatHistory.length - 1];
            if (lastMsg.role === 'assistant' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const textToSpeak = lastMsg.content.replace(/[*_✅]/g, '').trim();
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'es-ES';
                utterance.rate = 1.05;
                utterance.pitch = 0.9; // Tono más grave

                const voices = window.speechSynthesis.getVoices();
                const esVoices = voices.filter(v => v.lang.startsWith('es'));
                const bestVoice = esVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('pablo')) || esVoices[0];
                if (bestVoice) {
                    utterance.voice = bestVoice;
                }

                // Pequeño delay para que no empiece a hablar antes de que el usuario vea el texto bien
                setTimeout(() => window.speechSynthesis.speak(utterance), 100);
            }
        }
    }, [chatHistory, showForm]);

    if (!isOpen || !mounted) return null;

    const getDynamicResponse = (userMsg: string) => {
        const lowerMsg = userMsg.toLowerCase();
        const stepResponses = NIKOLA_RESPONSES[stepId] || {};

        for (const key in stepResponses) {
            if (lowerMsg.includes(key)) return stepResponses[key];
        }

        return stepResponses["default"] || "Interesante. Pero no perdamos el foco. El objetivo del Paso " + stepId + " es lo único que importa ahora.";
    };

    const processStep1Logic = async (userMsg: string, newHistory: ChatMessage[]) => {
        if (step1State === 0) {
            const hasNumbers = /\d/.test(userMsg);
            if (!hasNumbers) {
                setTimeout(() => {
                    setChatHistory(h => [...h, { role: 'assistant', content: 'Me encantan esos sueños, pero ayúdame a aterrizarlos en una cifra concreta para poder hacer un plan juntos. ¿De cuánto dinero estaríamos hablando?' }]);
                }, 600);
                return;
            }

            setIntentionData(prev => ({ ...prev, meta_financiera: userMsg }));
            setStep1State(1);
            setTimeout(() => {
                setChatHistory(h => [...h, { role: 'assistant', content: '¡Me encanta! Vamos a trabajar duro por ello.\n\nAhora, siendo súper realistas con tu día a día: **¿Cuántas horas a la semana crees que podrías dedicarle a esto con buen nivel de enfoque?**' }]);
            }, 600);
        } else if (step1State === 1) {
            const hasTimeReference = /(\d|hora|hr|dia|día|minuto|semana|mes)/i.test(userMsg);
            if (!hasTimeReference) {
                setTimeout(() => {
                    setChatHistory(h => [...h, { role: 'assistant', content: 'Entendido, pero para medir el progreso, ¿podrías darme un aproximado en horas, días o minutos? Solo para tener una mejor ideal de tu disponibilidad.' }]);
                }, 600);
                return;
            }

            setIntentionData(prev => ({ ...prev, compromiso_tiempo: userMsg }));
            setStep1State(2);
            setTimeout(() => {
                setChatHistory(h => [...h, { role: 'assistant', content: 'Anotado. El tiempo es valioso.\n\nComo último detalle: sé que todos estamos ocupados, lograr resultados implica hacer espacio. **¿Qué actividad cotidiana (como ver series, jugar, salir un poco menos) estarías dispuesto a reducir temporalmente para enfocarte en tu meta?**' }]);
            }, 600);
        } else if (step1State === 2) {
            if (userMsg.trim().length < 5) {
                setTimeout(() => {
                    setChatHistory(h => [...h, { role: 'assistant', content: '¡Seguro puedes ser un poco más específico! Cuéntame exactamente qué pequeño hábito diario o entretenimiento vas a posponer un ratito.' }]);
                }, 600);
                return;
            }

            const finalData = { ...intentionData, sacrificio: userMsg };
            setIntentionData(finalData);
            setStep1State(3);

            setTimeout(() => {
                setChatHistory(h => [...h, { role: 'assistant', content: 'Registrando tus increíbles metas e intenciones en tu perfil...' }]);
            }, 500);

            const saveIntention = async () => {
                try {
                    await new Promise(r => setTimeout(r, 1500));
                    await successGuideService.saveIntention(finalData);
                    setStep1State(4);
                    setChatHistory(h => [...h, { role: 'system', content: '✅ Acuerdo de Éxito Establecido' }, { role: 'assistant', content: '¡Listo! Me ha encantado escucharte. Ahora que conocemos tus metas de fondo, trabajaremos 100% enfocados en ellas. Tienes luz verde para avanzar al Paso 2 con total confianza.' }]);
                } catch (error) {
                    setStep1State(4);
                    setChatHistory(h => [...h, { role: 'assistant', content: 'Hecho. Todo registrado. ¡Es un súper buen primer paso! Vamos por el Paso 2.' }]);
                }
            };

            saveIntention();
        }
    };

    const handleSend = (textOverride?: string) => {
        const textToSearch = textOverride || message;
        if (!textToSearch.trim()) return;

        const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: textToSearch }];
        setChatHistory(newHistory);
        const userMsg = textToSearch;
        setMessage('');

        if (stepId === 1 && step1State < 3) {
            processStep1Logic(userMsg, newHistory);
        } else {
            // Logic for Step 4 Form
            if (stepId === 4 && userMsg.toLowerCase().includes('agregar')) {
                setShowForm(true);
            }

            // Llamada dinámica a AI real
            setChatHistory(h => [...h, { role: 'assistant', content: '...' }]); // Estado "Escribiendo" temporal
            setTimeout(async () => {
                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messages: newHistory,
                            systemPrompt: agentContext?.systemPrompt
                        })
                    });

                    if (!response.ok) throw new Error('Error network');
                    const data = await response.json();

                    setChatHistory(h => {
                        const copy = [...h];
                        copy[copy.length - 1] = { role: 'assistant', content: data.text };
                        return copy;
                    });
                } catch (error) {
                    // Fallback a las respuestas estáticas en caso de que falte la API Key o falle internet
                    const response = getDynamicResponse(userMsg);
                    setChatHistory(h => {
                        const copy = [...h];
                        copy[copy.length - 1] = { role: 'assistant', content: response };
                        return copy;
                    });
                }
            }, 300);
        }
    };

    // Suggestions mapping for all 9 steps
    const getSuggestions = () => {
        switch (stepId) {
            case 1:
                if (step1State === 0) return ["$500 USD", "$1,000 USD", "$3,000 USD"];
                if (step1State === 1) return ["5-10 horas", "15-20 horas", "20+ horas"];
                if (step1State === 2) return ["Menos Netflix", "Menos Redes", "Dormir menos"];
                return [];
            case 2: return ["Libertad financiera", "Tiempo con mi familia", "Viajar por el mundo"];
            case 3: return ["¿Cómo funciona el sistema?", "¿Qué es un Smart Contract?", "¿Cómo paga la plataforma?"];
            case 4: return ["¿Cómo agrego contactos?", "¿Cómo clasifico a mi gente?", "Agregar contacto ahora"];
            case 5: return ["Sugerir copy para TikTok", "Ideas para historias de hoy", "Tips de edición rápida"];
            case 6: return ["Script para un amigo", "Script para alguien desconocido", "¿Qué decir en la llamada?"];
            case 7: return ["¿Qué decir al 3er día?", "¿Cómo manejar un 'No'?", "Cierre efectivo"];
            case 8: return ["Tutorial inicio rápido", "¿Cuáles son los siguientes pasos?", "Unirse al grupo Telegram"];
            case 9: return ["Analizar mis números", "Crear plan de 90 días", "¿Cómo subo de rango?"];
            default: return [];
        }
    };

    const suggestions = getSuggestions();

    const getProgress = () => {
        if (stepId === 1) return ((step1State) / 3) * 100;
        return 50;
    };

    const progress = getProgress();

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="w-full max-w-2xl bg-[#0a0f1c] rounded-3xl border border-white/10 flex flex-col h-[85vh] max-h-[700px] animate-scale-in shadow-2xl relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
                    <div className="h-full bg-primary shadow-[0_0_10px_rgba(255,211,0,0.5)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 pt-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-primary/50 flex items-center justify-center relative shadow-neon-primary overflow-hidden bg-black">
                            <img src={NIKOLA_IMAGE} alt="Nikola" className="w-full h-full object-cover opacity-90" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0f1c] animate-pulse"></div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold leading-tight flex items-center gap-2">Asistente Nikola</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-primary uppercase font-bold tracking-widest leading-none">Paso {stepId}</p>
                                <span className="text-[10px] text-white/40">•</span>
                                <p className="text-[10px] text-white/60 uppercase font-medium tracking-tighter leading-none">{stepTitle}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-white/50 hover:text-white rounded-full">
                        <X size={20} />
                    </Button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-center sm:justify-start'} animate-slide-up`}>
                            {msg.role === 'system' ? (
                                <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 my-2 shadow-[0_0_15px_rgba(255,211,0,0.05)]">
                                    <CheckCircle2 size={14} />
                                    {msg.content}
                                </div>
                            ) : (
                                <div
                                    className={`max-w-[85%] rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${msg.role === 'user'
                                        ? 'bg-primary text-black font-semibold rounded-tr-sm shadow-[0_5px_15px_rgba(255,211,0,0.2)]'
                                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-sm backdrop-blur-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Integrated Form Feature */}
                    {showForm && (
                        <div className="animate-slide-up">
                            <ProspectForm
                                onSuccess={() => {
                                    setShowForm(false);
                                    setChatHistory(h => [...h, { role: 'system', content: '✅ Contacto Agregado a la Agenda' }, { role: 'assistant', content: 'Perfecto. Ya lo tienes en tu Centro de Operaciones. No dejes que se enfríe, el seguimiento es lo que diferencia a los empresarios de los aficionados.' }]);
                                }}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input and Suggestions Area */}
                <div className="p-4 border-t border-white/10 bg-black/40 shrink-0 backdrop-blur-xl z-10 relative">
                    {/* Suggestions */}
                    {suggestions.length > 0 && !showForm && (
                        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                            {suggestions.map((suggest, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(suggest)}
                                    className="shrink-0 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-primary hover:text-black hover:border-primary transition-all active:scale-95 whitespace-nowrap"
                                >
                                    {suggest}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="shrink-0 text-white/50 hover:text-white rounded-full bg-white/5 border border-white/10 hidden sm:flex">
                            <Mic size={18} />
                        </Button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={showForm ? "Completa el formulario arriba..." : "Escribe tu respuesta aquí..."}
                                disabled={showForm || (stepId === 1 && step1State >= 3)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50"
                            />
                        </div>
                        <Button
                            onClick={() => handleSend()}
                            size="icon"
                            className="shrink-0 w-12 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-black shadow-lg disabled:opacity-30 disabled:grayscale transition-all"
                            disabled={!message.trim() || showForm || (stepId === 1 && step1State >= 3)}
                        >
                            <Send size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
