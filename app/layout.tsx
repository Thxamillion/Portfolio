import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from '@/components/providers/PostHogProvider'

export const metadata: Metadata = {
  title: 'QuinGPT - AI Portfolio | Quin Ortiz',
  description: 'Interactive AI-powered portfolio by Quin Ortiz. Chat with my AI to learn about my projects, skills, and experience as a full-stack developer.',
  keywords: 'Quin Ortiz, AI Portfolio, Full Stack Developer, Interactive Portfolio, QuinGPT',
  authors: [{ name: 'Quin Ortiz' }],
  creator: 'Quin Ortiz',
  openGraph: {
    title: 'QuinGPT - AI Portfolio | Quin Ortiz',
    description: 'Interactive AI-powered portfolio. Chat with my AI to learn about my projects and experience.',
    url: 'https://quinortiz.com',
    siteName: 'QuinGPT',
    images: [
      {
        url: '/quin-static.png',
        width: 800,
        height: 800,
        alt: 'Quin Ortiz',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuinGPT - AI Portfolio | Quin Ortiz',
    description: 'Interactive AI-powered portfolio. Chat with my AI to learn about my projects and experience.',
    images: ['/quin-static.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
