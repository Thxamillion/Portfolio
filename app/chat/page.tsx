"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ArrowRight, User, FolderOpen, Award, Sparkles, Mail, MoreHorizontal, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Component to render tool results
function ToolResult({ result }: { result: any }) {
  if (!result) return null

  switch (result.type) {
    case 'projects':
      return (
        <div className="mt-6 animate-in slide-in-from-bottom duration-700">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {result.data.map((project: any) => (
              <div key={project.id} className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'skills':
      return (
        <div className="mt-6 animate-in slide-in-from-bottom duration-700">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            {Object.entries(result.data).map(([category, skills]: [string, any]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills.map((skill: any) => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({skill.years}y)</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                        skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'about':
      return (
        <div className="mt-6 animate-in slide-in-from-bottom duration-700">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">👨🏻</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{result.data.name}</h2>
                <p className="text-gray-600">{result.data.title}</p>
                <p className="text-sm text-gray-500">{result.data.location} • {result.data.experience}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{result.data.bio}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
                <ul className="space-y-2">
                  {result.data.interests.map((interest: string) => (
                    <li key={interest} className="text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Values</h3>
                <ul className="space-y-2">
                  {result.data.values.map((value: string) => (
                    <li key={value} className="text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )

    case 'contact':
      return (
        <div className="mt-6 animate-in slide-in-from-bottom duration-700">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="mb-6">
              <a
                href={`mailto:${result.data.email}`}
                className="text-blue-500 hover:text-blue-600 transition-colors text-lg flex items-center gap-2"
              >
                {result.data.email}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700" asChild>
                <a href={result.data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700" asChild>
                <a href={result.data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700" asChild>
                <a href={result.data.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700" asChild>
                <a href={result.data.website} target="_blank" rel="noopener noreferrer">Website</a>
              </Button>
            </div>

            <div className="text-gray-700">
              <p className="mb-2"><strong>Status:</strong> {result.data.availability}</p>
              <p className="mb-2"><strong>Preferred Contact:</strong> {result.data.preferredContact}</p>
              <p><strong>Timezone:</strong> {result.data.timezone}</p>
            </div>
          </div>
        </div>
      )

    case 'fun':
      return (
        <div className="mt-6 animate-in slide-in-from-bottom duration-700">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fun Facts & Hobbies</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hobbies</h3>
                <ul className="space-y-2">
                  {result.data.hobbies.map((hobby: string) => (
                    <li key={hobby} className="text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fun Facts</h3>
                <ul className="space-y-2">
                  {result.data.funFacts.map((fact: string) => (
                    <li key={fact} className="text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <p><strong>Currently Reading:</strong> {result.data.currentlyReading}</p>
                <p><strong>Personality:</strong> {result.data.personality}</p>
              </div>
              <blockquote className="mt-4 text-gray-700 italic border-l-4 border-blue-500 pl-4">
                "{result.data.favoriteQuote}"
              </blockquote>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

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

  // Log messages whenever they change
  React.useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages])

  const handleQuickAction = (action: string) => {
    setInput(action)
    handleSubmit(new Event('submit') as any)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top section with avatar and initial state */}
      <div className="flex-none pt-12 pb-8">
        <div className="flex justify-center mb-6">
          <div className="text-6xl">👨🏻</div>
        </div>

        {messages.length === 0 && (
          <div className="text-center px-4">
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              Hey there! 👋 How's it going? What brings you to my little corner of the internet?
            </p>
          </div>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-200 text-gray-700"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>

                {/* Render tool results */}
                {message.toolInvocations?.map((toolInvocation) => (
                  <div key={toolInvocation.toolCallId}>
                    {toolInvocation.result && (
                      <ToolResult result={toolInvocation.result} />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
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

      {/* Bottom section with controls */}
      <div className="flex-none pb-8 px-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
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
                onClick={() => handleQuickAction("Tell me about yourself")}
              >
                <User className="w-4 h-4 text-blue-500" />
                Me
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("Show me your projects")}
              >
                <FolderOpen className="w-4 h-4 text-green-500" />
                Projects
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("What are your skills?")}
              >
                <Award className="w-4 h-4 text-purple-500" />
                Skills
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={() => handleQuickAction("Tell me something fun about you")}
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                Fun
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
              className="w-full px-6 py-4 pr-14 rounded-full border-gray-200 bg-white shadow-sm text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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