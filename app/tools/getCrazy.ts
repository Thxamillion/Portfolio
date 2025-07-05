import { tool } from 'ai';
import { z } from 'zod';

export const getCrazy = tool({
  description: 'Tell a fun or crazy story about myself when asked about crazy experiences',
  parameters: z.object({}),
  execute: async () => {
    return "Let me tell you about some crazy experiences I've had! Here's something wild that happened to me.";
  },
});