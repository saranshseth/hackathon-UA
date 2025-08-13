import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/Auth/AuthProvider'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import Footer from '@/components/Layout/Footer'
import { TripRecommendationChatbot } from '@/components/TripRecommendationChatbot'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Intrepid Travel - Urban Adventures',
  description: 'Discover authentic urban adventures worldwide with Intrepid Travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CurrencyProvider>
            {children}
            <Footer />
            <TripRecommendationChatbot />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}