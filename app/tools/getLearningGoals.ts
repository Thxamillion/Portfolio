import { tool } from 'ai';
import { z } from 'zod';

export const getLearningGoals = tool({
  description: 'This tool shows technologies and skills Quin wants to learn next',
  parameters: z.object({}),
  execute: async () => {
    return "These are the technologies I'm excited to dive into next! Always learning and growing.";
  },
});