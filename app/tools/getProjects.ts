import { tool } from 'ai';
import { z } from 'zod';
import { getPortfolioData } from '@/lib/portfolioData';

export const getProjects = tool({
  description: 'This tool will show a list of all projects made by Quin',
  parameters: z.object({}),
  execute: async () => {
    console.log('[getProjects] Fetching portfolio data...');
    const portfolioData = await getPortfolioData();
    console.log('[getProjects] Got projects:', portfolioData.projects.length);

    const result = {
      message: "Here are all the projects made by Quin! Don't hesitate to ask me more about them!",
      projects: portfolioData.projects.map(project => ({
        id: project.id,
        title: project.name,
        description: project.description,
        bio: project.bio,
        tech: project.tech || [],
        images: project.images,
        links: project.links,
      })),
    };

    console.log('[getProjects] Returning result with', result.projects.length, 'projects');
    return result;
  },
});
