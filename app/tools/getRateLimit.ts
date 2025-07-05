import { tool } from 'ai';
import { z } from 'zod';

export const getRateLimit = tool({
  description: 'Show humorous rate limit message when user hits the 10-minute chat limit',
  parameters: z.object({}),
  execute: async () => {
    return "Rate limit reached - showing humorous warning message.";
  },
});