"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, HelpCircle, Sparkles, DollarSign, Calculator, Users, Gem, Layers, Flag, Crown, ArrowUp, Target, PiggyBank, Coins, TrendingUp, RefreshCw, HeartHandshake, Gift, Network, Zap, Link, Percent, Bot, Rocket, Award, Star, Medal, Key, Trophy, Flame, Infinity, Shield, Anchor, Timer, Eye, Brain, Globe, Compass, Wallet, Loader2 } from "lucide-react";
import { faqData } from "@/shared/lib/faqData";

const iconMap: Record<string, React.ReactNode> = {
    DollarSign: <DollarSign size={24} />, Calculator: <Calculator size={24} />, Users: <Users size={24} />, Gem: <Gem size={24} />, Layers: <Layers size={24} />, Flag: <Flag size={24} />, Crown: <Crown size={24} />, ArrowUp: <ArrowUp size={24} />, Target: <Target size={24} />, PiggyBank: <PiggyBank size={24} />, Coins: <Coins size={24} />, TrendingUp: <TrendingUp size={24} />, RefreshCw: <RefreshCw size={24} />, HeartHandshake: <HeartHandshake size={24} />, Sparkles: <Sparkles size={24} />, Gift: <Gift size={24} />, Network: <Network size={24} />, Zap: <Zap size={24} />, Link: <Link size={24} />, Percent: <Percent size={24} />, Bot: <Bot size={24} />, Rocket: <Rocket size={24} />, Award: <Award size={24} />, Star: <Star size={24} />, Medal: <Medal size={24} />, Key: <Key size={24} />, Trophy: <Trophy size={24} />, Flame: <Flame size={24} />, Infinity: <Infinity size={24} />, Shield: <Shield size={24} />, Anchor: <Anchor size={24} />, Timer: <Timer size={24} />, Eye: <Eye size={24} />, Globe: <Globe size={24} />, Compass: <Compass size={24} />, Brain: <Brain size={24} />, Wallet: <Wallet size={24} />, HelpCircle: <HelpCircle size={24} />,
};

interface ExpandModalProps {
    question: string; answer: string; color: string; isOpen: boolean; onClose: () => void;
}

const ExpandModal = ({ question, answer, color, isOpen, onClose }: ExpandModalProps) => {
    const [expandedAnswer, setExpandedAnswer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setExpandedAnswer(null);
            setIsLoading(false);
            return;
        }

        const fetchExpandedAnswer = async () => {
            setIsLoading(true);
            try {
                const systemPrompt = `Eres Albert Einstein, el Estratega de Marketing e IA de Tribu Legado. Tu tarea es expandir una respuesta breve de Preguntas Frecuentes de la Academia. Sé hiperdidáctico, usa analogías fascinantes y mucha energía. No te extiendas más de 2 párrafos. Mantén el misterio y el profesionalismo.`;
                const promptMsg = `Expande esta pregunta frecuente detalladamente para un nuevo integrante:\nPregunta: ${question}\nRespuesta Breve a expandir: ${answer}`;

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [{ role: 'user', content: promptMsg }],
                        systemPrompt: systemPrompt
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setExpandedAnswer(data.text);
                } else {
                    setExpandedAnswer(answer);
                }
            } catch (err) {
                setExpandedAnswer(answer);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpandedAnswer();
    }, [isOpen, question, answer]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-lg rounded-2xl p-6 animate-scale-in border-2 relative" onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(135deg, hsl(240 10% 8%) 0%, hsl(220 15% 5%) 100%)', borderColor: `hsl(${color} / 0.6)`, boxShadow: `0 0 40px hsl(${color} / 0.3)` }}>
                {isLoading && (
                    <div className="absolute top-4 right-4 animate-pulse pt-1">
                        <Loader2 size={24} className="animate-spin" style={{ color: `hsl(${color})` }} />
                    </div>
                )}
                <h3 className="text-lg font-bold mb-4 leading-tight pr-6" style={{ color: `hsl(${color})` }}>{question}</h3>
                <div className="min-h-[100px] flex items-center">
                    {isLoading ? (
                        <p className="text-foreground/50 leading-relaxed text-sm animate-pulse italic flex items-center gap-2">
                            Aguarde. El Agente Albert está procesando e integrando la respuesta en tiempo real...
                        </p>
                    ) : (
                        <div className="text-foreground leading-relaxed text-sm space-y-3 whitespace-pre-wrap animate-fade-in">
                            {expandedAnswer}
                        </div>
                    )}
                </div>
                <button onClick={onClose} className="mt-8 w-full py-3 rounded-xl font-bold transition-all hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, hsl(${color} / 0.2), hsl(${color} / 0.1))`, border: `1px solid hsl(${color} / 0.5)`, color: `hsl(${color})` }}>Entendido</button>
            </div>
        </div>
    );
};

const FlipCardFAQ = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [expandModal, setExpandModal] = useState<{ question: string; answer: string; color: string } | null>(null);

    const currentFAQ = faqData[currentIndex];
    const currentIcon = iconMap[currentFAQ.icon] || <HelpCircle size={24} />;

    const goToPrevious = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev === 0 ? faqData.length - 1 : prev - 1)), 150);
    };
    const goToNext = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev === faqData.length - 1 ? 0 : prev + 1)), 150);
    };

    return (
        <div className="mt-8 mb-8">
            <div className="section-header mb-4 px-2">
                <h2 className="text-lg font-bold text-secondary flex items-center gap-2"><HelpCircle size={20} /> Preguntas Frecuentes</h2>
                <p className="text-xs text-muted-foreground mt-1">Toca la tarjeta para ver la respuesta</p>
            </div>

            <div className="flex justify-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `hsl(${currentFAQ.color} / 0.1)`, border: `1px solid hsl(${currentFAQ.color} / 0.3)`, color: `hsl(${currentFAQ.color})` }}>
                    {currentIndex + 1} de {faqData.length}
                </span>
            </div>

            <div className="relative px-4">
                <div className="relative mx-auto cursor-pointer" style={{ perspective: '1000px', maxWidth: '360px', height: '280px' }} onClick={() => setIsFlipped(!isFlipped)}>
                    <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

                        {/* Front Side */}
                        <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center items-center text-center" style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(180deg, hsl(240 15% 8%) 0%, hsl(260 20% 5%) 100%)', border: `2px solid hsl(${currentFAQ.color} / 0.5)`, boxShadow: `0 0 30px hsl(${currentFAQ.color} / 0.2)` }}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `hsl(${currentFAQ.color} / 0.15)`, border: `1px solid hsl(${currentFAQ.color} / 0.4)`, color: `hsl(${currentFAQ.color})` }}>{currentIcon}</div>
                            <p className="text-foreground font-bold text-base leading-relaxed">{currentFAQ.question}</p>
                            <p className="text-muted-foreground text-xs mt-4 flex items-center gap-1"><span className="animate-pulse">👆</span> Toca para ver respuesta</p>
                        </div>

                        {/* Back Side */}
                        <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(180deg, hsl(240 15% 8%) 0%, hsl(220 20% 5%) 100%)', border: `2px solid hsl(${currentFAQ.color} / 0.6)`, boxShadow: `0 0 30px hsl(${currentFAQ.color} / 0.25)` }}>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: `hsl(${currentFAQ.color} / 0.15)`, border: `1px solid hsl(${currentFAQ.color} / 0.4)`, color: `hsl(${currentFAQ.color})` }}><Sparkles size={20} /></div>
                                <p className="text-foreground text-center leading-relaxed text-sm line-clamp-4">{currentFAQ.answer}</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setExpandModal(currentFAQ); }} className="self-end flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105" style={{ background: `hsl(${currentFAQ.color} / 0.1)`, border: `1px solid hsl(${currentFAQ.color} / 0.3)`, color: `hsl(${currentFAQ.color})` }}><Maximize2 size={12} /> Ampliar</button>
                        </div>
                    </div>
                </div>

                <button onClick={goToPrevious} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10" style={{ background: 'hsl(240 10% 10% / 0.9)', border: `1px solid hsl(${currentFAQ.color} / 0.3)` }}><ChevronLeft size={20} style={{ color: `hsl(${currentFAQ.color})` }} /></button>
                <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10" style={{ background: 'hsl(240 10% 10% / 0.9)', border: `1px solid hsl(${currentFAQ.color} / 0.3)` }}><ChevronRight size={20} style={{ color: `hsl(${currentFAQ.color})` }} /></button>
            </div>

            <div className="mt-6 px-4">
                <div className="h-1 rounded-full overflow-hidden bg-white/10">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / faqData.length) * 100}%`, background: `linear-gradient(90deg, hsl(${currentFAQ.color}), hsl(${faqData[(currentIndex + 1) % faqData.length]?.color || currentFAQ.color}))` }} />
                </div>
            </div>

            <ExpandModal question={expandModal?.question || ''} answer={expandModal?.answer || ''} color={expandModal?.color || '183 100% 50%'} isOpen={!!expandModal} onClose={() => setExpandModal(null)} />
        </div>
    );
};

export default FlipCardFAQ;
