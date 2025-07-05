"use client"

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export function RateLimitDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <Clock className="h-8 w-8 text-orange-500" />
          <div>
            <h3 className="text-lg font-bold text-orange-800 mb-2">
              Slow Down There, Speed Racer! 🏎️
            </h3>
            <p className="text-orange-700 mb-3">
              You've hit the chat limit - 20 messages per 10 minutes max! 
            </p>
            <p className="text-orange-600 text-sm">
              Take a 10-minute breather and we can keep chatting! ⏰😄
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}