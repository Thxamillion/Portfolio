import { tool } from 'ai';
import { z } from 'zod';

export const getResumeRoast = tool({
  description: 'Show the resume roast interface when users ask for a resume roast, critique, or feedback',
  parameters: z.object({}),
  execute: async () => {
    return "Ready to roast your resume! Upload it and I'll give you some brutally honest (but helpful) feedback 🔥";
  },
});