"use client"

import { motion } from 'framer-motion'
import { Target, BookOpen, Eye } from 'lucide-react'

const learningGoals = [
  {
    title: 'AI/ML',
    skills: ['LangChain', 'TensorFlow', 'Mistral and Open Source Models', 'Hugging Face' ],
    color: 'pink',
    icon: Target
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Kubernetes', ],
    color: 'blue',
    icon: BookOpen
  }
]

const familiarWith = [
  {
    title: 'Exploring',
    skills: ['Docker', 'MCPs'],
    color: 'orange',
    icon: Eye
  }
]

const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200", 
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200"
}

export function LearningGoalsDisplay() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Goals 🎯</h2>
        <p className="text-gray-600">Technologies I'm excited to dive into next</p>
      </div>
      
      <div className="grid gap-6">
        {learningGoals.map((category, categoryIndex) => {
          const IconComponent = category.icon
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="border border-gray-200 rounded-lg p-5 bg-white/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <IconComponent className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 border-dashed ${
                      colorMap[category.color as keyof typeof colorMap] || colorMap.blue
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Familiar With Section */}
      <div className="mt-8">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Familiar With 👀</h3>
          <p className="text-gray-600 text-sm">Technologies I've explored but not quite ready to add to my main skills yet</p>
        </div>
        
        <div className="grid gap-4">
          {familiarWith.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (learningGoals.length + categoryIndex) * 0.1 }}
                className="border border-gray-200 rounded-lg p-5 bg-white/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-800">{category.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (learningGoals.length + categoryIndex) * 0.1 + skillIndex * 0.05 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        colorMap[category.color as keyof typeof colorMap] || colorMap.orange
                      }`}
                      style={{ borderStyle: 'solid' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 italic">
          Always learning, always growing! 📚
        </p>
      </div>
    </div>
  )
}