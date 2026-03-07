import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import BottomNav from '@/shared/components/layout/BottomNav'

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 w-full pb-24">
                {children}
            </main>
            <BottomNav />
        </div>
    )
}
