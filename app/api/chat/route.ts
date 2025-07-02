import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { getPresentation } from '@/app/tools/getPresentation';
import { getProjects } from '@/app/tools/getProjects';
import { getResume } from '@/app/tools/getResume';
import { getSkills } from '@/app/tools/getSkills';
import { getContact } from '@/app/tools/getContact';
import { getLearningGoals } from '@/app/tools/getLearningGoals';
import { SYSTEM_PROMPT } from './prompt';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Access headers to force dynamic behavior and prevent caching
    const headersList = headers();
    console.log('Request headers accessed, forcing dynamic behavior');
    
    const { messages } = await req.json();
    
    // Add extensive logging
    console.log('Received messages:', messages);
    
    // Load API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      throw new Error('OpenAI API key is not configured');
    }
    
    console.log('API Key length:', apiKey.length);
    console.log('API Key starts with:', apiKey.substring(0, 7) + '...');
    
    // Create OpenAI instance with explicit API key
    const openai = createOpenAI({
      apiKey: apiKey,
    });
    
    console.log('About to call streamText...');
    
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
      },
      maxSteps: 2, // Allow one tool call + response
      temperature: 0.7,
      maxTokens: 500,
      onError: (error) => {
        console.error('streamText onError:', error);
      },
    });
    
    console.log('streamText completed, returning response');
    
    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error('toDataStreamResponse error:', error);
        return `API Error: ${error.message || error.toString()}`;
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}