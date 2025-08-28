"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, ExternalLink, Github, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  
  {
    id: 1,
    title: "Debatably.io",
    description: "A live 1-on-1 video debate platform where users argue in real time and receive instant AI-generated scores based on clarity, logic, and persuasion.",
    bio: "Debatably.io revolutionizes online discourse by providing a structured platform for real-time debates. Users engage in timed debates while AI analyzes their arguments for clarity, logic, and persuasion. The platform features live video streaming, real-time transcription, and instant scoring. Winner of Best Senior Capstone Project at Southern Connecticut State University.",
    tech: ["React", "TypeScript", "WebRTC", "Supabase", "OpenAI", "Whisper", "Socket.io", "Node.js", "Docker"],
    images: ["/debateHome.png", "/debateWin.jpg", "/debate2.png", "/debate3.png"],
    links: {
      live: 'https://debatably.io',

    }
  },
  {
    id: 2,
    title: 'CareCircle',
    description: 'A mobile app for patients and their caregivers to track and manage their health and wellness.',
    bio: 'CareCircle was a Techstars Startup Weekend project, where we built a mobile app for patients and their caregivers to track and manage their health and wellness. The goal was to solve a real problem for patients and caregivers where sometimes information during doctors vists can be forgetten or lost in translation.',
    tech: ['React Native', 'TypeScript', 'Whisper', 'Supabase', 'OpenAI'],
    images: ['CareWeb.png','/Care1.png', '/Care2.png', '/Care3.png'],
    links: {
      video: 'https://youtu.be/Z5ZjHamozEA',

    }
  },
  {
    id: 3,
    title: 'Fluent Diary',
    description: 'AI-powered language practice app that turns everyday speaking practice into measurable progress with instant transcripts and speaking insights.',
    bio: 'Fluent Diary is a mobile and web application designed for language learners to improve their speaking fluency. Users can record themselves speaking either free-form or through read-aloud exercises, receiving instant transcripts with detailed speaking metrics including words per minute, filler word detection, and pronunciation support. The app builds a personal vocabulary bank from actual speech patterns, helping users track their language journey with measurable progress indicators.',
    tech: ['React', 'TypeScript', 'Whisper', 'OpenAI', 'Next.js', 'PostgreSQL'],
    images: ['/fluent1.png'],
    links: {
      live: 'https://fluentdiary.com',
    }
  },
  // {
  //   id: 3,
  //   title: 'SoundWave Player',
  //   description: 'Music streaming app with personalized playlists and social sharing features.',
  //   bio: 'SoundWave Player is a modern music streaming application that combines personalized recommendations with social features. Users can create custom playlists, discover new music through AI-powered suggestions, and share their favorite tracks with friends.',
  //   tech: ['Flutter', 'Dart', 'Firebase', 'Spotify API', 'Machine Learning'],
  //   images: ['/placeholder.svg?height=256&width=320&text=Music+Streaming+App'],
  //   links: {
  //     demo: 'https://soundwave-player.com',
  //     github: 'https://github.com/quinortiz/soundwave-player',
  //     playStore: 'https://play.google.com/store/soundwave'
  //   }
  // },
  // {
  //   id: 4,
  //   title: 'E-Commerce Platform',
  //   description: 'Full-stack e-commerce solution with payment integration and inventory management.',
  //   bio: 'A comprehensive e-commerce platform built for scalability and performance. Features include advanced inventory management, secure payment processing, real-time analytics, and a responsive admin dashboard. Designed to handle high-volume transactions with optimized performance.',
  //   tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
  //   images: ['/placeholder.svg?height=256&width=320&text=E-Commerce+Platform'],
  //   links: {
  //     demo: 'https://ecommerce-demo.com',
  //     github: 'https://github.com/quinortiz/ecommerce-platform',
  //     live: 'https://store.quinortiz.com'
  //   }
  // },
  // {
  //   id: 5,
  //   title: 'FitTracker Pro',
  //   description: 'Comprehensive fitness tracking app with workout plans and progress analytics.',
  //   bio: 'FitTracker Pro is a full-featured fitness application that helps users achieve their health goals through personalized workout plans, nutrition tracking, and detailed progress analytics. The app includes social features for motivation and expert-designed workout routines.',
  //   tech: ['React Native', 'TypeScript', 'MongoDB', 'Express.js', 'Chart.js'],
  //   images: ['/placeholder.svg?height=256&width=320&text=Fitness+Tracker+App'],
  //   links: {
  //     demo: 'https://fittracker-pro.com',
  //     github: 'https://github.com/quinortiz/fittracker-pro',
  //     appStore: 'https://apps.apple.com/fittracker-pro'
  //   }
  // }
]

export function ProjectsDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }
  
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }
  
  const currentProject = projects[currentIndex]
  
  const openModal = (project: typeof projects[0]) => {
    // Open project modal
    setSelectedProject(project)
    // Add modal to body to escape stacking context
    document.body.style.overflow = 'hidden'
  }
  
  const closeModal = () => {
    const modal = document.getElementById('project-modal-root')
    if (modal) {
      // Add exit animation
      modal.style.opacity = '0'
      modal.style.transform = 'scale(0.95)'
      setTimeout(() => {
        const existingModal = document.getElementById('project-modal-root')
        if (existingModal) {
          document.body.removeChild(existingModal)
        }
        setSelectedProject(null)
        document.body.style.overflow = 'unset'
      }, 200)
    } else {
      setSelectedProject(null)
      document.body.style.overflow = 'unset'
    }
  }

  // Create modal portal
  useEffect(() => {
    if (selectedProject) {
      // Remove any existing modal first
      const existingModal = document.getElementById('project-modal-root')
      if (existingModal) {
        document.body.removeChild(existingModal)
      }
      
      const modalDiv = document.createElement('div')
      modalDiv.id = 'project-modal-root'
      modalDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-out;
      `
      modalDiv.onclick = closeModal
      
      const modalContent = document.createElement('div')
      modalContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        max-width: 42rem;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transform: scale(0.95);
        transition: transform 0.2s ease-out;
      `
      modalContent.onclick = (e) => e.stopPropagation()
      
      // Generate additional images section if multiple images exist
      const additionalImagesHTML = selectedProject.images.length > 1 ? `
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Project Screenshots</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
            ${selectedProject.images.slice(1).map((img, index) => {
              // Detect if image is likely mobile-sized (contains 'Care' and index > 0 for CareCircle project)
              const isMobileImage = img.includes('Care') && index >= 0;
              const containerStyle = isMobileImage 
                ? "border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 300px; max-width: 100%;"
                : "border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100%;";
              
              const imageStyle = isMobileImage
                ? "width: 100%; height: auto; max-height: 500px; object-fit: contain;"
                : "width: 100%; height: 250px; object-fit: cover;";
              
              return `
                <div style="${containerStyle}">
                  <img src="${img}" alt="Screenshot ${index + 2}" style="${imageStyle}">
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      modalContent.innerHTML = `
        <div style="position: relative;">
          <div style="height: 12rem; background-image: url('${selectedProject.images[0]}'); background-size: cover; background-position: center; border-radius: 1rem 1rem 0 0;"></div>
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); border-radius: 1rem 1rem 0 0;"></div>
          <button id="modal-close-btn" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 0.5rem; padding: 0.5rem; color: white; backdrop-filter: blur(4px); cursor: pointer;">✕</button>
          <div style="position: absolute; bottom: 1rem; left: 1.5rem;">
            <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 0.25rem;">${selectedProject.title}</h2>
            <p style="color: rgba(255,255,255,0.9); font-size: 0.875rem;">${selectedProject.description}</p>
          </div>
        </div>
        <div style="padding: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">About This Project</h3>
            <p style="color: #374151; line-height: 1.625;">${selectedProject.bio}</p>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${selectedProject.tech.map(tech => `<span style="padding: 0.25rem 0.75rem; background: #dbeafe; color: #1d4ed8; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">${tech}</span>`).join('')}
            </div>
          </div>
          <div style="margin-bottom: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">Project Links</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              ${selectedProject.links.demo ? `<a href="${selectedProject.links.demo}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">🌐 Live Site</a>` : ''}
              ${selectedProject.links.video ? `<a href="${selectedProject.links.video}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">🎥 Video Demo</a>` : ''}
              ${selectedProject.links.github ? `<a href="${selectedProject.links.github}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">🔗 GitHub</a>` : ''}
              ${selectedProject.links.appStore ? `<a href="${selectedProject.links.appStore}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">📱 App Store</a>` : ''}
              ${selectedProject.links.live ? `<a href="${selectedProject.links.live}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">🌐 Live Site</a>` : ''}
              ${selectedProject.links.devpost ? `<a href="${selectedProject.links.devpost}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background: white; color: #374151; text-decoration: none; font-size: 0.875rem;">🏆 DevPost</a>` : ''}
            </div>
          </div>
          ${additionalImagesHTML}
        </div>
      `
      
      modalDiv.appendChild(modalContent)
      document.body.appendChild(modalDiv)

      // Add close button listener
      const closeBtn = modalContent.querySelector('#modal-close-btn')
      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal)
      }

      // Trigger entrance animation
      requestAnimationFrame(() => {
        modalDiv.style.opacity = '1'
        modalContent.style.transform = 'scale(1)'
      })

      return () => {
        const existingModal = document.getElementById('project-modal-root')
        if (existingModal) {
          document.body.removeChild(existingModal)
        }
      }
    }
  }, [selectedProject])
  
  return (
    <div className="mt-6 animate-in slide-in-from-bottom duration-700">
      <div className="relative">
        {/* Main project card */}
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mx-auto h-64 rounded-xl overflow-hidden relative shadow-lg group cursor-pointer"
          onClick={() => openModal(currentProject)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url('${currentProject.images[0]}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-semibold text-xl mb-3">{currentProject.title}</h3>
            <p className="text-sm text-gray-200 mb-4 line-clamp-3">
              {currentProject.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {currentProject.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Navigation controls - bottom right */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Project counter */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-700 font-medium shadow-lg">
            {currentIndex + 1} of {projects.length}
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Modal content will be rendered to the portal div created in useEffect */}
      
      <style jsx global>{`
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