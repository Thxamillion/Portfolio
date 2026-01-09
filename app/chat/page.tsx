"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ArrowRight, User, FolderOpen, Award, Mail, MoreHorizontal, Loader2, Trash2, Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ToolRenderer } from "@/components/chat/ToolRenderer"
import { analytics } from "@/lib/posthog"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
// import AnimatedAvatar from "@/components/AnimatedAvatar"

function ChatPageContent() {
  const searchParams = useSearchParams()
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [toolCache, setToolCache] = useState<Record<string, any>>({})
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [isAITalking, setIsAITalking] = useState(false)
  const [hasInitialQuestionProcessed, setHasInitialQuestionProcessed] = useState(false)
  
  // Load cache from localStorage on mount
  React.useEffect(() => {
    const cached = localStorage.getItem('quinPortfolioToolCache')
    if (cached) {
      try {
        setToolCache(JSON.parse(cached))
      } catch (error) {
        console.error('Failed to parse tool cache:', error)
      }
    }
  }, [])
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error, setMessages, append } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      // console.log('API Response received:', response);
      setIsAIThinking(false);
      setIsAITalking(true);
    },
    onFinish: (message) => {
      // console.log('Message finished:', message);
      
      // Cache tool responses
      if (message.toolInvocations?.length > 0) {
        const toolName = message.toolInvocations[0].toolName
        const cacheData = {
          content: message.content,
          toolInvocations: message.toolInvocations
        }
        
        const newCache = { ...toolCache, [toolName]: cacheData }
        setToolCache(newCache)
        localStorage.setItem('quinPortfolioToolCache', JSON.stringify(newCache))
        // Cache stored
        
        // Track tool usage
        analytics.trackToolInvoked(toolName, false)
      }
      
      // Track response generation with question context
      const lastUserMessage = messages[messages.length - 1]
      const questionText = lastUserMessage?.role === 'user' ? lastUserMessage.content : undefined
      analytics.trackResponseGenerated(message.toolInvocations?.length > 0, undefined, message.content, questionText)
      
      // Stop talking animation
      setIsAITalking(false)
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setIsAIThinking(false);
      setIsAITalking(false);
    },
  })

  // Store the actual messages to display (only latest Q&A pair)
  // Don't memoize - we need to re-render on each streaming token
  const displayMessages = (() => {
    if (messages.length === 0) return []

    // If we have an odd number of messages (user just sent, waiting for response)
    if (messages.length % 2 === 1) {
      return messages.slice(-1) // Show only the latest user message
    }

    // If we have an even number (complete Q&A pairs)
    return messages.slice(-2) // Show the latest Q&A pair
  })()
  
  // Handle message transitions
  React.useEffect(() => {
    // console.log('Messages updated:', messages);
  }, [messages])

  // Handle initial question from URL
  React.useEffect(() => {
    const question = searchParams.get('q')
    if (question && !hasInitialQuestionProcessed && messages.length === 0) {
      setHasInitialQuestionProcessed(true)
      // Small delay to ensure everything is loaded
      setTimeout(() => {
        handleQuickAction(question)
      }, 100)
    }
  }, [searchParams, hasInitialQuestionProcessed, messages.length])

  // Function to send a message programmatically
  const sendMessage = async (message: string) => {
    analytics.trackQuestionAsked(message, false)
    setIsAIThinking(true)
    await append({ role: 'user', content: message })
  }

  const handleQuickAction = async (action: string) => {
    // Track the quick action
    analytics.trackQuestionAsked(action, true)
    analytics.trackQuickActionClicked(action)
    
    // Map questions to tool names for cache lookup
    const toolMapping: Record<string, string> = {
      "Who are you? Tell me about yourself": "getPresentation",
      "What projects have you worked on?": "getProjects", 
      "Show me your resume": "getResume",
      "What are your technical skills?": "getSkills",
      "How can I contact you?": "getContact",
      "Are you looking for a role?": "getNewGrad",
      "Tell me something fun about yourself": "getPresentation" // Maps to presentation for personal info
    }
    
    const toolName = toolMapping[action]
    
    // Check cache first
    if (toolName && toolCache[toolName]) {
      // Using cached response
      
      // Create user message
      const userMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: action
      }
      
      // Add user message immediately and start simulated loading
      setMessages(prev => [...prev, userMessage])
      setIsSimulatedLoading(true)
      setIsAIThinking(true)
      
      // Simulate loading with a delay (800-1200ms for natural feel)
      const delay = 800 + Math.random() * 400
      setTimeout(() => {
        // Create cached assistant message
        const cachedMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: toolCache[toolName].content,
          toolInvocations: toolCache[toolName].toolInvocations
        }
        
        // Add assistant message and stop loading
        setMessages(prev => [...prev, cachedMessage])
        setIsSimulatedLoading(false)
        setIsAIThinking(false)
        
        // Track cached tool usage
        analytics.trackToolInvoked(toolName, true, delay)
      }, delay)
      
      return
    }
    
    // If not cached, proceed with normal API call
    setInput(action)
    setIsAIThinking(true)
    // Use a longer timeout to ensure React has updated the input value
    setTimeout(() => {
      const form = document.querySelector('form')
      const inputElement = form?.querySelector('input[type="text"]') as HTMLInputElement
      if (form && inputElement && inputElement.value) {
        // Use requestSubmit() for production compatibility
        if ('requestSubmit' in form) {
          form.requestSubmit()
        } else {
          // Fallback for older browsers
          form.submit()
        }
      }
    }, 100) // Increased timeout to allow React to update
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/Quin_Ortiz_Resume (3).pdf'
    link.download = 'Quin_Ortiz_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Preset questions for More dropdown
  const presetQuestions = [
    "Can you roast my resume?",
    "Whats your favorite AI tool?",
    "What would you love to learn next?",
    "What's your favorite food?",
    "What are your personal qualities?", 
    "What's your 5-year career goal?",
    "What kind of project would make you say yes immediately?",
    "Tell me something fun about yourself",
    "What motivates you in your career?"
  ]

  // Clear cache function
  const clearCache = () => {
    setToolCache({})
    localStorage.removeItem('quinPortfolioToolCache')
    // Cache cleared
    
    // Track cache clearing
    analytics.trackCacheCleared()
  }

  // Development helpers
  React.useEffect(() => {
    // Simple approach - just set the functions directly
    setTimeout(() => {
      try {
        globalThis.clearToolCache = clearCache
        
        
        
        // Helper functions loaded
      } catch (error) {
        console.error('Error setting up helper functions:', error)
      }
    }, 100)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMoreDropdown) {
        setShowMoreDropdown(false)
      }
    }

    if (showMoreDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMoreDropdown])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hiring button - top left */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAction("Are you looking for a role?")}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white text-gray-600 hover:text-gray-800 relative"
        >
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          Hiring a New Grad?
        </Button>
      </div>

      {/* GitHub link - top right */}
      <a
        href="https://github.com/Thxamillion/Portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-10"
        title="View source on GitHub"
      >
        <img
          src="https://img.shields.io/github/stars/Thxamillion/Portfolio?style=social"
          alt="GitHub stars"
          className="h-6"
        />
      </a>



      {/* Top section with avatar and initial state */}
      <div className="flex-none pt-12 pb-8">
        <div className="flex justify-center mb-6">
          <Link href="/" className="h-20 w-20 mx-auto cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="/quin-static.png"
              alt="Quin's Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </Link>
        </div>

        {messages.length === 0 && (
          <div className="px-4">
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Hey there! 👋 Welcome to my portfolio. Ask me anything.
            </p>
          </div>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 px-4 pb-60">
        <div className="w-full max-w-2xl mx-auto">
          <div className="space-y-4">
            {displayMessages.map((message) => (
              <div key={message.id}>
                {message.role === "user" ? (
                  <div className="flex justify-end mb-4">
                    <div className="max-w-xs px-4 py-2 rounded-2xl bg-blue-500 text-white">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Render tool results first */}
                    {message.toolInvocations && message.toolInvocations.length > 0 && (
                      <ToolRenderer 
                        toolInvocations={message.toolInvocations}
                        onSendMessage={sendMessage}
                      />
                    )}
                    
                    {/* Then render text response below if it exists */}
                    {message.content && message.content.trim() && (
                      <div className="flex justify-start">
                        <div className="max-w-2xl text-gray-700 prose prose-gray max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {(isLoading || isSimulatedLoading) && (
              <div className="flex justify-start">
                <div className="text-gray-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="italic">Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-2xl max-w-md">
                  <strong>Error:</strong> {error.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section with controls - STICKY */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 pb-8 pt-4 px-4">
        <div className="w-full max-w-2xl mx-auto space-y-4">
          {/* Hide quick questions toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowQuickQuestions(!showQuickQuestions)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showQuickQuestions ? "rotate-180" : ""}`} />
              Hide quick questions
            </button>
          </div>

          {/* Navigation buttons */}
          {showQuickQuestions && (
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("Who are you? Tell me about yourself")}
              >
                <User className="w-4 h-4 text-blue-500" />
                Me
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("What projects have you worked on?")}
              >
                <FolderOpen className="w-4 h-4 text-green-500" />
                Projects
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("What are your technical skills?")}
              >
                <Award className="w-4 h-4 text-purple-500" />
                Skills
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("Show me your resume")}
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                Resume
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("How can I contact you?")}
              >
                <Mail className="w-4 h-4 text-orange-500" />
                Contact
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMoreDropdown(!showMoreDropdown)
                    if (!showMoreDropdown) {
                      analytics.trackDropdownOpened()
                    }
                  }}
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </Button>
                
                {/* Dropdown menu */}
                {showMoreDropdown && (
                  <div 
                    className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                      Ask me anything...
                    </div>
                    {presetQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleQuickAction(question)
                          setShowMoreDropdown(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search input */}
          <form onSubmit={(e) => {
            // Track manual question input
            if (input.trim()) {
              analytics.trackQuestionAsked(input, false)
              setIsAIThinking(true)
            }
            handleSubmit(e)
          }} className="relative">
            <Input
              type="text"
              placeholder="Ask me anything"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-6 py-6 pr-14 rounded-full border-gray-200 bg-white shadow-sm text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-14"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }
      `}</style>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  )
}