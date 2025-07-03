"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize PostHog on mount
    analytics.init()
  }, [])

  useEffect(() => {
    // Track page views when pathname changes
    if (pathname) {
      analytics.trackPageView(pathname)
    }
  }, [pathname])

  return <>{children}</>
}