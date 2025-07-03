import posthog from 'posthog-js'

class PostHogAnalytics {
  private initialized = false

  init() {
    console.log('🔍 PostHog init() called')
    console.log('🌍 Window exists:', typeof window !== 'undefined')
    console.log('✅ Already initialized:', this.initialized)
    
    if (typeof window === 'undefined') {
      console.log('❌ Window undefined, exiting init')
      return
    }
    if (this.initialized) {
      console.log('✅ Already initialized, exiting init')
      return
    }

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
    
    console.log('🔑 PostHog key:', key ? `${key.substring(0, 8)}...` : 'MISSING')
    console.log('🏠 PostHog host:', host || 'default (app.posthog.com)')
    console.log('🌐 Environment:', process.env.NODE_ENV)

    if (!key) {
      console.warn('❌ PostHog key not found - analytics disabled')
      return
    }

    try {
      console.log('🚀 Initializing PostHog...')
      posthog.init(key, {
        api_host: host || 'https://app.posthog.com',
        disable_session_recording: false,
        capture_pageview: false, // We'll handle this manually
        // Disable in development (temporarily commented out for testing)
        loaded: (posthog) => {
          console.log('✅ PostHog loaded callback triggered')
          console.log('📊 PostHog instance:', posthog)
          // if (process.env.NODE_ENV === 'development') {
          //   posthog.opt_out_capturing()
          // }
        }
      })

      this.initialized = true
      console.log('✅ PostHog analytics initialized successfully')
    } catch (error) {
      console.error('❌ PostHog initialization failed:', error)
    }
  }

  // Page tracking
  trackPageView(path: string) {
    console.log('📄 trackPageView called:', { path, initialized: this.initialized })
    if (!this.initialized) {
      console.log('❌ PostHog not initialized, skipping trackPageView')
      return
    }
    
    try {
      const eventData = {
        path,
        timestamp: new Date().toISOString()
      }
      console.log('🎯 Sending page_viewed event:', eventData)
      posthog.capture('page_viewed', eventData)
      console.log('✅ page_viewed event sent')
    } catch (error) {
      console.error('❌ Failed to send page_viewed event:', error)
    }
  }

  // Chat events
  trackQuestionAsked(question: string, isQuickAction = false) {
    console.log('📝 trackQuestionAsked called:', { question, isQuickAction, initialized: this.initialized })
    if (!this.initialized) {
      console.log('❌ PostHog not initialized, skipping trackQuestionAsked')
      return
    }
    
    try {
      const eventData = {
        question,
        is_quick_action: isQuickAction,
        question_length: question.length,
        timestamp: new Date().toISOString()
      }
      console.log('🎯 Sending question_asked event:', eventData)
      posthog.capture('question_asked', eventData)
      console.log('✅ question_asked event sent')
    } catch (error) {
      console.error('❌ Failed to send question_asked event:', error)
    }
  }

  trackToolInvoked(toolName: string, fromCache = false, responseTime?: number) {
    console.log('🔧 trackToolInvoked called:', { toolName, fromCache, responseTime, initialized: this.initialized })
    if (!this.initialized) {
      console.log('❌ PostHog not initialized, skipping trackToolInvoked')
      return
    }
    
    try {
      const eventData = {
        tool_name: toolName,
        from_cache: fromCache,
        response_time_ms: responseTime,
        timestamp: new Date().toISOString()
      }
      console.log('🎯 Sending tool_invoked event:', eventData)
      posthog.capture('tool_invoked', eventData)
      console.log('✅ tool_invoked event sent')
    } catch (error) {
      console.error('❌ Failed to send tool_invoked event:', error)
    }
  }

  trackResponseGenerated(hasToolInvocations: boolean, responseTime?: number, responseText?: string, questionText?: string) {
    if (!this.initialized) return
    posthog.capture('response_generated', {
      has_tool_invocations: hasToolInvocations,
      response_time_ms: responseTime,
      response_text: responseText,
      question_text: questionText,
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