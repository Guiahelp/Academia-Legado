import { Download, FileText } from "lucide-react";

export default function DownloadZone() {
    const handleDownload = () => {
        // Placeholder - Replace with actual PDF link
        window.open("#", "_blank");
    };

    return (
        <div className="mb-10 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-secondary/20">
                    <FileText size={20} className="text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Zona de Descargas
                </h2>
            </div>

            <button
                onClick={handleDownload}
                className="w-full glass-card p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 group border border-white/10 relative overflow-hidden shadow-[0_0_15px_rgba(0,242,255,0.05)] hover:shadow-[0_0_20px_rgba(0,242,255,0.15)]"
            >
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] -z-10 group-hover:bg-secondary/20 transition-colors" />

                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors border border-secondary/20 flex-shrink-0">
                    <Download size={24} className="text-secondary" />
                </div>
                <div className="text-left flex-1 min-w-0">
                    <h3 className="font-bold text-secondary mb-1 tracking-wider uppercase text-sm">DESCARGAR GUÍA DEL ÉXITO</h3>
                    <p className="text-xs text-gray-400 truncate uppercase tracking-widest">Manual completo en PDF para offline</p>
                </div>
            </button>
        </div>
    );
}
