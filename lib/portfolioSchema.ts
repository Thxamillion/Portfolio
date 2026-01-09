import { z } from 'zod';

// Schema for portfolio data validation
export const PortfolioSchema = z.object({
  personal: z.object({
    name: z.string().min(1),
    age: z.number().int().positive(),
    birthday: z.string(),
    location: z.string(),
    willingToRelocate: z.boolean(),
    qualities: z.array(z.string()).min(1),
  }),
  education: z.object({
    university: z.object({
      name: z.string(),
      degree: z.string(),
      graduated: z.string(),
    }),
    highSchool: z.object({
      name: z.string(),
      focus: z.string(),
      languages: z.array(z.string()),
    }),
  }),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    highlights: z.array(z.string()),
  })).min(1),
  projects: z.array(z.object({
    id: z.number().int().positive(),
    name: z.string(),
    github: z.string().nullable(),
    description: z.string(),
    bio: z.string(),
    highlights: z.array(z.string()),
    tech: z.array(z.string()).nullable().optional(),
    platforms: z.array(z.string()).optional(),
    technicalChallenges: z.array(z.string()).nullable().optional(),
    images: z.array(z.string()),
    links: z.object({
      live: z.string().optional(),
      video: z.string().optional(),
      github: z.string().optional(),
      demo: z.string().optional(),
      appStore: z.string().optional(),
      devpost: z.string().optional(),
    }),
    readmeKey: z.string().nullable(),
  })).min(1),
  skills: z.object({
    languages: z.array(z.string()).optional(),
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    ai: z.array(z.object({
      name: z.string(),
      note: z.string().nullable(),
    })).optional(),
    aiTools: z.array(z.object({
      name: z.string(),
      note: z.string().nullable(),
    })).optional(),
    tools: z.array(z.string()).optional(),
    soft: z.array(z.string()),
  }),
  certifications: z.array(z.object({
    name: z.string(),
    year: z.string(),
    credlyBadgeId: z.string(),
  })).optional(),
  interests: z.object({
    hobbies: z.array(z.object({
      name: z.string(),
      details: z.string(),
    })),
    favoriteFood: z.string(),
    nbaTeam: z.string(),
    favoritePlayer: z.string(),
  }),
  goals: z.object({
    fiveYears: z.string(),
    idealProject: z.string(),
    availableToStart: z.string(),
  }),
});

export type PortfolioData = z.infer<typeof PortfolioSchema>;
