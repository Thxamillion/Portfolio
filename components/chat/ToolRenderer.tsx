"use client"

import { ToolInvocation } from 'ai'
import { ProjectsDisplay } from './tools/ProjectsDisplay'
import { ContactDisplay } from './tools/ContactDisplay'
import { PresentationDisplay } from './tools/PresentationDisplay'
import { SkillsDisplay } from './tools/SkillsDisplay'
import { ResumeDisplay } from './tools/ResumeDisplay'
import { LearningGoalsDisplay } from './tools/LearningGoalsDisplay'

interface ToolRendererProps {
  toolInvocations: ToolInvocation[]
}

export function ToolRenderer({ toolInvocations }: ToolRendererProps) {
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
            
          default:
            return null
        }
      })}
    </div>
  )
}