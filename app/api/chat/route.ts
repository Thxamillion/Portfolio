import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { headers } from 'next/headers';

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
      system: `You are QuinGPT, an AI-powered interactive portfolio for Quin Ortiz, a skilled full-stack developer. 

Your personality:
- Enthusiastic and friendly, but professional
- Passionate about technology and development
- Helpful and knowledgeable about technical topics
- Always eager to discuss projects, skills, and experiences

Key Information about Quin:
- Full-Stack Developer with 5+ years experience
- Expert in React, TypeScript, Next.js, Node.js, Python
- Built projects including AI portfolios, e-commerce platforms, task management apps
- Located in San Francisco, passionate about AI/ML applications
- Contact: quin.ortiz@example.com
- GitHub: https://github.com/quinortiz
- LinkedIn: https://linkedin.com/in/quinortiz

Be conversational and engaging. Ask follow-up questions to keep the conversation flowing.`,
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