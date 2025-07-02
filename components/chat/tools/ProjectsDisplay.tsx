"use client"

import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'TaskFlow Mobile',
    description: 'A productivity app for managing daily tasks with intuitive gestures and smart notifications.',
    tech: ['React Native', 'Mobile'],
    image: '/placeholder.svg?height=256&width=320&text=TaskFlow+Mobile+App'
  },
  {
    "id": 2,
    "title": "Debatably.io",
    "description": "A live 1-on-1 video debate platform where users argue in real time and receive instant AI-generated scores based on clarity, logic, and persuasion. I worked on video and audio streaming with WebRTC, and the AI transcript and scoring system. Winner of Best Senior Capstone Project at Southern Connecticut State University.",
    "tech": ["React", "Typescript", "WebRTC", "Supabase", "OpenAI"],
    "image": "/placeholder.svg?height=256&width=320&text=Debatably.io"
  },
  
  {
    id: 3,
    title: 'SoundWave Player',
    description: 'Music streaming app with personalized playlists and social sharing features.',
    tech: ['Flutter', 'Mobile'],
    image: '/placeholder.svg?height=256&width=320&text=Music+Streaming+App'
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and inventory management.',
    tech: ['React', 'Web App'],
    image: '/placeholder.svg?height=256&width=320&text=E-Commerce+Platform'
  },
  {
    id: 5,
    title: 'FitTracker Pro',
    description: 'Comprehensive fitness tracking app with workout plans and progress analytics.',
    tech: ['React Native', 'Mobile'],
    image: '/placeholder.svg?height=256&width=320&text=Fitness+Tracker+App'
  }
]

export function ProjectsDisplay() {
  return (
    <div className="mt-6 animate-in slide-in-from-bottom duration-700">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: project.id * 0.1 }}
            className="flex-none w-80 h-64 rounded-xl overflow-hidden relative shadow-sm group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('${project.image}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
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