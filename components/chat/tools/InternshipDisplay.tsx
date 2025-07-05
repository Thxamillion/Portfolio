"use client"

import { motion } from 'framer-motion'

export function InternshipDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Internship Experience</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">UKG (Summer 2024)</h2>
          <p className="text-gray-700">Software development internship experience.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Victory Waves (Fall 2024)</h2>
          <p className="text-gray-700">Worked on phonebanking application for politicians.</p>
        </div>
      </div>
    </motion.div>
  )
}