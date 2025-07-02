import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description: 'This tool displays my contact information and social links',
  parameters: z.object({}),
  execute: async () => {
    return "Here's how you can get in touch with me! I'm always open to interesting conversations and opportunities.";
  },
});