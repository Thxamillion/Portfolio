"use client"

import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'Python', 'Java', ],
    color: 'black'
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
    color: 'black'
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL',  'Supabase'],
    color: 'black'
  },
  {
    title: 'AI',
    skills: ['LLM Providers(OpenAI, Whisper Gemini)', 'Vercel AI SDK', 'Whisper','Prompt Engineering', 'Tool calling'],
    color: 'black'
  },
  //, 'Hugging Face', 'Vector DBs'
  {
    title: 'Misc',
    skills: ['Git', 'Docker', 'Vercel', 'Postman', 'Gherkin', 'Jest'],
    color: 'black'
  }
]

const colorMap = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  pink: "bg-pink-100 text-pink-700",
  orange: "bg-orange-100 text-orange-700",
  black: "bg-black text-white"
}

export function SkillsDisplay() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid gap-6">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    colorMap[category.color as keyof typeof colorMap] || colorMap.blue
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}