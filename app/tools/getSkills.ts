import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description: 'This tool shows my technical skills organized by category',
  parameters: z.object({}),
  execute: async () => {
    return "Here's a breakdown of my technical skills across different areas! Want to know what I'm planning to learn next? Just ask me what I'd love to learn!";
  },
});