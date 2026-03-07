'use client'

import React, { ErrorInfo } from 'react'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ProgressErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[ProgressErrorBoundary] Error detetado:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="glass-card p-6 rounded-2xl mb-8 border border-destructive/20 flex flex-col items-center justify-center gap-2">
                    <h2 className="text-destructive font-bold uppercase tracking-widest text-lg">Error de Sincronización</h2>
                    <p className="text-muted-foreground text-sm text-center">Fallo temporal conectando con la Blockchain de Supabase.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors text-xs uppercase"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Reintentar
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
