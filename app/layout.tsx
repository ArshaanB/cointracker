// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { CoinProvider } from './context/CoinContext'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading'
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <CoinProvider>{children}</CoinProvider>
      </body>
    </html>
  )
}
