"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import WhatsAppBubble from "./WhatsAppBubble";
import Footer from "./Footer";
import HamburgerMenu from "./HamburgerMenu";
import { PWAInstallBanner } from "./PWAInstallBanner";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen relative bg-background">
            {/* Mandala Background Effect */}
            <div className="mandala-bg fixed inset-0 z-0" />

            {/* Gradient Accent Lines */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-neon-gradient" />

            {/* Hamburger Menu (top right) */}
            <HamburgerMenu />

            {/* Main Content */}
            <main className="relative z-10 pt-16 md:pt-20">
                {children}
                <Footer />
            </main>

            {/* Fixed Elements */}
            <PWAInstallBanner />
            <WhatsAppBubble />
            <BottomNav />
        </div>
    );
};

export default Layout;
