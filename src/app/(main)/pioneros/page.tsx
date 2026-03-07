'use client'

import { useState } from 'react'
import { MessageCircle, Play, X, ChevronDown, ChevronUp, Star, Users, Sparkles, Award } from 'lucide-react'

// ─── Datos de Pioneros ───────────────────────────────────────────────────────
const PIONEROS = [
  {
    id: 1,
    nombre: 'Carlos M.',
    pais: '🇨🇴 Colombia',
    nivel: 'Pionero Diamante',
    foto: 'https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/albert.webp',
    historia: 'Llegué a Tribu Legado sin ningún conocimiento de criptomonedas. En mi primer mes ya había recuperado mi inversión inicial y construido un equipo de 12 personas activas. El sistema hace el trabajo por ti.',
    logro: 'Recuperó su inversión en 28 días',
    videoId: 'Q2B8PkeUHQI',
    whatsapp: 'https://wa.me/573001234567?text=Hola%20Carlos%2C%20vi%20tu%20testimonio%20en%20Tribu%20Legado',
    estrellas: 5,
    colorAccent: '#D946EF',
  },
  {
    id: 2,
    nombre: 'María G.',
    pais: '🇲🇽 México',
    nivel: 'Pionera Cristal',
    foto: 'https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/agent-nikola.webp',
    historia: 'Como mamá de tiempo completo, necesitaba algo que pudiera manejar desde mi celular. La academia de Tribu me enseñó todo paso a paso. Ahora genero ingresos extra que me permiten más tiempo con mis hijos.',
    logro: 'Genera ingresos desde el celular',
    videoId: 'HYgvMz8Bnok',
    whatsapp: 'https://wa.me/5219991234567?text=Hola%20María%2C%20vi%20tu%20testimonio%20en%20Tribu%20Legado',
    estrellas: 5,
    colorAccent: '#22D3EE',
  },
  {
    id: 3,
    nombre: 'Roberto T.',
    pais: '🇵🇪 Perú',
    nivel: 'Pionero Cristal',
    foto: 'https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/albert.webp',
    historia: 'Era escéptico al principio. Mi esposa me convenció de probar. Hoy somos los dos parte de Tribu y juntos construimos un equipo de 30 personas. Los Smart Contracts son transparentes, eso me dio confianza.',
    logro: 'Construyó equipo de 30 personas',
    videoId: 'KbR0RLP0IXM',
    whatsapp: 'https://wa.me/519991234567?text=Hola%20Roberto%2C%20vi%20tu%20testimonio%20en%20Tribu%20Legado',
    estrellas: 5,
    colorAccent: '#84CC16',
  },
  {
    id: 4,
    nombre: 'Ana L.',
    pais: '🇻🇪 Venezuela',
    nivel: 'Pionera Cristal',
    foto: 'https://iughqygysiictpqvcgxq.supabase.co/storage/v1/object/public/assets/Tribu/agent-nikola.webp',
    historia: 'Con la situación económica de mi país, necesitaba una alternativa real. Tribu Legado me enseñó a manejar mis finanzas en la economía digital y a construir una fuente de ingresos en dólares.',
    logro: 'Ingresos en dólares desde Venezuela',
    videoId: 'rUstOZhKEZ0',
    whatsapp: 'https://wa.me/584141234567?text=Hola%20Ana%2C%20vi%20tu%20testimonio%20en%20Tribu%20Legado',
    estrellas: 5,
    colorAccent: '#F97316',
  },
]

// ─── Modal de Video ───────────────────────────────────────────────────────────
function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md">
        <button
          onClick={onClose}
          className="ml-auto flex items-center gap-2 text-zinc-400 hover:text-white mb-3 text-sm transition-colors"
        >
          <X className="w-4 h-4" /> Cerrar
        </button>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

// ─── Card de Pionero ──────────────────────────────────────────────────────────
function PioneroCard({ pionero }: { pionero: typeof PIONEROS[0] }) {
  const [expandida, setExpandida] = useState(false)
  const [videoAbierto, setVideoAbierto] = useState(false)

  return (
    <>
      {videoAbierto && (
        <VideoModal videoId={pionero.videoId} onClose={() => setVideoAbierto(false)} />
      )}

      <div
        className="border border-white/10 rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        {/* Cabecera del pionero */}
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4">
            {/* Foto */}
            <div className="relative shrink-0">
              <img
                src={pionero.foto}
                alt={pionero.nombre}
                className="w-16 h-16 rounded-full object-cover border-2"
                style={{ borderColor: pionero.colorAccent }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: pionero.colorAccent }}
              >
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-black text-white text-lg leading-tight">{pionero.nombre}</p>
              <p className="text-zinc-500 text-xs">{pionero.pais}</p>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 inline-block"
                style={{ color: pionero.colorAccent, background: `${pionero.colorAccent}15` }}
              >
                {pionero.nivel}
              </span>
            </div>

            {/* Estrellas */}
            <div className="flex gap-0.5 shrink-0">
              {Array.from({ length: pionero.estrellas }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Logro destacado */}
          <div
            className="rounded-xl p-3 mb-4 flex items-center gap-2"
            style={{ background: `${pionero.colorAccent}10`, border: `1px solid ${pionero.colorAccent}20` }}
          >
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: pionero.colorAccent }} />
            <p className="text-sm font-bold" style={{ color: pionero.colorAccent }}>{pionero.logro}</p>
          </div>

          {/* Historia (colapsable) */}
          <div>
            <p className={`text-zinc-300 text-sm leading-relaxed ${!expandida ? 'line-clamp-3' : ''}`}>
              &ldquo;{pionero.historia}&rdquo;
            </p>
            <button
              onClick={() => setExpandida(!expandida)}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mt-2 transition-colors"
            >
              {expandida ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expandida ? 'Leer menos' : 'Leer más'}
            </button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="border-t border-white/5 p-4 flex gap-3">
          {/* Ver video */}
          <button
            onClick={() => setVideoAbierto(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
          >
            <Play className="w-4 h-4" style={{ color: pionero.colorAccent }} />
            Ver Testimonio
          </button>

          {/* WhatsApp CTA */}
          <a
            href={pionero.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: '#25D366' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contactar
          </a>
        </div>
      </div>
    </>
  )
}

// ─── Página Principal ─────────────────────────────────────────────────────────
export default function PionerosPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-28 max-w-2xl mx-auto px-4 pt-6">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
          <Users className="w-4 h-4 text-fuchsia-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">COMUNIDAD REAL</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">
          Nuestros{' '}
          <span className="font-black" style={{ color: '#D946EF' }}>Pioneros</span>
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Personas reales que tomaron la decisión y están construyendo su libertad financiera con Tribu Legado.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { valor: '500+', label: 'Miembros Activos', color: '#D946EF' },
          { valor: '30+', label: 'Países', color: '#22D3EE' },
          { valor: '$50', label: 'Entrada', color: '#84CC16' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
            <p className="font-black text-2xl" style={{ color: stat.color }}>{stat.valor}</p>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider leading-tight mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Grid de Pioneros */}
      <div className="space-y-4">
        {PIONEROS.map((pionero) => (
          <PioneroCard key={pionero.id} pionero={pionero} />
        ))}
      </div>

      {/* CTA Final */}
      <div
        className="mt-8 rounded-2xl p-6 text-center border"
        style={{
          background: 'linear-gradient(135deg, rgba(217,70,239,0.08), rgba(34,211,238,0.04))',
          borderColor: 'rgba(217,70,239,0.2)',
        }}
      >
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-fuchsia-400" />
        <h2 className="text-white font-bold text-xl mb-2">¿Listo para ser el próximo?</h2>
        <p className="text-zinc-400 text-sm mb-5">Únete a la comunidad de pioneros y comienza tu viaje hacia la libertad financiera.</p>
        <a
          href="https://wa.me/+1XXXXXXXXXX?text=Hola%2C%20quiero%20unirme%20a%20Tribu%20Legado"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(217,70,239,0.3)]"
          style={{ background: 'linear-gradient(135deg, #D946EF, #22D3EE)' }}
        >
          <MessageCircle className="w-5 h-5" />
          Quiero Unirme — WhatsApp
        </a>
      </div>
    </div>
  )
}
