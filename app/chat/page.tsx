"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ArrowRight, User, FolderOpen, Award, Sparkles, Mail, MoreHorizontal, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ToolRenderer } from "@/components/chat/ToolRenderer"

export default function ChatPage() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      console.log('API Response received:', response);
    },
    onFinish: (message) => {
      console.log('Message finished:', message);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  })

  // Store the actual messages to display (only latest Q&A pair)
  const displayMessages = React.useMemo(() => {
    if (messages.length === 0) return []
    
    // If we have an odd number of messages (user just sent, waiting for response)
    if (messages.length % 2 === 1) {
      return messages.slice(-1) // Show only the latest user message
    }
    
    // If we have an even number (complete Q&A pairs)
    return messages.slice(-2) // Show the latest Q&A pair
  }, [messages])
  
  // Handle message transitions
  React.useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages])

  const handleQuickAction = async (action: string) => {
    setInput(action)
    // Use setTimeout to ensure the input is set before submitting
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
      }
    }, 0)
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/Quin_Ortiz_Resume (3).pdf'
    link.download = 'Quin_Ortiz_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top section with avatar and initial state */}
      <div className="flex-none pt-12 pb-8">
        <div className="flex justify-center mb-6">
          <div className="text-6xl">👨🏻</div>
        </div>

        {messages.length === 0 && (
          <div className="px-4">
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              Hey there! 👋 How's it going? What brings you to my little corner of the internet?
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
                      <ToolRenderer toolInvocations={message.toolInvocations} />
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

            {isLoading && (
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
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          )}

          {/* Search input */}
          <form onSubmit={handleSubmit} className="relative">
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