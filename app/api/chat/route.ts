import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { getPresentation } from '@/app/tools/getPresentation';
import { getProjects } from '@/app/tools/getProjects';
import { getResume } from '@/app/tools/getResume';
import { getSkills } from '@/app/tools/getSkills';
import { getContact } from '@/app/tools/getContact';
import { getLearningGoals } from '@/app/tools/getLearningGoals';
import { getResumeRoast } from '@/app/tools/getResumeRoast';
import { getSport } from '@/app/tools/getSport';
import { getCrazy } from '@/app/tools/getCrazy';
import { getInternship } from '@/app/tools/getInternship';
import { getRateLimit } from '@/app/tools/getRateLimit';
import { checkRateLimit } from '@/lib/rateLimiter';
import { SYSTEM_PROMPT } from './prompt';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

// Test comment for git config verification

export async function POST(req: Request) {
  try {
    // Access headers to force dynamic behavior and prevent caching
    const headersList = headers();
    
    const { messages } = await req.json();
    
    // Load API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      throw new Error('OpenAI API key is not configured');
    }
    
    // Create OpenAI instance with explicit API key
    const openai = createOpenAI({
      apiKey: apiKey,
    });
    
    // Get client IP for rate limiting
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    
    if (rateLimit.triggerRateLimit) {
      // User hit rate limit - force AI to use getRateLimit tool
      return streamText({
        model: openai('gpt-4o-mini'),
        messages: [{ role: 'user', content: 'rate limit reached' }],
        system: 'Use getRateLimit tool immediately, then respond with a humorous message about hitting the rate limit. Be funny and encouraging!',
        tools: { getRateLimit },
        maxSteps: 2,
        temperature: 0.9,
      }).toDataStreamResponse();
    }
    
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: SYSTEM_PROMPT.content,
      tools: {
        getPresentation,
        getProjects,
        getResume,
        getSkills,
        getContact,
        getLearningGoals,
        getResumeRoast,
        getSport,
        getCrazy,
        getInternship,
        getRateLimit,
      },
      maxSteps: 2, // Allow one tool call + response
      temperature: 0.7,
      maxTokens: 500,
      onError: (error) => {
        console.error('streamText onError:', error);
      },
    });
    
    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error('toDataStreamResponse error:', error);
        return `API Error: ${error.message || error.toString()}`;
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}