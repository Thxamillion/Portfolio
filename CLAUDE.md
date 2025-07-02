# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Preferences

**IMPORTANT**: When working on this project, Claude should:

1. **Work Autonomously**: Follow PRD and Take initiative on what to work one next make decisions without asking for permission at each step
2. **Keep and organized Plan** PLan and create a todo list before working on new feature, or fixing bug.
3. **Commit Frequently**: Create a git commit after every meaningful progress or completed feature/fix
4. **Test Before Committing**: Use Playwright to debug and verify that changes work correctly before making any commits
5. **Quality Assurance**: Always run linting and type checking before committing

This approach ensures rapid iteration with high confidence in code quality.

## Project Overview

This is "QuinGPT" - an AI-powered interactive portfolio that aims to replace traditional static portfolios with a conversational interface. The project is currently in early development, with a functional UI foundation but missing core AI functionality.

**Current Status**: Static interactive portfolio (~20-30% complete according to PRD)  
**Target**: Full conversational AI portfolio using GPT-4

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
- **Missing**: AI/ML libraries (ai, @ai-sdk/openai, framer-motion)

### Current Structure
```
app/                    # Next.js App Router
├── layout.tsx         # Root layout with theme provider
├── page.tsx           # Entry point (imports personal-portfolio.tsx)  
└── globals.css        # Tailwind + custom CSS variables

components/
├── ui/                # 40+ Shadcn/UI components (complete)
└── theme-provider.tsx # Theme context provider

personal-portfolio.tsx  # Main portfolio component (433 lines)
lib/utils.ts           # Utility functions (cn for class merging)
```

### Key Files to Understand
- **`personal-portfolio.tsx`**: Contains the entire current UI implementation with state management for animations, project display, and contact information
- **`prd.md`**: Comprehensive Product Requirements Document (39KB) detailing the full AI-powered portfolio vision
- **`components/ui/`**: Complete Shadcn/UI component library ready for use

## Implementation Gap Analysis



### ❌ Missing Core Features (Per PRD)
- **AI Integration**: No OpenAI GPT-4 connection
- **Chat System**: No conversational interface (current input is decorative)
- **API Routes**: No `/api/chat` endpoints for AI interaction
- **Streaming**: No real-time AI responses
- **Tool System**: No AI tool invocations for rich content display
- **System Prompt**: No AI personality configuration
- **Environment Setup**: No `.env.local` or API key configuration

### Development Priorities
1. **Phase 1**: Set up AI dependencies and environment
2. **Phase 2**: Implement chat API routes and streaming
3. **Phase 3**: Create tool system for rich content display
4. **Phase 4**: Connect existing UI to functional chat logic

## Development Guidelines

### Preserving Current UI
The existing chat-like UI in `personal-portfolio.tsx` is considered **good and should be preserved**. When implementing AI functionality:
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

## Key Dependencies to Add (Per PRD)
When implementing AI functionality, these dependencies are required:
```bash
npm install ai @ai-sdk/openai framer-motion zod react-markdown remark-gfm
```

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