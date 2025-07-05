import { tool } from 'ai';
import { z } from 'zod';

export const getSport = tool({
  description: 'Show sports interests and NBA fandom when asked about sports',
  parameters: z.object({}),
  execute: async () => {
    return "I'm a huge NBA fan and love following basketball! Let me tell you about my sports interests.";
  },
});