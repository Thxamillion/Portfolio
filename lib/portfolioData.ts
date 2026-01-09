import { PortfolioSchema, type PortfolioData } from './portfolioSchema';

// In-memory cache for Lambda warm starts
let cachedPortfolio: PortfolioData | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches portfolio data from S3 (production) or local file (development)
 * Includes caching for Lambda warm starts
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedPortfolio && (now - cacheTime) < CACHE_TTL) {
    console.log('[getPortfolioData] Using cached data');
    return cachedPortfolio;
  }

  const bucket = process.env.PORTFOLIO_BUCKET;
  console.log('[getPortfolioData] Bucket:', bucket ? bucket : 'NOT SET (using local)');

  // Local development: read from file
  if (!bucket) {
    console.log('[getPortfolioData] Reading from local file...');
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'data/portfolio.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Validate with schema
    const result = PortfolioSchema.safeParse(data);
    if (!result.success) {
      console.error('Portfolio data validation failed:', result.error.format());
      throw new Error('Invalid portfolio data');
    }

    cachedPortfolio = result.data;
    cacheTime = now;
    return cachedPortfolio;
  }

  // Production: read from S3
  console.log('[getPortfolioData] Fetching from S3...');
  const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
  const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: 'portfolio.json',
  });

  const response = await s3Client.send(command);
  const body = await response.Body?.transformToString();

  if (!body) {
    throw new Error('Failed to read portfolio.json from S3');
  }

  const data = JSON.parse(body);

  // Validate with schema
  const result = PortfolioSchema.safeParse(data);
  if (!result.success) {
    console.error('Portfolio data validation failed:', result.error.format());
    throw new Error('Invalid portfolio data');
  }

  console.log('[getPortfolioData] Successfully loaded from S3');
  cachedPortfolio = result.data;
  cacheTime = now;

  return cachedPortfolio;
}

/**
 * Fetches a project README from S3 or local file
 */
export async function getProjectReadme(projectName: string): Promise<string | null> {
  const bucket = process.env.PORTFOLIO_BUCKET;

  // Local development: read from file
  if (!bucket) {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), `data/readmes/${projectName}.md`);

    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch {
      return null;
    }
  }

  // Production: read from S3
  try {
    const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
    const s3Client = new S3Client({});

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `readmes/${projectName}.md`,
    });

    const response = await s3Client.send(command);
    return await response.Body?.transformToString() ?? null;
  } catch {
    return null;
  }
}

// Re-export types for convenience
export type { PortfolioData };
