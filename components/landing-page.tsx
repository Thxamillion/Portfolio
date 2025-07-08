"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, User, FolderOpen, Award, Sparkles, Mail } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="h-32 w-32">
              <img
                src="/quin-static.png"
                alt="Quin's Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hey, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quin Ortiz
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Full-Stack Developer
          </p>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Welcome to my interactive AI-powered portfolio! Instead of scrolling through static pages, 
            just have a conversation with me. Ask about my projects, skills, experience, or anything else you'd like to know.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700">
              <Link href="/chat">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Conversation
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg rounded-full border-gray-300"
              onClick={() => setShowDemo(!showDemo)}
            >
              See What You Can Ask
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Demo Questions */}
          {showDemo && (
            <div className="animate-in slide-in-from-bottom duration-500 bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Try asking me about:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/chat?q=Who%20are%20you%3F%20Tell%20me%20about%20yourself" className="group">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 group-hover:text-blue-700">My background & experience</span>
                  </div>
                </Link>
                <Link href="/chat?q=What%20projects%20have%20you%20worked%20on%3F" className="group">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                    <FolderOpen className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 group-hover:text-green-700">Projects I've built</span>
                  </div>
                </Link>
                <Link href="/chat?q=What%20are%20your%20technical%20skills%3F" className="group">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700 group-hover:text-purple-700">Technical skills</span>
                  </div>
                </Link>
                <Link href="/chat?q=Tell%20me%20something%20fun%20about%20yourself" className="group">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-colors">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700 group-hover:text-pink-700">Fun facts about me</span>
                  </div>
                </Link>
                <Link href="/chat?q=How%20can%20I%20contact%20you%3F" className="group">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700 group-hover:text-orange-700">How to reach me</span>
                  </div>
                </Link>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">...or anything else!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      

      <style jsx global>{`
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