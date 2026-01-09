"use client"

import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
    color: 'black'
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
    color: 'black'
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Supabase'],
    color: 'black'
  },
  {
    title: 'AI',
    skills: ['LLM Providers (OpenAI, Gemini)', 'Whisper', 'Claude Code', 'MCPs', 'Prompt Engineering', 'Tool Calling'],
    color: 'black'
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'AWS', 'Docker', 'Vercel', 'Postman', 'Gherkin', 'Jest', 'JUnit'],
    color: 'black'
  }
]

const certifications = [
  {
    name: 'AWS Certified Solutions Architect - Associate',
    credlyBadgeId: '7cf775e1-2b72-4abe-9944-e504b16a1f90',
    year: '2026'
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

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: categories.length * 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Certifications</h3>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert) => (
              <motion.a
                key={cert.credlyBadgeId}
                href={`https://www.credly.com/badges/${cert.credlyBadgeId}/public_url`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: categories.length * 0.1 + 0.05 }}
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <div>
                  <div className="font-medium text-sm">{cert.name}</div>
                  <div className="text-xs opacity-90">{cert.year}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}