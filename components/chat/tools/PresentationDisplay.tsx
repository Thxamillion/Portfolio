"use client"

import { motion } from 'framer-motion'

const presentationData = {
  name: 'Quin Ortiz',
  age: 22,
  location: 'Bridgeport, CT',
  bio: "22-year-old full-stack developer with a huge interest in AI. Recently graduated from Southern Connecticut State University with a CS degree. Passionate about tech, entrepreneurship, and building innovative solutions.",
  tags: ['React', 'Next.js', 'AI Tools', 'Python', 'TypeScript']
}

export function PresentationDisplay() {
  const data = presentationData
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header - Name */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{data.name}</h1>
      
      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="w-72 h-72 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/profile.png"
              alt="Quin Ortiz Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1">
          {/* Age and Location */}
          <div className="mb-4 space-y-1">
            <p className="text-lg text-gray-600">
              <span className="font-medium">Age:</span> {data.age}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-medium">Location:</span> {data.location}
            </p>
          </div>
          
          {/* Bio */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{data.bio}</p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}