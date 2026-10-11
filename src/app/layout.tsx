import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { STORE_CONFIG } from '@/data/config'

import FloatingChatWidget from '@/components/FloatingChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${STORE_CONFIG.storeName} - ${STORE_CONFIG.storeTagline}`,
    template: `%s | ${STORE_CONFIG.storeName}`,
  },
  description: STORE_CONFIG.storeDescription,
  keywords: ['artificial jewellery', 'beauty products', 'Pakistan', 'online shopping', 'necklace', 'earrings', 'makeup', 'skincare'],
  openGraph: {
    title: STORE_CONFIG.storeName,
    description: STORE_CONFIG.storeDescription,
    type: 'website',
    locale: 'en_PK',
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
