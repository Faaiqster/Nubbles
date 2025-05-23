import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBiXdDJd5TtUsby_Ph5ZhKEafsI-EzfZpg');

export const summarizeText = async (fullText: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Summarize the following news article in a concise, engaging way (max 2-3 sentences): ${fullText}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    // Fallback to a simple truncation if AI summarization fails
    if (fullText.length > 280) {
      return fullText.substring(0, 280) + '...';
    }
    return fullText;
  }
};