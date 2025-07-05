import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description: 'Display detailed internship information when asked about internships',
  parameters: z.object({}),
  execute: async () => {
    return "Here are the details about my internship experiences at UKG and Victory Waves!";
  },
});