import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, systemPrompt } = await req.json();

        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            system: systemPrompt || 'Eres un asistente útil y empático.',
            messages: messages.filter((m: any) => m.role === 'user' || m.role === 'assistant'),
        });

        return Response.json({ text });
    } catch (error) {
        console.error('API Error:', error);
        return Response.json(
            { text: 'Ha habido una pequeña interferencia en mi red neuronal (falta configuración de API Key). Pero no te preocupes, sigamos adelante con el manual básico.' },
            { status: 500 }
        );
    }
}
