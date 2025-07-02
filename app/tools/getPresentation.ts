import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description: 'This tool shows my personal introduction when someone asks who I am',
  parameters: z.object({}),
  execute: async () => {
    return "Nice to meet you! Here's a bit about me and what I do.";
  },
});