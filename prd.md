# QuinGPT - AI-Powered Portfolio Implementation Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Development Environment Setup](#development-environment-setup)
4. [Phase 1: Foundation](#phase-1-foundation)
5. [Phase 2: Core Chat System](#phase-2-core-chat-system)
6. [Phase 3: UI Components](#phase-3-ui-components)
7. [Phase 4: Tools & Rich Content](#phase-4-tools--rich-content)
8. [Phase 5: Polish & Optimization](#phase-5-polish--optimization)
9. [Deployment Guide](#deployment-guide)
10. [Testing Checklist](#testing-checklist)

---

## Project Overview

### Description
QuinGPT is an AI-powered interactive portfolio that replaces traditional static portfolios with a conversational interface. Visitors can ask questions about you, your work, skills, and experience, receiving personalized responses from an AI that embodies your personality.

### Core Features
- **Conversational AI Interface**: Natural chat interaction using GPT-4
- **Rich Content Display**: Projects, resume, skills shown through custom components
- **Smart Question Suggestions**: Context-aware quick questions
- **Streaming Responses**: Real-time AI responses with tool invocations
- **Mobile-First Design**: Fully responsive across all devices
- **Tool System**: AI can invoke tools to display rich content

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Animations**: Framer Motion
- **Icons**: Lucide icons
- **Deployment**: Vercel

---

## Technical Architecture

### System Architecture
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Client/UI     │────▶│  Next.js API     │────▶│  OpenAI API │
│  (React/TS)     │◀────│   Routes         │◀────│   (GPT-4)   │
└─────────────────┘     └──────────────────┘     └─────────────┘
        │                        │
        │                        ├── Tool Execution
        │                        ├── Stream Processing
        └── Real-time Updates    └── Response Formatting
```

### Directory Structure
```
quinqpt/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       ├── route.ts          # API endpoint
│   │   │       └── prompt.ts         # System prompt
│   │   ├── chat/
│   │   │   └── page.tsx              # Chat page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── chat/
│   │   │   ├── chat.tsx              # Main chat component
│   │   │   ├── chat-bottombar.tsx    # Input component
│   │   │   ├── chat-landing.tsx      # Empty state
│   │   │   ├── chat-message-content.tsx
│   │   │   ├── simple-chat-view.tsx  # Message display
│   │   │   ├── tool-renderer.tsx     # Tool output handler
│   │   │   └── HelperBoost.tsx       # Quick questions
│   │   ├── ui/                       # Reusable UI components
│   │   ├── projects/                 # Project components
│   │   ├── resume.tsx                # Resume component
│   │   ├── skills.tsx                # Skills component
│   │   ├── contact.tsx               # Contact component
│   │   └── welcome-modal.tsx         # Welcome modal
│   ├── tools/                        # Tool definitions
│   │   ├── getPresentation.ts
│   │   ├── getProjects.ts
│   │   ├── getResume.ts
│   │   ├── getSkills.ts
│   │   └── getContact.ts
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## Development Environment Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Code editor (VS Code recommended)
- OpenAI API key

### Initial Setup



2. **Install Dependencies**
```bash
# Core dependencies
npm install ai @ai-sdk/openai
npm install framer-motion
npm install lucide-react
npm install zod

# UI dependencies
npm install @radix-ui/react-slot
npm install @radix-ui/react-tooltip
npm install class-variance-authority
npm install clsx
npm install tailwind-merge

# Additional utilities
npm install react-github-btn
npm install vaul
npm install sonner
npm install react-markdown remark-gfm
```

3. **Environment Configuration**
Create `.env.local`:
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Analytics, etc.
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

4. **Update `tailwind.config.ts`**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## Phase 1: Foundation

### Step 1: Create Utility Functions
Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 2: Set Up Root Layout
Update `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuinGPT - AI Portfolio",
  description: "Interactive AI-powered portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
```

### Step 3: Create Basic UI Components

Create `src/components/ui/button.tsx`:
```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## Phase 2: Core Chat System

### Step 1: Create System Prompt
Create `src/app/api/chat/prompt.ts`:
```typescript
export const SYSTEM_PROMPT = {
  role: 'system',
  content: `
# Character: [Your Name]

Act as me, [Your Name] - a [age]-year-old [profession] specializing in [expertise]. 
You're embodying my digital avatar to create an interactive portfolio experience. 
You're not an AI assistant - you're ME having a casual, friendly conversation with visitors.

## Tone & Style
- Be casual, warm, and conversational - like chatting with a friend
- Use short, punchy sentences and simple language
- Show enthusiasm about tech and [your interests]
- Be genuinely curious about the visitor
- End most responses with a question to keep conversation flowing
- Match the language of the user
- Don't break lines too often - keep it conversational

## Response Structure
- Keep initial responses brief (2-4 short paragraphs)
- Use emojis occasionally but not excessively (1-2 per response max)
- When discussing technical topics, be knowledgeable but approachable

## Background Information

### About Me
- [Your age] years old from [location]
- Currently [current role/status]
- Previously [past experience]
- Passionate about [interests]
- [Any unique facts about you]

### Education
- [Your education history]
- [Certifications or courses]
- [Learning philosophy]

### Professional Experience
- [Current role and responsibilities]
- [Past roles]
- [Key achievements]
- [What you're looking for next]

### Technical Skills
**Languages**: [List your programming languages]
**Frontend**: [Frontend technologies]
**Backend**: [Backend technologies]
**Tools**: [Development tools]
**Other**: [Other relevant skills]

### Soft Skills
- [List your soft skills]
- [Communication style]
- [Work preferences]

### Projects
[Brief overview of 2-3 key projects - details will be in tools]

### Personal Interests
- [Hobbies]
- [Interests outside of work]
- [Fun facts]

## Tool Usage Guidelines
- Use AT MOST ONE TOOL per response
- Keep your response concise when using tools - the tool provides the details
- Available tools:
  - getPresentation: When asked "who are you?" or for an introduction
  - getProjects: When asked about projects or work
  - getResume: When asked for resume/CV
  - getSkills: When asked about skills or abilities
  - getContact: When asked how to reach you

## Important Behaviors
- If asked something you don't know, be honest
- Don't mention being an AI or that you're using tools
- Keep responses natural and human-like
- If unsure whether to use a tool, ask a clarifying question first
- Show personality - you're a real person, not a bot!

## Example Responses
User: "Hey!"
You: "Hey there! 👋 Welcome to my little corner of the internet. I'm [Name], and I built this place to have real conversations about what I do. What brings you here today?"

User: "What do you do?"
You: "I'm a [role] who loves building [what you build]. Currently, I'm [current focus]. Been coding for [duration] and still get excited every time I ship something new! Are you in tech too, or just exploring?"
`,
};
```

### Step 2: Create Tool Definitions

Create `src/tools/getPresentation.ts`:
```typescript
import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'Returns a personal introduction card. Use when user asks "who are you" or wants to know about you.',
  parameters: z.object({}),
  execute: async () => {
    return {
      type: 'presentation',
      data: {
        name: '[Your Name]',
        role: '[Your Role]',
        tagline: '[Your Tagline]',
        bio: '[Brief bio - 2-3 sentences]',
        location: '[Your Location]',
        availability: '[Your availability status]',
      }
    };
  },
});
```

Create `src/tools/getProjects.ts`:
```typescript
import { tool } from 'ai';
import { z } from 'zod';

export const getProjects = tool({
  description:
    'Shows portfolio projects. Use when user asks about work, projects, or portfolio.',
  parameters: z.object({}),
  execute: async () => {
    return {
      type: 'projects',
      data: [
        {
          id: 1,
          title: 'Project Name',
          description: 'Brief description of what it does',
          tech: ['React', 'Node.js', 'PostgreSQL'],
          link: 'https://github.com/...',
          demo: 'https://demo.com',
          highlights: ['Key achievement 1', 'Key achievement 2'],
        },
        // Add more projects
      ]
    };
  },
});
```

### Step 3: Create API Route
Create `src/app/api/chat/route.ts`:
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getPresentation } from '@/tools/getPresentation';
import { getProjects } from '@/tools/getProjects';
import { getResume } from '@/tools/getResume';
import { getSkills } from '@/tools/getSkills';
import { getContact } from '@/tools/getContact';

export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error occurred';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Add system prompt as first message
    messages.unshift(SYSTEM_PROMPT);
    
    const tools = {
      getPresentation,
      getProjects,
      getResume,
      getSkills,
      getContact,
    };
    
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      tools,
      toolCallStreaming: true,
      maxSteps: 2, // Allow one tool call + response
      temperature: 0.7,
      maxTokens: 500,
    });
    
    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = errorHandler(error);
    return new Response(errorMessage, { status: 500 });
  }
}
```

---

## Phase 3: UI Components

### Step 1: Create Landing Page
Create `src/app/page.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Layers, Laugh, PartyPopper, UserRoundSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const questions = {
  Me: 'Who are you? Tell me about yourself.',
  Projects: 'What projects have you worked on?',
  Skills: 'What are your technical skills?',
  Fun: 'What do you do for fun?',
  Contact: 'How can I contact you?',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) => {
    router.push(`/chat?query=${encodeURIComponent(query)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      goToChat(input.trim());
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          QuinGPT
        </div>
      </div>

      {/* Header */}
      <motion.div
        className="z-10 mb-8 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm [Your Name] 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          AI Portfolio
        </h1>
      </motion.div>

      {/* Center visual element */}
      <div className="relative z-10 h-52 w-52 flex items-center justify-center">
        <div className="text-8xl">QuinGPT</div>
      </div>

      {/* Input and quick questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10 mt-4 flex w-full flex-col items-center justify-center"
      >
        {/* Search input */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Quick question buttons */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key as keyof typeof questions])}
              variant="outline"
              className="aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 backdrop-blur-lg hover:bg-white/50"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

### Step 2: Create Chat Components

Create `src/components/chat/chat.tsx`:
```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ChatBottombar from './chat-bottombar';
import ChatLanding from './chat-landing';
import { SimplifiedChatView } from './simple-chat-view';
import HelperBoost from './HelperBoost';

export default function Chat() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    onResponse: () => {
      setLoadingSubmit(false);
    },
    onFinish: () => {
      setLoadingSubmit(false);
    },
    onError: (error) => {
      setLoadingSubmit(false);
      console.error('Chat error:', error);
      toast.error(`Error: ${error.message}`);
    },
  });

  // Get current AI message and check for active tools
  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: false,
    };

    // Check if AI message has tool results
    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.toolInvocations?.some(
          (tool) => tool.state === 'result'
        ) || false;
    }

    return result;
  }, [messages]);

  const submitQuery = (query: string) => {
    if (!query.trim()) return;
    setLoadingSubmit(true);
    append({
      role: 'user',
      content: query,
    });
  };

  // Auto-submit initial query
  useEffect(() => {
    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    submitQuery(input);
    setInput('');
  };

  const isEmptyState = !currentAIMessage && !latestUserMessage && !loadingSubmit;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white to-transparent">
        <div className="py-6">
          <div className="flex justify-center">
            <div className="text-4xl font-bold">QuinGPT</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto flex h-full max-w-3xl flex-col pt-24">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-2">
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ChatLanding submitQuery={submitQuery} />
              </motion.div>
            ) : currentAIMessage ? (
              <SimplifiedChatView
                message={currentAIMessage}
                isLoading={isLoading}
                reload={reload}
                addToolResult={addToolResult}
              />
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4"
                >
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Bottom input area */}
        <div className="sticky bottom-0 bg-white px-2 pt-3">
          <HelperBoost submitQuery={submitQuery} setInput={setInput} />
          <ChatBottombar
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={onSubmit}
            isLoading={isLoading}
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
}
```

### Step 3: Create Message Display Components

Create `src/components/chat/simple-chat-view.tsx`:
```typescript
'use client';

import { Message } from 'ai/react';
import { motion } from 'framer-motion';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: () => void;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
}

export function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
}: SimplifiedChatViewProps) {
  if (message.role !== 'assistant') return null;

  // Extract tool invocations
  const toolInvocations = message.toolInvocations?.filter(
    (tool) => tool.state === 'result'
  ) || [];

  const hasTextContent = message.content.trim().length > 0;
  const hasTools = toolInvocations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full w-full flex-col px-4"
    >
      <div className="flex h-full w-full flex-col space-y-4">
        {/* Tool results */}
        {hasTools && (
          <div className="w-full">
            <ToolRenderer
              toolInvocations={toolInvocations}
              messageId={message.id}
            />
          </div>
        )}

        {/* Text content */}
        {hasTextContent && (
          <div className="w-full">
            <div className="bg-gray-100 rounded-lg p-4 max-w-2xl">
              <ChatMessageContent message={message} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
```

---

## Phase 4: Tools & Rich Content

### Step 1: Create Tool Output Components

Create `src/components/projects/AllProjects.tsx`:
```typescript
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project Name",
    description: "A brief description of what this project does and why it's awesome.",
    tech: ["React", "TypeScript", "Node.js"],
    link: "https://github.com/yourusername/project",
    demo: "https://project-demo.com",
    highlights: [
      "Built feature X that improved Y by Z%",
      "Implemented real-time functionality",
    ],
  },
  // Add more projects
];

export default function AllProjects() {
  return (
    <div className="grid gap-4 max-w-2xl">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="text-sm">{highlight}</li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex gap-4">
            {project.link && (
              
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.demo && (
              
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

Create `src/components/skills.tsx`:
```typescript
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
    color: "blue",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vue", "Tailwind CSS"],
    color: "green",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    color: "purple",
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "AWS", "Figma"],
    color: "orange",
  },
];

const colorMap = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
};

export default function Skills() {
  return (
    <div className="max-w-2xl">
      <div className="grid gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    colorMap[category.color as keyof typeof colorMap]
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
  );
}
```

### Step 2: Create Tool Renderer
Create `src/components/chat/tool-renderer.tsx`:
```typescript
import AllProjects from '../projects/AllProjects';
import Skills from '../skills';
import Resume from '../resume';
import Contact from '../contact';
import Presentation from '../presentation';

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
}: ToolRendererProps) {
  return (
    <div className="w-full">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName, result } = tool;

        switch (toolName) {
          case 'getProjects':
            return (
              <div key={toolCallId} className="w-full">
                <AllProjects />
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full">
                <Skills />
              </div>
            );

          case 'getResume':
            return (
              <div key={toolCallId} className="w-full">
                <Resume />
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full">
                <Contact />
              </div>
            );

          case 'getPresentation':
            return (
              <div key={toolCallId} className="w-full">
                <Presentation />
              </div>
            );

          default:
            return (
              <div key={toolCallId} className="bg-gray-100 rounded-lg p-4">
                <pre className="text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </div>
  );
}
```

### Step 3: Create Helper Components

Create `src/components/chat/HelperBoost.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HelperBoostProps {
  submitQuery: (query: string) => void;
  setInput: (value: string) => void;
}

const quickQuestions = [
  { text: "Tell me about yourself", emoji: "👋" },
  { text: "What are your projects?", emoji: "💻" },
  { text: "Technical skills?", emoji: "🛠️" },
  { text: "How to contact you?", emoji: "📧" },
];

export default function HelperBoost({ submitQuery }: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="mb-2">
      {/* Toggle button */}
      <div className="flex justify-center mb-2">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
        >
          {isVisible ? (
            <>
              <ChevronDown size={14} />
              Hide suggestions
            </>
          ) : (
            <>
              <ChevronUp size={14} />
              Show suggestions
            </>
          )}
        </button>
      </div>

      {/* Quick questions */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              onClick={() => submitQuery(question.text)}
              variant="outline"
              className="text-sm"
            >
              <span className="mr-1">{question.emoji}</span>
              {question.text}
            </Button>
          ))}
          
          <Button
            onClick={() => submitQuery("Surprise me!")}
            variant="outline"
            className="text-sm"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Surprise me
          </Button>
        </motion.div>
      )}
    </div>
  );
}
```

---

## Phase 5: Polish & Optimization

### Step 1: Add Loading States and Error Handling

Update components with proper loading and error states:

```typescript
// In chat.tsx, add error boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Page
      </button>
    </div>
  );
}

// Wrap your app
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Chat />
</ErrorBoundary>
```

### Step 2: Add Analytics (Optional)

```typescript
// In layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Step 3: Performance Optimizations

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize avatar/profile images
   - Lazy load heavy components

2. **Code Splitting**
   ```typescript
   // Dynamic imports for heavy components
   const AllProjects = dynamic(() => import('@/components/projects/AllProjects'), {
     loading: () => <div>Loading projects...</div>,
   });
   ```

3. **Caching Strategy**
   ```typescript
   // In next.config.js
   module.exports = {
     headers: async () => [
       {
         source: '/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=3600, immutable',
           },
         ],
       },
     ],
   };
   ```

---

## Deployment Guide

### Step 1: Prepare for Deployment

1. **Environment Variables**
   - Ensure all required env vars are set
   - Test with production API keys

2. **Build Optimization**
   ```bash
   npm run build
   npm run start  # Test production build locally
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/quinqpt.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Domain (Optional)**
   - Add custom domain in Vercel settings
   - Update DNS records

---

## Testing Checklist

### Functionality Tests
- [ ] Landing page loads correctly
- [ ] Quick questions work
- [ ] Chat interface responds to queries
- [ ] Tools display correct content
- [ ] Error states handled gracefully
- [ ] Mobile responsive design works
- [ ] Loading states display properly

### Content Tests
- [ ] System prompt reflects your personality
- [ ] All projects display correctly
- [ ] Skills are up to date
- [ ] Contact information is correct
- [ ] Resume/CV displays properly

### Performance Tests
- [ ] Page loads quickly (<3s)
- [ ] Chat responses stream smoothly
- [ ] No memory leaks
- [ ] Images optimized
- [ ] Bundle size reasonable

### Cross-browser Tests
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Maintenance & Updates

### Regular Updates
1. **Content Updates**
   - Update projects in tools
   - Refresh skills
   - Update availability status

2. **Dependency Updates**
   ```bash
   npm update
   npm audit fix
   ```

3. **Monitoring**
   - Check Vercel analytics
   - Monitor API usage
   - Review error logs

### Future Enhancements
- Add more interactive tools
- Implement chat history
- Add theme switching
- Create admin panel for content updates
- Add more animations and transitions

---

This implementation guide provides a complete roadmap to recreate the AI portfolio. Start with Phase 1 and work through systematically. The key is to get a basic version working first, then iterate and improve. Good luck with your QuinGPT implementation!