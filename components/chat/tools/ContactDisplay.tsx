"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from 'framer-motion'

const contactData = {
  name: 'Quin Ortiz',
  username: '@Quin.Ortiz',
  email: 'quinortiz00@gmail.com',
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/quinortiz', label: 'LinkedIn' },
    { platform: 'YouTube', url: 'https://youtube.com/@quinortiz', label: 'Youtube' },
    { platform: 'Instagram', url: 'https://instagram.com/quinortiz', label: 'Instagram' },
    { platform: 'Discord', url: 'https://discord.gg/quinortiz', label: 'Discord' },
    { platform: 'GitHub', url: 'https://github.com/thxamillion', label: 'Github' },
    { platform: 'X', url: 'https://x.com/quinortiz', label: 'X' }
  ],
  message: "You can reach me through a few channels! 📧 Just hit me up at quin.ortiz@example.com, or check out my LinkedIn here and my GitHub here. I'm always happy to chat! As for projects that would make me say \"yes\" immediately, I'm all in for anything that involves AI doing 99% of the work while I take 100% of the credit! 😄 Seriously though, I'm super excited about AI development, full-stack web apps, and SaaS products. What kind of projects are you into?"
}

export function ContactDisplay() {
  const data = contactData
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Contacts</h2>
        <span className="text-gray-600 font-medium">{data.username}</span>
      </div>

      {/* Email */}
      <div className="mb-6">
        <a
          href={`mailto:${data.email}`}
          className="text-blue-500 hover:text-blue-600 transition-colors text-lg flex items-center gap-2"
        >
          {data.email}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        {data.socials.map((social) => (
          <Button
            key={social.platform}
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-700"
            onClick={() => window.open(social.url, '_blank')}
          >
            {social.label}
          </Button>
        ))}
      </div>

      {/* Description */}
      <div className="text-gray-700 leading-relaxed">
        <p>{data.message}</p>
      </div>
    </motion.div>
  )
}