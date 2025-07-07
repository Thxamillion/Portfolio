"use client"

import { ToolInvocation } from 'ai'
import { ProjectsDisplay } from './tools/ProjectsDisplay'
import { ContactDisplay } from './tools/ContactDisplay'
import { PresentationDisplay } from './tools/PresentationDisplay'
import { SkillsDisplay } from './tools/SkillsDisplay'
import { ResumeDisplay } from './tools/ResumeDisplay'
import { LearningGoalsDisplay } from './tools/LearningGoalsDisplay'
import { ResumeRoastDisplay } from './tools/ResumeRoastDisplay'
import { SportDisplay } from './tools/SportDisplay'
import { CrazyDisplay } from './tools/CrazyDisplay'
import { NewGradApplicationDisplay } from './tools/NewGradApplicationDisplay'
import { RateLimitDisplay } from './tools/RateLimitDisplay'

interface ToolRendererProps {
  toolInvocations: ToolInvocation[]
  onSendMessage?: (message: string) => void
}

export function ToolRenderer({ toolInvocations, onSendMessage }: ToolRendererProps) {
  return (
    <div className="w-full space-y-4">
      {toolInvocations.map((tool) => {
        if (tool.state !== 'result') return null
        
        const { toolName } = tool
        
        switch (toolName) {
          case 'getProjects':
            return (
              <div key={tool.toolCallId} className="w-full">
                <ProjectsDisplay />
              </div>
            )
            
          case 'getContact':
            return (
              <div key={tool.toolCallId} className="w-full">
                <ContactDisplay />
              </div>
            )
            
          case 'getPresentation':
            return (
              <div key={tool.toolCallId} className="w-full">
                <PresentationDisplay />
              </div>
            )
            
          case 'getSkills':
            return (
              <div key={tool.toolCallId} className="w-full">
                <SkillsDisplay />
              </div>
            )
            
          case 'getResume':
            return (
              <div key={tool.toolCallId} className="w-full">
                <ResumeDisplay />
              </div>
            )
            
          case 'getLearningGoals':
            return (
              <div key={tool.toolCallId} className="w-full">
                <LearningGoalsDisplay />
              </div>
            )
            
          case 'getResumeRoast':
            return (
              <div key={tool.toolCallId} className="w-full">
                <ResumeRoastDisplay 
                  onFileUpload={(file) => {
                    console.log('File uploaded:', file.name)
                  }}
                  onSendMessage={onSendMessage}
                />
              </div>
            )
            
          case 'getSport':
            return (
              <div key={tool.toolCallId} className="w-full">
                <SportDisplay />
              </div>
            )
            
          case 'getCrazy':
            return (
              <div key={tool.toolCallId} className="w-full">
                <CrazyDisplay />
              </div>
            )
            
          case 'getNewGrad':
            return (
              <div key={tool.toolCallId} className="w-full">
                <NewGradApplicationDisplay />
              </div>
            )
            
          case 'getRateLimit':
            return (
              <div key={tool.toolCallId} className="w-full">
                <RateLimitDisplay />
              </div>
            )
            
          default:
            return null
        }
      })}
    </div>
  )
}