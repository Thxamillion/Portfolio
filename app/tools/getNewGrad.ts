import { tool } from 'ai';
import { z } from 'zod';

export const getNewGrad = tool({
  description: 'Display new graduate application card when someone asks about hiring, job opportunities, if I am looking for a role, or new grad positions',
  parameters: z.object({}),
  execute: async () => {
    return "I'm actively seeking new graduate software engineer opportunities! Here's my application summary.";
  },
});