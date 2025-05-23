import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Placeholder for gnews fetching function
async function fetchNews() {
  // TODO: Implement gnews fetching logic
  if (!GNEWS_API_KEY) {
    throw new Error('GNEWS_API_KEY is not set');
  }
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=${GNEWS_API_KEY}`;
  console.log(`Fetching news from: ${url}`); // Log the URL for debugging
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('gnews API error:', errorText);
    throw new Error(`gnews API returned error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  console.log('gnews API response:', data); // Log the response for debugging
  return data.articles || []; // Ensure 'articles' exists
}

// Helper function to check if the description is sufficient
function isDescriptionSufficient(description: string | null | undefined): boolean {
  if (!description) {
    return false;
  }
  // Criteria: more than 100 characters and ends with a punctuation mark (., !, ?)
  // or is longer than 200 characters (even without clear punctuation).
  const hasGoodLength = description.length > 100;
  const endsWithPunctuation = /[.!?]$/.test(description.trim());
  const isVeryLong = description.length > 200;

  return (hasGoodLength && endsWithPunctuation) || isVeryLong;
}

// Gemini summarization function
async function summarizeText(text: string) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Or your desired model
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };
    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Summarize the following news article: ${text}` }] }],
        generationConfig,
        safetySettings,
    });
    
    if (result.response) {
        const summary = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
        return summary || text.substring(0, 100) + "... (summary unavailable)"; // Fallback
    } else {
        return text.substring(0, 100) + "... (summary generation failed)"; // Fallback
    }
  } catch (error) {
    console.error('Error summarizing text with Gemini:', error);
    return text.substring(0, 100) + "... (summary error)"; // Fallback in case of error
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!GNEWS_API_KEY || !GEMINI_API_KEY) {
    console.error('API keys are not set');
    return res.status(500).json({ error: 'API keys are not configured on the server.' });
  }

  try {
    const articles = await fetchNews();
    if (!Array.isArray(articles)) {
        console.error('Fetched articles is not an array:', articles);
        return res.status(500).json({ error: 'Failed to fetch news articles or articles format is incorrect.' });
    }
    console.log(`Fetched ${articles.length} articles.`);

    const summarizedArticles = [];
    for (const article of articles) {
      if (!article.title) { 
        console.warn('Skipping article due to missing title:', article);
        continue;
      }

      let summary;
      let textForSummarizationInput;

      if (isDescriptionSufficient(article.description)) {
        console.log(`Using description directly for article: ${article.title}`);
        summary = article.description;
      } else {
        console.log(`Description not sufficient, attempting to summarize for: ${article.title}`);
        // Prioritize content if substantial, otherwise description (if exists), then title.
        if (article.content && article.content.length > (article.description?.length || 0) && article.content.length > 150 && !article.content.endsWith("[More]")) {
          textForSummarizationInput = article.content;
        } else if (article.description && article.description.length > 50) { // Use description if content is poor or too short
          textForSummarizationInput = article.description;
        } else { // Last resort: title (though summarizeText might just return it)
          textForSummarizationInput = article.title;
        }
        
        console.log(`Text selected for summarization input for "${article.title}": ${textForSummarizationInput?.substring(0,100)}...`);
        summary = await summarizeText(textForSummarizationInput);
      }
      
      summarizedArticles.push({ 
        // Ensure all original article fields are spread, and summary is overwritten/added
        ...article, 
        summary: summary || article.description || article.title // Final fallback for summary
      });
    }

    console.log('Successfully processed articles with summaries.');
    res.status(200).json(summarizedArticles);
  } catch (error: any) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred.' });
  }
}
