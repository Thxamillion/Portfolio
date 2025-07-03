# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Preferences

**IMPORTANT**: When working on this project, Claude should:


2. **Keep and organized Plan** PLan and create a todo list before working on new feature, or fixing bug.
3. **Commit Frequently**: Create a git commit after every meaningful progress or completed feature/fix
4. **Test Before Committing**: Use Playwright to debug and verify that changes work correctly before making any commits
5. **Quality Assurance**: Always run linting and type checking before committing

This approach ensures rapid iteration with high confidence in code quality.

## Project Overview

This is "QuinGPT" - an AI-powered interactive portfolio that aims to replace traditional static portfolios with a conversational interface. The project is currently in early development, with a functional UI foundation but missing core AI functionality.

**Current Status**: Functional AI portfolio with chat interface (~70% complete)  
**Target**: Full conversational AI portfolio with enhanced tool system

## Development Commands

```bash
# Development
npm run dev        # Start development server

# Production
npm run build      # Build for production
npm run start      # Start production server

# Quality
npm run lint       # Run Next.js linting
```

**Note**: No test suite is currently configured.

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 with extensive Radix UI components
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Analytics**: PostHog for conversation tracking
- **AI**: OpenAI GPT-4 integration with streaming
- **Animation**: Framer Motion for smooth interactions

### Current Structure
```
app/
├── api/chat/          # AI chat API endpoints
├── chat/              # Chat interface page
├── layout.tsx         # Root layout with theme provider
├── page.tsx           # Landing page
└── globals.css        # Tailwind + custom CSS variables

components/
├── chat/              # Chat system components
│   ├── ToolRenderer.tsx
│   └── tools/         # AI tool components
│       ├── ContactDisplay.tsx
│       ├── LearningGoalsDisplay.tsx
│       ├── PresentationDisplay.tsx
│       ├── ProjectsDisplay.tsx
│       ├── ResumeDisplay.tsx
│       └── SkillsDisplay.tsx
├── ui/                # 40+ Shadcn/UI components (complete)
├── Avatar.tsx         # Animated memoji avatar
├── AnimatedAvatar.tsx # Frame-based avatar (unused)
├── landing-page.tsx   # Landing page component
├── providers/         # Context providers
│   └── PostHogProvider.tsx
└── theme-provider.tsx # Theme context provider

lib/
├── posthog.ts         # Analytics tracking
└── utils.ts           # Utility functions
```

### Key Files to Understand

- **`prd.md`**: Comprehensive Product Requirements Document (39KB) detailing the full AI-powered portfolio vision
- **`components/ui/`**: Complete Shadcn/UI component library ready for use

## Implementation Gap Analysis



### ✅ Completed Features
- **AI Integration**: OpenAI GPT-4 with streaming responses
- **Chat System**: Fully functional conversational interface
- **API Routes**: `/api/chat` endpoints with tool support
- **Tool System**: 6 AI tools for rich content display
- **Avatar System**: Animated memoji with state management
- **Analytics**: PostHog tracking for conversations
- **Environment**: Proper `.env.local` configuration

### 🔄 Current Implementation Status
- **Core Chat**: ✅ Complete
- **Tool System**: ✅ Complete (6 tools)
- **Avatar/Memoji**: ✅ Complete
- **Analytics**: ✅ Complete
- **UI/UX**: ✅ Complete



## Development Guidelines

### Preserving Current UI
- Extend existing components rather than replacing them
- Maintain current styling and animations
- Use existing message bubble and card designs
- Keep the current project showcase and contact display formats

### Path Aliases
TypeScript is configured with path aliases:
```typescript
"@/*" → "./*"
```

### Styling Approach
- Uses Tailwind CSS with extensive custom configuration
- CSS variables for theming in `globals.css`
- Class Variance Authority (CVA) for component variants
- `cn()` utility function for conditional class merging

### Component Architecture
- Heavy use of Radix UI primitives
- Shadcn/UI component patterns
- React Hook Form for form handling
- Zod for schema validation

## Tool System

### Current Tools
The portfolio includes 6 AI tools in `components/chat/tools/`:
- **ContactDisplay**: Shows contact information and social links
- **LearningGoalsDisplay**: Displays learning objectives and progress
- **PresentationDisplay**: Personal introduction with photo and bio
- **ProjectsDisplay**: Portfolio projects with descriptions
- **ResumeDisplay**: Professional experience and skills
- **SkillsDisplay**: Technical skills and competencies

### Adding New Tools

1. **Create Tool Component**
```bash
# Create new tool in components/chat/tools/
touch components/chat/tools/YourToolName.tsx
```

2. **Tool Template**
```typescript
"use client"

import { motion } from 'framer-motion'

export function YourToolName() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Your tool content */}
    </motion.div>
  )
}
```

3. **Register in ToolRenderer**
```typescript
// In components/chat/ToolRenderer.tsx
import { YourToolName } from './tools/YourToolName'

// Add to tool mapping
const toolComponents = {
  // ... existing tools
  'your_tool_name': YourToolName,
}
```

4. **Add to API Route**
```typescript
// In app/api/chat/route.ts
const tools = {
  // ... existing tools
  your_tool_name: {
    description: 'Description of what your tool does',
    parameters: z.object({
      // Define parameters if needed
    }),
    execute: async (params) => {
      // Tool logic
      return { success: true, data: params }
    }
  }
}
```

### Tool Best Practices
- Use consistent motion animations
- Follow existing styling patterns
- Include proper TypeScript types
- Add error handling
- Use responsive design
- Include accessibility features

## Environment Variables Needed
```bash
# .env.local
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## PRD Reference
The `prd.md` file contains the complete implementation roadmap including:
- Detailed system architecture
- Phase-by-phase development guide
- Component specifications
- Tool system design
- Deployment instructions

Refer to this document for understanding the full vision and implementation details.