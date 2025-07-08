"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ArrowRight, User, FolderOpen, Award, Sparkles, Mail, MoreHorizontal } from "lucide-react"

export default function Component() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [showProjects, setShowProjects] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const [chatMessages, setChatMessages] = useState<Array<{ type: "user" | "assistant"; content: string }>>([])
  const [showContact, setShowContact] = useState(false)

  const handleProjectsClick = () => {
    // Start the animation sequence
    setShowGreeting(false)

    // After greeting animates out, show chat messages
    setTimeout(() => {
      setChatMessages([
        { type: "user", content: "Projects" },
        { type: "assistant", content: "Here are some of my recent projects:" },
      ])
      setShowProjects(true)
    }, 500)
  }

  const handleContactClick = () => {
    // Start the animation sequence
    setShowGreeting(false)

    // After greeting animates out, show chat messages
    setTimeout(() => {
      setChatMessages([
        { type: "user", content: "Contact" },
        { type: "assistant", content: "Here's how you can reach me:" },
      ])
      setShowContact(true)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top section with avatar and greeting */}
      <div className="flex-none pt-12 pb-8">
        <div className="flex justify-center mb-6">
          <div className="text-6xl">👨🏻</div>
        </div>

        {/* Greeting with animation */}
        <div
          className={`text-center px-4 transition-all duration-500 ease-in-out ${
            showGreeting
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4 pointer-events-none"
          }`}
        >
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Hey there! 👋 Welcome to my portfolio. Ask me anything.
          </p>
        </div>
      </div>

      {/* Chat messages and projects */}
      <div className="flex-1 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Projects with animation */}
          {showProjects && (
            <div className="mt-6 animate-in slide-in-from-bottom duration-700 delay-300">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {/* Project 1 - Mobile App */}
                <div className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=256&width=320&text=TaskFlow+Mobile+App')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">TaskFlow Mobile</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      A productivity app for managing daily tasks with intuitive gestures and smart notifications.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        React Native
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Mobile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project 2 - Web App */}
                <div className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=256&width=320&text=Analytics+Dashboard')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">Analytics Dashboard</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      Real-time analytics platform with interactive charts and customizable widgets for business
                      insights.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Next.js
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Web App
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project 3 - Mobile App */}
                <div className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=256&width=320&text=Music+Streaming+App')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">SoundWave Player</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      Music streaming app with personalized playlists and social sharing features.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Flutter
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Mobile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project 4 - Web App */}
                <div className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=256&width=320&text=E-Commerce+Platform')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">E-Commerce Platform</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      Full-stack e-commerce solution with payment integration and inventory management.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        React
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Web App
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project 5 - Mobile App */}
                <div className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=256&width=320&text=Fitness+Tracker+App')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">FitTracker Pro</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      Comprehensive fitness tracking app with workout plans and progress analytics.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        React Native
                      </span>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        Mobile
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact section with animation */}
          {showContact && (
            <div className="mt-6 animate-in slide-in-from-bottom duration-700 delay-300">
              {/* Contact Card - appears first */}
              <div className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto mb-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Contacts</h2>
                  <span className="text-gray-600 font-medium">@Raphael.Giraud</span>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <a
                    href="mailto:raphaelgiraud12@gmail.com"
                    className="text-blue-500 hover:text-blue-600 transition-colors text-lg flex items-center gap-2"
                  >
                    raphaelgiraud12@gmail.com
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    Youtube
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    Instagram
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    Discord
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    Github
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700">
                    X
                  </Button>
                </div>

                {/* Description */}
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    You can reach me through a few channels! 📧 Just hit me up at{" "}
                    <a
                      href="mailto:raphaelgiraud12@gmail.com"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      raphaelgiraud12@gmail.com
                    </a>
                    , or check out my LinkedIn{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                      here
                    </a>{" "}
                    and my GitHub{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                      here
                    </a>
                    . I'm always happy to chat!
                  </p>
                  <p>
                    As for projects that would make me say "yes" immediately, I'm all in for anything that involves AI
                    doing 99% of the work while I take 100% of the credit! 😄 Seriously though, I'm super excited about
                    AI development, full-stack web apps, and SaaS products. What kind of projects are you into?
                  </p>
                </div>
              </div>

              {/* Chat messages appear below the card */}
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-300`}
                    style={{ animationDelay: `${(index + 2) * 200}ms` }}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages with animation */}
          {/*<div
            className={`space-y-4 transition-all duration-500 ease-in-out ${
              chatMessages.length > 0 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
            }`}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-300`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.type === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>*/}
        </div>
      </div>

      {/* Bottom section with controls - ALWAYS VISIBLE */}
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
              >
                <User className="w-4 h-4 text-blue-500" />
                Me
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={handleProjectsClick}
              >
                <FolderOpen className="w-4 h-4 text-green-500" />
                Projects
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
              >
                <Award className="w-4 h-4 text-purple-500" />
                Skills
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                Fun
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-200 hover:bg-gray-100 transition-colors bg-white"
                onClick={handleContactClick}
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
          <div className="relative">
            <Input
              type="text"
              placeholder="Ask me anything"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-6 py-4 pr-14 rounded-full border-gray-200 bg-white shadow-sm text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </Button>
          </div>
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
