import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Temporarily hardcode the API key until we fix env loading
    const apiKey = "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";
    
    const result = await streamText({
      model: openai('gpt-4o-mini', {
        apiKey: apiKey,
      }),
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
    });
    
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}