// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
'use client';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { CoinProvider } from './context/CoinContext';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading'
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
});

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          `${fontHeading.variable} ${fontBody.variable}`
        )}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CoinProvider>{children}</CoinProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
