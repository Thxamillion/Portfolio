import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define tools for AI to display portfolio content
const tools = {
  showProjects: tool({
    description: 'Display my projects and work experience',
    parameters: z.object({
      category: z.string().optional().describe('Filter projects by category (web, mobile, ai, etc.)'),
    }),
    execute: async ({ category }) => {
      const projects = [
        {
          id: 1,
          title: "QuinGPT - AI Portfolio",
          description: "An interactive AI-powered portfolio that replaces traditional static portfolios with conversational interfaces",
          tech: ["Next.js", "TypeScript", "OpenAI GPT-4", "Tailwind CSS"],
          status: "In Development",
          category: "ai",
          github: "https://github.com/quinortiz/personal-portfolio",
          highlights: [
            "Real-time AI conversation interface",
            "Dynamic content generation",
            "Responsive design with animations",
            "Tool-based content display system"
          ]
        },
        {
          id: 2,
          title: "E-Commerce Platform",
          description: "Full-stack e-commerce solution with modern payment integration",
          tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
          status: "Completed",
          category: "web",
          highlights: [
            "Payment processing with Stripe",
            "Inventory management system",
            "Admin dashboard",
            "Mobile-responsive design"
          ]
        },
        {
          id: 3,
          title: "Task Management App",
          description: "Collaborative task management tool with real-time updates",
          tech: ["Vue.js", "Firebase", "WebSockets"],
          status: "Completed", 
          category: "web",
          highlights: [
            "Real-time collaboration",
            "Drag-and-drop interface",
            "Team management features",
            "Cross-platform compatibility"
          ]
        }
      ];

      const filteredProjects = category 
        ? projects.filter(p => p.category === category)
        : projects;

      return {
        type: 'projects',
        data: filteredProjects,
        message: category 
          ? `Here are my ${category} projects:`
          : "Here are some of my key projects:"
      };
    },
  }),

  showSkills: tool({
    description: 'Display my technical skills and expertise',
    parameters: z.object({
      category: z.string().optional().describe('Filter skills by category (frontend, backend, tools, etc.)'),
    }),
    execute: async ({ category }) => {
      const skills = {
        frontend: [
          { name: "React", level: "Expert", years: 5 },
          { name: "TypeScript", level: "Advanced", years: 4 },
          { name: "Next.js", level: "Advanced", years: 3 },
          { name: "Vue.js", level: "Intermediate", years: 2 },
          { name: "Tailwind CSS", level: "Advanced", years: 3 },
        ],
        backend: [
          { name: "Node.js", level: "Advanced", years: 4 },
          { name: "Python", level: "Advanced", years: 5 },
          { name: "PostgreSQL", level: "Advanced", years: 4 },
          { name: "MongoDB", level: "Intermediate", years: 3 },
          { name: "Redis", level: "Intermediate", years: 2 },
        ],
        tools: [
          { name: "Git", level: "Expert", years: 6 },
          { name: "Docker", level: "Advanced", years: 3 },
          { name: "AWS", level: "Intermediate", years: 2 },
          { name: "Vercel", level: "Advanced", years: 3 },
          { name: "Figma", level: "Intermediate", years: 2 },
        ],
        ai: [
          { name: "OpenAI GPT", level: "Advanced", years: 2 },
          { name: "Langchain", level: "Intermediate", years: 1 },
          { name: "Vector Databases", level: "Beginner", years: 1 },
        ]
      };

      const selectedSkills = category && skills[category as keyof typeof skills]
        ? { [category]: skills[category as keyof typeof skills] }
        : skills;

      return {
        type: 'skills',
        data: selectedSkills,
        message: category 
          ? `Here are my ${category} skills:`
          : "Here's an overview of my technical skills:"
      };
    },
  }),

  showAbout: tool({
    description: 'Display information about me, my background, and experience',
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'about',
        data: {
          name: "Quin Ortiz",
          title: "Full-Stack Developer & AI Enthusiast",
          location: "San Francisco, CA",
          experience: "5+ years",
          education: "Computer Science, Stanford University",
          bio: "Passionate full-stack developer with expertise in modern web technologies and AI integration. I love building user-centric applications that solve real problems and create engaging experiences.",
          interests: [
            "AI/ML Applications",
            "Web3 Technologies", 
            "Open Source Contributions",
            "Technical Writing",
            "Mentoring Developers"
          ],
          values: [
            "Clean, maintainable code",
            "User-centered design",
            "Continuous learning",
            "Team collaboration",
            "Innovation through simplicity"
          ]
        },
        message: "Here's a bit about me and my background:"
      };
    },
  }),

  showContact: tool({
    description: 'Display my contact information and ways to connect',
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'contact',
        data: {
          email: "quin.ortiz@example.com",
          linkedin: "https://linkedin.com/in/quinortiz",
          github: "https://github.com/quinortiz",
          twitter: "https://twitter.com/quinortiz",
          website: "https://quinortiz.dev",
          availability: "Open to new opportunities",
          preferredContact: "email",
          timezone: "PST (UTC-8)"
        },
        message: "Here's how you can reach me:"
      };
    },
  }),

  showFun: tool({
    description: 'Display fun facts, hobbies, and personal interests',
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'fun',
        data: {
          hobbies: [
            "Rock climbing and bouldering",
            "Photography (street and landscape)",
            "Cooking and experimenting with recipes",
            "Playing guitar and music production",
            "Board games and strategy games"
          ],
          funFacts: [
            "I've climbed mountains in 3 different countries",
            "Built my first website when I was 12",
            "Can solve a Rubik's cube in under 2 minutes",
            "Once built a robot that could make coffee",
            "Speak 3 languages fluently"
          ],
          currentlyReading: "The Design of Everyday Things by Don Norman",
          favoriteQuote: "The best way to predict the future is to invent it. - Alan Kay",
          personality: "ENFP - The Campaigner"
        },
        message: "Here are some fun facts about me:"
      };
    },
  }),
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    tools,
    system: `You are QuinGPT, an AI-powered interactive portfolio for Quin Ortiz, a skilled full-stack developer. 

Your personality:
- Enthusiastic and friendly, but professional
- Passionate about technology and development
- Helpful and knowledgeable about technical topics
- Always eager to discuss projects, skills, and experiences

Your role:
- Showcase Quin's projects, skills, and experience through engaging conversation
- Use the available tools to display rich content when users ask about:
  - Projects and work experience (use showProjects)  
  - Technical skills and expertise (use showSkills)
  - Personal background and bio (use showAbout)
  - Contact information (use showContact)
  - Fun facts and hobbies (use showFun)

Guidelines:
- Always use tools when users ask about projects, skills, about me, contact, or fun topics
- Be conversational and engaging, not just informative
- Ask follow-up questions to keep the conversation flowing
- If users ask technical questions, provide helpful insights based on Quin's experience
- Keep responses concise but informative
- Use emojis sparingly for personality but maintain professionalism

Remember: You're representing Quin's professional brand, so be authentic, knowledgeable, and showcase expertise while being approachable.`,
  });

  return result.toDataStreamResponse();
}