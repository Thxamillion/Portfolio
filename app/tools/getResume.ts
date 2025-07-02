import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description: 'This tool displays my resume with work experience and education',
  parameters: z.object({}),
  execute: async () => {
    return "Here's my professional experience and educational background! You can download the PDF version using the button above.";
  },
});