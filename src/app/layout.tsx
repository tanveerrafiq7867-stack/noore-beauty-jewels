import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { STORE_CONFIG } from '@/data/config'

import FloatingChatWidget from '@/components/FloatingChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.noorebeautyjewel.store'),
  title: {
    default: `${STORE_CONFIG.storeName} - ${STORE_CONFIG.storeTagline}`,
    template: `%s | ${STORE_CONFIG.storeName}`,
  },
  description: STORE_CONFIG.storeDescription,
  keywords: ['artificial jewellery', 'beauty products', 'Pakistan', 'online shopping', 'necklace', 'earrings', 'makeup', 'skincare'],
  alternates: {
    canonical: 'https://www.noorebeautyjewel.store',
  },
  openGraph: {
    title: `${STORE_CONFIG.storeName} - ${STORE_CONFIG.storeTagline}`,
    description: STORE_CONFIG.storeDescription,
    url: 'https://www.noorebeautyjewel.store',
    siteName: STORE_CONFIG.storeName,
    type: 'website',
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: STORE_CONFIG.storeName,
    description: STORE_CONFIG.storeDescription,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Floating Multi-channel Social Chat Widget */}
        <FloatingChatWidget />
      </body>
    </html>
  )
}
