import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from '@/components/providers/PostHogProvider'

export const metadata: Metadata = {
  title: 'QuinGPT - AI Portfolio',
  description: 'Interactive AI-powered portfolio by Quin Ortiz',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
