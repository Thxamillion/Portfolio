import posthog from 'posthog-js'

class PostHogAnalytics {
  private initialized = false

  init() {
    if (typeof window === 'undefined') return
    if (this.initialized) return

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!key) {
      console.warn('PostHog key not found - analytics disabled')
      return
    }

    posthog.init(key, {
      api_host: host || 'https://app.posthog.com',
      disable_session_recording: false,
      capture_pageview: false, // We'll handle this manually
      // Disable in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.opt_out_capturing()
        }
      }
    })

    this.initialized = true
    console.log('PostHog analytics initialized')
  }

  // Page tracking
  trackPageView(path: string) {
    if (!this.initialized) return
    posthog.capture('page_viewed', {
      path,
      timestamp: new Date().toISOString()
    })
  }

  // Chat events
  trackQuestionAsked(question: string, isQuickAction = false) {
    if (!this.initialized) return
    posthog.capture('question_asked', {
      question,
      is_quick_action: isQuickAction,
      question_length: question.length,
      timestamp: new Date().toISOString()
    })
  }

  trackToolInvoked(toolName: string, fromCache = false, responseTime?: number) {
    if (!this.initialized) return
    posthog.capture('tool_invoked', {
      tool_name: toolName,
      from_cache: fromCache,
      response_time_ms: responseTime,
      timestamp: new Date().toISOString()
    })
  }

  trackResponseGenerated(hasToolInvocations: boolean, responseTime?: number) {
    if (!this.initialized) return
    posthog.capture('response_generated', {
      has_tool_invocations: hasToolInvocations,
      response_time_ms: responseTime,
      timestamp: new Date().toISOString()
    })
  }

  // User interactions
  trackQuickActionClicked(actionType: string) {
    if (!this.initialized) return
    posthog.capture('quick_action_clicked', {
      action_type: actionType,
      timestamp: new Date().toISOString()
    })
  }

  trackDropdownOpened() {
    if (!this.initialized) return
    posthog.capture('dropdown_opened', {
      timestamp: new Date().toISOString()
    })
  }

  // Development helpers
  trackCacheCleared() {
    if (!this.initialized) return
    posthog.capture('cache_cleared', {
      timestamp: new Date().toISOString()
    })
  }

  // Generic event tracking
  track(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    })
  }
}

// Export singleton instance
export const analytics = new PostHogAnalytics()

// Export PostHog instance for direct access if needed
export { posthog }