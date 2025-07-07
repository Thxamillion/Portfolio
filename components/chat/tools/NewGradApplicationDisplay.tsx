"use client"

import { ArrowRight, MapPin, Globe, Code } from 'lucide-react'
import { motion } from 'framer-motion'

export function NewGradApplicationDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl text-gray-600">QO</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quin Ortiz</h1>
            <p className="text-gray-500">Software Engineer Application</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Ready to Start
        </div>
      </div>

      {/* Location */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Globe className="w-4 h-4 text-green-600" />
          <span className="font-bold text-gray-900">Location</span>
        </div>
        <p className="text-gray-500 ml-6">Willing to relocating + Remote friendly</p>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Code className="w-4 h-4 text-purple-600" />
          <span className="font-bold text-gray-900">Tech stack</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 ml-6">
          <div className="space-y-1">
            <p className="text-gray-500">• TypeScript, Python, Java</p>
            <p className="text-gray-500">• React, Next.js, Node.js</p>
            <p className="text-gray-500">• PostgreSQL, Supabase</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">• OpenAI, Whisper, Vercel AI SDK</p>
            <p className="text-gray-500">• Git, Docker</p>
            <p className="text-gray-500">• Prompt engineering, Tool calling</p>
          </div>
        </div>
      </div>

      {/* What I Bring */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">What I bring</h2>
        <p className="text-gray-700 leading-relaxed">
          I love building solutions and I build fast. Passionate about AI integration with hands-on experience implementing LLM-powered applications. 
          Quick learner with a solution-focused mindset, combining technical skills with creative problem-solving to deliver results.
        </p>
      </div>

      {/* Goal */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Goal</h2>
        <p className="text-gray-700 leading-relaxed">
          Join a bold, innovative team building AI-powered tools that matter. I want to contribute immediately while growing alongside experienced engineers in an environment that values fast iteration and impactful solutions.
        </p>
      </div>

      {/* Contact */}
      <div className="border-t border-gray-200 pt-6 text-center">
        <a
          href="mailto:quinortiz2003@gmail.com"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
        >
          quinortiz00@gmail.com
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}