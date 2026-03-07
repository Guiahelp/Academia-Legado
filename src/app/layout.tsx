import type { Metadata } from 'next'
import { siteConfig } from '@/config/siteConfig'
import './globals.css'
import { AuthProvider } from '@/features/auth/contexts/AuthContext'
import { MainLayout } from '@/features/layout/components/MainLayout'

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.siteTitle,
    template: `%s | ${siteConfig.seo.siteTitle}`,
  },
  description: siteConfig.seo.defaultDescription,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: siteConfig.seo.siteTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.firmName,
    locale: siteConfig.seo.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.siteTitle,
    description: siteConfig.seo.defaultDescription,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased">
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
