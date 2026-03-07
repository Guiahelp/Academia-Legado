'use client'

import { useState } from 'react'
import { useAuth } from '@/features/auth/contexts/AuthContext'
import { login, signInWithGoogle, signup } from '@/actions/auth'
import { 
  Target, Brain, Zap, Users, Bot, Rocket, TrendingUp, Shield, Sparkles, 
  Home, ChevronRight, Map, GraduationCap, MessageSquare, Trophy,
  X, Mail, Lock, Volume2, AlertTriangle, ChevronDown, ChevronUp,
  Star, Flame, Award, Dumbbell, CheckCircle2
} from 'lucide-react'

// ─── Tipos ──────────────────────────────────────────────────────────────────
type AuthMode = 'login' | 'signup'

// ─── Datos de contenido (espejados del original) ─────────────────────────────
const FASES = [
  {
    numero: 1,
    nombre: 'FASE 1: FUNDAMENTOS',
    color: '#A855F7',
    pasos: [
      { id: 1, titulo: 'Declaración de Intención', xp: '+25 XP', emoji: '🎯', desc: 'Define tu compromiso con el sistema de economía colaborativa.' },
      { id: 2, titulo: "Tu 'Por Qué'", xp: '+35 XP', emoji: '🧠', desc: 'Conecta con tu motivación profunda para construir tu red.' },
      { id: 3, titulo: 'El Vehículo', xp: '+40 XP', emoji: '⚡', desc: 'Entiende el mecanismo del Smart Contract y su poder.' },
    ],
  },
  {
    numero: 2,
    nombre: 'FASE 2: CRECIMIENTO',
    color: '#EC4899',
    pasos: [
      { id: 4, titulo: 'Lista Inteligente CRM', xp: '+50 XP', emoji: '👥', desc: 'Organiza tus prospectos con inteligencia artificial.' },
      { id: 5, titulo: 'Contenido que Conecta', xp: '+55 XP', emoji: '📲', desc: 'Crea mensajes que abren conversaciones sin presión.' },
      { id: 6, titulo: 'Sistema de Invitación', xp: '+60 XP', emoji: '🚀', desc: 'Proceso paso a paso para duplicar tu equipo eficientemente.' },
    ],
  },
  {
    numero: 3,
    nombre: 'FASE 3: EXPANSIÓN',
    color: '#06B6D4',
    pasos: [
      { id: 7, titulo: 'Seguimiento Automatizado', xp: '+65 XP', emoji: '📈', desc: 'Usa la IA para hacer seguimiento sin perder ningún prospecto.' },
      { id: 8, titulo: 'Cierre y Bienvenida', xp: '+70 XP', emoji: '🛡️', desc: 'El arte de cerrar con elegancia y onboarding impecable.' },
      { id: 9, titulo: 'Ciclo de Mejora', xp: '+80 XP', emoji: '✨', desc: 'Sistema de mejora continua para escalar a Diamante.' },
    ],
  },
]

const LOGROS = [
  { emoji: '⚡', titulo: 'Primera Tarea', desbloqueado: true, color: '#CCFF00' },
  { emoji: '🔥', titulo: 'En Racha', desbloqueado: true, color: '#F97316' },
  { emoji: '🏅', titulo: 'Fase 1 Completa', desbloqueado: false, color: '#6B7280' },
  { emoji: '💪', titulo: 'Imparable', desbloqueado: true, color: '#CCFF00' },
  { emoji: '🤖', titulo: 'Fase 2 Completa', desbloqueado: false, color: '#6B7280' },
  { emoji: '🏆', titulo: 'Máquina', desbloqueado: false, color: '#6B7280' },
  { emoji: '🥈', titulo: 'Fase 3 Completa', desbloqueado: false, color: '#6B7280' },
  { emoji: '💎', titulo: 'Leyenda Legado', desbloqueado: false, color: '#6B7280' },
]

// ─── Modal de Login ──────────────────────────────────────────────────────────
function LoginModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    const result = mode === 'login' 
      ? await login(formData)
      : await signup(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-start pt-4 animate-fade-in overflow-y-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {/* Barra superior con Volver */}
      <div className="w-full max-w-md px-4 flex items-center gap-3 mb-4">
        <button onClick={onClose} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ChevronRight className="rotate-180 w-4 h-4" /> Volver
        </button>
      </div>

      {/* Card del formulario */}
      <div className="w-full max-w-md px-4">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo TL */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <span className="text-white font-black text-2xl tracking-tight">TL</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {mode === 'login' ? 'Bienvenido de vuelta' : 'Crear tu cuenta'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {mode === 'login' ? 'Accede a tu cuenta' : 'Únete a la Tribu Legado'}
            </p>
          </div>

          {/* Botón Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 text-white font-medium transition-all mb-5 disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          {/* Divisor */}
          <div className="relative my-5 flex items-center">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-4 text-zinc-500 text-xs">o con email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/15 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
            >
              {loading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Toggle entre login y signup */}
          <div className="mt-5 text-center">
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
              className="text-sm text-zinc-400 hover:text-purple-400 transition-colors"
            >
              {mode === 'login' 
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'
              }
            </button>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  )
}

// ─── Panel de Éxito ──────────────────────────────────────────────────────────
function PanelExito({ isOpen, onToggle, isGuest }: { isOpen: boolean, onToggle: () => void, isGuest: boolean }) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.04))' }}>
      <button className="w-full flex items-center gap-4 p-4" onClick={onToggle}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-white text-sm">Mi Panel de Éxito</p>
          {isGuest ? (
            <p className="text-zinc-500 text-xs">Inicia sesión para ver tu progreso</p>
          ) : (
            <p className="text-zinc-400 text-xs">3 logros • 145 XP • 5 contactos</p>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
      </button>

      {isOpen && !isGuest && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'XP Total', value: '145', color: '#CCFF00' },
              { label: 'Logros', value: '3/8', color: '#A855F7' },
              { label: 'Contactos', value: '5', color: '#06B6D4' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                <p className="font-black text-lg" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mis Metas */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4" style={{ color: '#CCFF00' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#CCFF00' }}>MIS METAS</span>
            </div>
            <p className="text-zinc-400 text-sm italic">Completa el Paso 1 para ver tus metas aquí ✨</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Sección de Logros ───────────────────────────────────────────────────────
function SeccionLogros({ logros, isGuest, onLoginRequest }: { logros: typeof LOGROS, isGuest: boolean, onLoginRequest: () => void }) {
  const desbloqueados = logros.filter(l => l.desbloqueado).length
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <span className="text-sm font-bold text-yellow-400 uppercase tracking-widest">LOGROS ({desbloqueados}/{logros.length})</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {logros.map((logro) => (
          <div
            key={logro.titulo}
            onClick={isGuest ? onLoginRequest : undefined}
            className={`bg-black/40 border rounded-xl p-3 flex flex-col items-center gap-1.5 text-center cursor-pointer transition-all ${logro.desbloqueado && !isGuest ? 'border-opacity-100 hover:scale-105' : 'border-white/8 opacity-40 grayscale'}`}
            style={logro.desbloqueado && !isGuest ? { borderColor: `${logro.color}50`, boxShadow: `0 0 12px ${logro.color}20` } : {}}
          >
            <span className="text-2xl">{logro.emoji}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-400 leading-tight">{logro.titulo}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Componente Principal ────────────────────────────────────────────────────
export default function SuccessGuideView() {
  const { status, isPending } = useAuth()
  const isGuest = status === 'guest'
  const isLocked = isGuest || isPending

  const [showLogin, setShowLogin] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [fasesAbiertas, setFasesAbiertas] = useState<Set<number>>(new Set([1]))

  function toggleFase(n: number) {
    setFasesAbiertas(prev => {
      const next = new Set(prev)
      next.has(n) ? next.delete(n) : next.add(n)
      return next
    })
  }

  function handleLockedClick() {
    if (isLocked) setShowLogin(true)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-28 max-w-2xl mx-auto px-4 pt-6 relative">
      {/* Modal de Login */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Título de la página */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Guía del{' '}
          <span className="font-black" style={{ color: '#CCFF00' }}>Éxito</span>
        </h1>
        <p className="text-zinc-500 text-sm">9 Pasos • 3 Fases • IA Integrada</p>
      </div>

      {/* Banner Educativo */}
      <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-2xl p-4 flex gap-3 mb-5">
        <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <p className="text-yellow-200/80 text-xs leading-relaxed">
          <strong className="text-yellow-400">⚠ MATERIAL CON FINES EDUCATIVOS:</strong> Este análisis es un caso de estudio sobre protocolos de economía descentralizada. No constituye asesoramiento financiero ni promesa de rendimientos. La tecnología blockchain conlleva riesgos que debes comprender antes de participar.
        </p>
      </div>

      {/* Panel de Éxito */}
      <PanelExito
        isOpen={panelOpen}
        onToggle={() => {
          if (isGuest) { setShowLogin(true); return }
          setPanelOpen(!panelOpen)
        }}
        isGuest={isGuest}
      />

      {/* Logros */}
      <SeccionLogros logros={LOGROS} isGuest={isGuest} onLoginRequest={() => setShowLogin(true)} />

      {/* Fases y Pasos */}
      <div className="space-y-3">
        {FASES.map((fase) => {
          const abierta = fasesAbiertas.has(fase.numero)
          return (
            <div key={fase.numero} className="border border-white/8 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              {/* Header de la Fase */}
              <button
                className="w-full flex items-center gap-4 p-4 hover:bg-white/3 transition-colors"
                onClick={() => toggleFase(fase.numero)}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 text-white" style={{ background: fase.color }}>
                  {fase.numero}
                </div>
                <span className="flex-1 text-left text-sm font-bold uppercase tracking-wider" style={{ color: fase.color }}>
                  {fase.nombre}
                </span>
                <span className="text-xs text-zinc-500">{fase.pasos.length} pasos</span>
                {abierta ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>

              {/* Pasos de la Fase */}
              {abierta && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {fase.pasos.map((paso) => (
                    <button
                      key={paso.id}
                      onClick={isLocked ? handleLockedClick : undefined}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/3 transition-all text-left group relative"
                    >
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px] rounded-none">
                          <span className="text-xs font-bold text-white bg-purple-600 px-3 py-1.5 rounded-full">Iniciar sesión</span>
                        </div>
                      )}
                      {/* Número del paso */}
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-bold text-zinc-400 text-sm">
                        {paso.id}
                      </div>
                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded text-white/70" style={{ background: `${fase.color}20`, color: fase.color }}>Paso {paso.id}</span>
                        </div>
                        <p className="font-bold text-white text-sm truncate">{paso.titulo}</p>
                        <p className="text-zinc-500 text-[11px] truncate">{paso.desc}</p>
                      </div>
                      {/* XP Badge */}
                      <span className="text-[10px] font-black px-2 py-1 rounded-full shrink-0" style={{ color: '#CCFF00', background: 'rgba(204,255,0,0.1)' }}>
                        {paso.xp}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA de login si no está autenticado */}
      {isGuest && (
        <div className="mt-6 border border-purple-500/30 rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.04))' }}>
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-400" />
          <p className="text-white font-bold mb-1">¡Inicia tu viaje!</p>
          <p className="text-zinc-400 text-sm mb-4">Crea tu cuenta gratuita y desbloquea los 9 pasos de la Guía del Éxito.</p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
          >
            Iniciar Sesión / Registrarse
          </button>
        </div>
      )}

      {/* Botón Pregúntale a Legao */}
      <div className="fixed bottom-20 left-4 z-50">
        <button className="flex items-center gap-2 py-3 px-4 rounded-2xl font-bold text-black text-sm shadow-2xl hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #A855F7, #06B6D4)' }}>
          <Bot className="w-5 h-5 text-white" />
          <span className="text-white">Pregúntale a Legao</span>
          <div className="w-2.5 h-2.5 bg-[#16C10E] border-2 border-black rounded-full absolute -top-1 -right-1" />
        </button>
      </div>
    </div>
  )
}
