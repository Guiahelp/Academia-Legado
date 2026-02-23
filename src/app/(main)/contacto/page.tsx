"use client";

import { useState } from "react";
import { Play, MessageCircle, Check, X, Volume2, VolumeX, AlertCircle } from "lucide-react";
import LegalModal from "@/shared/components/layout/LegalModal";
import { TERMS_CONTENT, DISCLAIMER_CONTENT, PRIVACY_CONTENT } from "@/shared/lib/legalContent";
import { validateAndSanitize, sanitizeInput } from "@/shared/lib/validation";
import { apiLogger } from "@/shared/lib/logger";

interface Pioneer {
    id: string; name: string; location: string; description: string; photo: string; video?: string;
}

const pioneers: Pioneer[] = [
    { id: "hector-torres", name: "Héctor Torres", location: "Puerto Rico", description: "Empresario digital con 15 años de experiencia y ahora activo en economía colaborativa.", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/hector-torres.webp", video: "https://www.youtube.com/shorts/u25Lnq3v1-E?feature=share", },
    { id: "mario-ramirez", name: "Mario Ramírez", location: "Miami, USA", description: "Emprendedor y creador de Equipos con economía Colaborativa", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/mario-ramirez.webp", video: "https://www.youtube.com/shorts/PDyERfhfv5o?feature=share", },
    { id: "mauricio-munet", name: "Mauricio Munet", location: "Bogotá, Colombia", description: "Empresario digital, sumando a la economía colaborativa", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/mauricio%20munet.webp", video: "https://www.youtube.com/shorts/vsB_JQYrq50?feature=share", },
    { id: "hector-barbosa", name: "Héctor Barbosa", location: "Bogotá, Colombia", description: "Empresario independiente formador de equipos", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/hector-barbosa.webp", video: "https://www.youtube.com/shorts/b1zrarXNy-8?feature=share", },
    { id: "patricia-florido", name: "Patricia Florido", location: "Bogotá, Colombia", description: "Visionaria, creadora de comunidades", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/Patricia-florido-h.webp", video: "https://www.youtube.com/shorts/dfWaoX6Bzbo?feature=share", },
    { id: "juan-turull", name: "Juan Turull", location: "Estados Unidos", description: "Emprendedor visionario", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/juan-turul.PNG", },
    { id: "nidia-aguilar", name: "Nidia Aguilar", location: "Colombia", description: "Emprendedora, visionaria amante de sumar y ser guía", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/nidia-aguilar.webp", video: "https://www.youtube.com/shorts/ICMq10E3Aq4?feature=share", },
    { id: "angel-joel", name: "Ángel Joel", location: "Puerto Rico", description: "Independiente, visionario, emprendedor tecnológico", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/angel-joel.webp", },
    { id: "carlos-mendoza", name: "Carlos Mendoza", location: "Colombia", description: "Empresario digital con 5 años de experiencia en economía colaborativa", photo: "https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/carlos%20mendoza.webp", },
];

const WHATSAPP_GROUP = "https://chat.whatsapp.com/IKZt3Nm3y6o1dBnFPt0LCf";

export default function ContactoPage() {
    const [formData, setFormData] = useState({ name: "", country: "", whatsapp: "" });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [videoPopup, setVideoPopup] = useState<{ videoId: string; title: string } | null>(null);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [legalModal, setLegalModal] = useState<"terms" | "disclaimer" | "privacy" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const extractVideoId = (url: string): string | null => {
        const shortMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) return shortMatch[1];
        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) return watchMatch[1];
        const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortUrlMatch) return shortUrlMatch[1];
        return null;
    };

    const handleWatchTestimony = (pioneer: Pioneer) => {
        if (pioneer.video) {
            const videoId = extractVideoId(pioneer.video);
            if (videoId) setVideoPopup({ videoId, title: pioneer.name });
        }
    };

    const validateField = (field: string, value: string) => {
        if (field === "whatsapp") {
            const digitsOnly = value.replace(/\D/g, '');
            if (!value.trim()) setFormErrors(prev => ({ ...prev, whatsapp: "El WhatsApp es obligatorio" }));
            else if (!/^[\d\s\+\-\(\)]+$/.test(value)) setFormErrors(prev => ({ ...prev, whatsapp: "Solo números, espacios y +/-/()" }));
            else if (digitsOnly.length < 7) setFormErrors(prev => ({ ...prev, whatsapp: "Mínimo 7 dígitos" }));
            else if (digitsOnly.length > 15) setFormErrors(prev => ({ ...prev, whatsapp: "Máximo 15 dígitos" }));
            else setFormErrors(prev => { const newErrors = { ...prev }; delete newErrors.whatsapp; return newErrors; });
            return;
        }
        const testData = { ...formData, [field]: value };
        const result = validateAndSanitize(testData);
        if (!result.success && result.errors && result.errors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: result.errors![field] }));
        } else {
            setFormErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = validateAndSanitize({ name: formData.name, country: formData.country });
        if (!result.success) { setFormErrors(result.errors || {}); return; }
        const whatsappDigits = formData.whatsapp.replace(/\D/g, '');
        if (!formData.whatsapp.trim()) { setFormErrors(prev => ({ ...prev, whatsapp: "El WhatsApp es obligatorio" })); return; }
        if (whatsappDigits.length < 7 || whatsappDigits.length > 15) { setFormErrors(prev => ({ ...prev, whatsapp: "Debe tener entre 7 y 15 dígitos" })); return; }
        if (!acceptedTerms || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxq0r6sCdgbflAYOj7-5VJiIVVUp2yd2M0SmmpTb1yepZzzUtMeKrowlWHxImUCh0OfkA/exec";
            const payload = {
                nombre: sanitizeInput(formData.name.trim()),
                pais: sanitizeInput(formData.country.trim()),
                whatsapp: sanitizeInput(formData.whatsapp.trim()),
                pionero: "",
                perfil: "WebApp Tribu Legado SaaS"
            };
            apiLogger.info('Sending payload to Google Sheets:', payload);
            localStorage.setItem("contact_form_data", JSON.stringify(payload));
            await fetch(googleScriptUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            apiLogger.info('Lead data sent to Google Sheets successfully');
            setShowForm(false);
        } catch (error) {
            apiLogger.error('Failed to send lead data', error);
            setShowForm(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContactPioneer = async (pioneer: Pioneer) => {
        try {
            const storedData = localStorage.getItem("contact_form_data");
            if (storedData) {
                const payload = JSON.parse(storedData);
                payload.pionero = sanitizeInput(pioneer.name);
                apiLogger.info('Sending pioneer update:', payload);
                const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxq0r6sCdgbflAYOj7-5VJiIVVUp2yd2M0SmmpTb1yepZzzUtMeKrowlWHxImUCh0OfkA/exec";
                await fetch(googleScriptUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                apiLogger.info('Pioneer selection updated in Google Sheets');
            }
        } catch (error) {
            apiLogger.error('Failed to update pioneer selection', error);
        }
        window.open(WHATSAPP_GROUP, "_blank");
    };

    if (showForm) {
        return (
            <div className="min-h-[calc(100vh-80px)] p-4 pt-8 flex items-center justify-center">
                <div className="glass-card p-6 rounded-2xl max-w-md w-full animate-scale-in border border-white/10 shadow-neon-primary">
                    <h1 className="text-3xl font-bold text-center mb-2 tracking-tight uppercase">
                        <span className="text-primary">Conecta</span> con Pioneros
                    </h1>
                    <p className="text-gray-400 text-center text-sm mb-6 uppercase tracking-widest font-medium">
                        Antes de conectar, cuéntanos un poco sobre ti
                    </p>

                    <form onSubmit={handleSubmitForm} className="space-y-5">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-300">Tu Nombre</label>
                            <input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className={`w-full p-4 rounded-xl bg-black/50 border transition-all duration-300 outline-none ${formErrors.name ? 'border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]'}`} placeholder="Solo letras y espacios" required />
                            {formErrors.name && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-300">Tu País</label>
                            <input type="text" value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} className={`w-full p-4 rounded-xl bg-black/50 border transition-all duration-300 outline-none ${formErrors.country ? 'border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]'}`} placeholder="Solo letras y espacios" required />
                            {formErrors.country && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.country}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-300">Tu WhatsApp <span className="text-red-500">*</span></label>
                            <input type="tel" value={formData.whatsapp} onChange={(e) => handleInputChange("whatsapp", e.target.value)} className={`w-full p-4 rounded-xl bg-black/50 border transition-all duration-300 outline-none ${formErrors.whatsapp ? 'border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-primary shadow-[0_0_15px_rgba(217,70,239,0.1)]'}`} placeholder="+1 234 567 8900" required />
                            {formErrors.whatsapp && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.whatsapp}</p>}
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                            <button type="button" onClick={() => setAcceptedTerms(!acceptedTerms)} className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors border ${acceptedTerms ? "bg-primary border-primary" : "bg-black/50 border-white/20"}`}>
                                {acceptedTerms && <Check size={14} className="text-white" />}
                            </button>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                He leído y acepto los <button type="button" onClick={() => setLegalModal("terms")} className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/50 underline-offset-2">términos y condiciones</button>, el <button type="button" onClick={() => setLegalModal("disclaimer")} className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/50 underline-offset-2">disclaimer</button> y la <button type="button" onClick={() => setLegalModal("privacy")} className="text-primary hover:text-primary/80 transition-colors underline decoration-primary/50 underline-offset-2">política de privacidad</button> de Tribu Legado.
                            </p>
                        </div>

                        <button type="submit" disabled={!formData.name || !formData.country || !formData.whatsapp || !acceptedTerms || isSubmitting || Object.keys(formErrors).length > 0} className="btn-neon-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 text-sm tracking-wider uppercase">
                            {isSubmitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</> : "Ver Pioneros Master"}
                        </button>
                    </form>
                </div>

                <LegalModal isOpen={legalModal === "terms"} onClose={() => setLegalModal(null)} title="Términos y Condiciones" content={TERMS_CONTENT} />
                <LegalModal isOpen={legalModal === "disclaimer"} onClose={() => setLegalModal(null)} title="Descargo de Responsabilidad" content={DISCLAIMER_CONTENT} />
                <LegalModal isOpen={legalModal === "privacy"} onClose={() => setLegalModal(null)} title="Política de Privacidad" content={PRIVACY_CONTENT} />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 pt-8 pb-32 max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-center mb-2 tracking-tight uppercase">
                <span className="text-primary">Pioneros</span> Legado
            </h1>
            <p className="text-gray-400 text-center text-xs uppercase tracking-widest font-medium mb-10">
                Elige a tu mentor y comienza tu viaje al éxito
            </p>

            <div className="space-y-6">
                {pioneers.map((pioneer, i) => (
                    <div key={pioneer.id} className={`glass-card p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors animate-slide-up ${!pioneer.video ? 'opacity-50 hover:opacity-100' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="flex gap-4">
                            <img src={pioneer.photo} alt={pioneer.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-secondary shadow-[0_0_15px_rgba(0,242,255,0.3)]" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-white tracking-tight">{pioneer.name}</h3>
                                <p className="text-secondary text-xs uppercase tracking-widest font-bold mb-1">{pioneer.location}</p>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{pioneer.description}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-5">
                            {pioneer.video && (
                                <button onClick={() => handleWatchTestimony(pioneer)} className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-accent/50 hover:bg-accent/10 transition-colors text-accent">
                                    <Play size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Testimonio</span>
                                </button>
                            )}
                            <button onClick={() => handleContactPioneer(pioneer)} className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors border ${pioneer.video ? 'bg-primary/20 border-primary/50 text-white hover:bg-primary/30' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                <MessageCircle size={16} /> Contactar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {videoPopup && (
                <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-fade-in">
                    <div className="w-full max-w-sm flex items-center justify-between mb-6">
                        <button onClick={() => setIsVideoMuted(!isVideoMuted)} className="p-3 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                            {isVideoMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                        </button>
                        <h3 className="text-sm font-bold text-primary flex-1 text-center px-4 uppercase tracking-wider line-clamp-1">{videoPopup.title}</h3>
                        <button onClick={() => setVideoPopup(null)} className="p-3 rounded-full hover:bg-red-500/20 transition-colors border border-white/10">
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '9/16', maxHeight: '70vh' }}>
                        <iframe src={`https://www.youtube.com/embed/${videoPopup.videoId}?autoplay=1&rel=0&modestbranding=1${isVideoMuted ? '&mute=1' : ''}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full bg-black" />
                    </div>

                    <button onClick={() => setVideoPopup(null)} className="w-full max-w-sm mt-8 py-4 rounded-xl border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                        Cerrar Video
                    </button>
                </div>
            )}

            <LegalModal isOpen={legalModal === "terms"} onClose={() => setLegalModal(null)} title="Términos y Condiciones" content={TERMS_CONTENT} />
            <LegalModal isOpen={legalModal === "disclaimer"} onClose={() => setLegalModal(null)} title="Descargo de Responsabilidad" content={DISCLAIMER_CONTENT} />
            <LegalModal isOpen={legalModal === "privacy"} onClose={() => setLegalModal(null)} title="Política de Privacidad" content={PRIVACY_CONTENT} />
        </div>
    );
}
