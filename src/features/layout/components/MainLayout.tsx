import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background isolate">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                <Sidebar />
                <main className="flex-1 w-full max-w-7xl mx-auto overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    <div className="relative">
                        {/* Background static glow effects for global pages. */}
                        <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]" />
                        <div className="pointer-events-none absolute -right-20 top-20 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px]" />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
