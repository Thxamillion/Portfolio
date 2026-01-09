import { describe, it, expect, beforeAll } from 'vitest';
import { PortfolioSchema, type PortfolioData } from '@/lib/portfolioSchema';
import fs from 'fs';
import path from 'path';

const PORTFOLIO_PATH = path.join(process.cwd(), 'data/portfolio.json');

describe('Portfolio Data', () => {
  let portfolioData: PortfolioData;

  describe('File Loading', () => {
    it('should have portfolio.json file in data directory', () => {
      expect(fs.existsSync(PORTFOLIO_PATH)).toBe(true);
    });

    it('should be valid JSON', () => {
      const content = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();
    });
  });

  describe('Schema Validation', () => {
    beforeAll(() => {
      const content = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
      portfolioData = JSON.parse(content);
    });

    it('should pass full schema validation', () => {
      const result = PortfolioSchema.safeParse(portfolioData);
      if (!result.success) {
        console.error('Validation errors:', result.error.format());
      }
      expect(result.success).toBe(true);
    });

    it('should have valid personal info', () => {
      expect(portfolioData.personal.name).toBeTruthy();
      expect(portfolioData.personal.age).toBeGreaterThan(0);
      expect(portfolioData.personal.birthday).toBeTruthy();
      expect(portfolioData.personal.location).toBeTruthy();
    });

    it('should have valid education', () => {
      expect(portfolioData.education.university.name).toBeTruthy();
      expect(portfolioData.education.university.degree).toBeTruthy();
      expect(portfolioData.education.highSchool.name).toBeTruthy();
    });

    it('should have at least one work experience', () => {
      expect(portfolioData.experience.length).toBeGreaterThan(0);
      portfolioData.experience.forEach(exp => {
        expect(exp.company).toBeTruthy();
        expect(exp.role).toBeTruthy();
        expect(exp.highlights.length).toBeGreaterThan(0);
      });
    });

    it('should have at least one project', () => {
      expect(portfolioData.projects.length).toBeGreaterThan(0);
      portfolioData.projects.forEach(proj => {
        expect(proj.name).toBeTruthy();
        expect(proj.description).toBeTruthy();
      });
    });

    it('should have skills in all categories', () => {
      expect(portfolioData.skills.frontend.length).toBeGreaterThan(0);
      expect(portfolioData.skills.backend.length).toBeGreaterThan(0);
      expect(portfolioData.skills.aiTools.length).toBeGreaterThan(0);
      expect(portfolioData.skills.soft.length).toBeGreaterThan(0);
    });

    it('should have valid interests', () => {
      expect(portfolioData.interests.hobbies.length).toBeGreaterThan(0);
      expect(portfolioData.interests.favoriteFood).toBeTruthy();
    });

    it('should have valid goals', () => {
      expect(portfolioData.goals.fiveYears).toBeTruthy();
      expect(portfolioData.goals.idealProject).toBeTruthy();
      expect(portfolioData.goals.availableToStart).toBeTruthy();
    });
  });

  describe('Data Integrity', () => {
    beforeAll(() => {
      const content = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
      portfolioData = JSON.parse(content);
    });

    it('should have name as "Quin Ortiz"', () => {
      expect(portfolioData.personal.name).toBe('Quin Ortiz');
    });

    it('should have projects with GitHub links where applicable', () => {
      const projectsWithGithub = portfolioData.projects.filter(p => p.github);
      expect(projectsWithGithub.length).toBeGreaterThan(0);
    });

    it('should have consistent readmeKey format for projects with GitHub', () => {
      portfolioData.projects.forEach(proj => {
        if (proj.github && proj.readmeKey) {
          expect(proj.readmeKey).toMatch(/^readmes\/.+\.md$/);
        }
      });
    });
  });
});

describe('System Prompt Builder', () => {
  it('should build a valid system prompt from portfolio data', async () => {
    // This will be implemented when we create the buildSystemPrompt function
    const content = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
    const data: PortfolioData = JSON.parse(content);

    // Import dynamically to test the actual implementation
    const { buildSystemPrompt } = await import('@/lib/buildSystemPrompt');

    const prompt = buildSystemPrompt(data);

    // Verify prompt contains key information
    expect(prompt).toContain(data.personal.name);
    expect(prompt).toContain(data.personal.location);
    expect(prompt).toContain(data.education.university.name);

    // Verify prompt contains at least one project
    expect(prompt).toContain(data.projects[0].name);

    // Verify prompt contains skill categories
    expect(prompt).toContain('Frontend');
    expect(prompt).toContain('Backend');

    // Verify prompt is not too short (should be substantial)
    expect(prompt.length).toBeGreaterThan(1000);
  });
});
