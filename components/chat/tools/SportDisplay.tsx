"use client"

import { motion } from 'framer-motion'

export function SportDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sports & NBA</h1>
      <div className="text-gray-700">
        <p>🏀 Huge NBA fan - especially LeBron James!</p>
        <p>Love following basketball and staying updated on the latest games and trades.</p>
      </div>
    </motion.div>
  )
}