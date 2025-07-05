"use client"

import { motion } from 'framer-motion'

export function CrazyDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Crazy Stories</h1>
      <div className="text-gray-700">
        <p>🤪 Let me tell you about some wild experiences!</p>
        <p>Sometimes the most unexpected things happen when you're just trying to code...</p>
      </div>
    </motion.div>
  )
}