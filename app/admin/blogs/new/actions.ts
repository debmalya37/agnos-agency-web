'use server'

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

// 1. Defined Model List (Prioritized by quota/speed)
const MODELS = [
  'gemini-2.0-flash-lite-preview-02-05', // Best for speed/quota
  'gemini-2.0-flash-exp',               // Fallback 1
  'gemini-2.5-flash',                   // Fallback 2
  'gemini-2.0-flash',                   // Fallback 3 (Standard)
];

export async function generateBlogAI(type: 'title' | 'outline' | 'seo', promptContext: string) {
  if (!apiKey) {
    return { error: 'Gemini API Key is missing.' };
  }

  // 2. Prepare the System Prompt
  let systemInstructions = '';
  switch (type) {
    case 'title':
      systemInstructions = `
        You are a professional blog editor. 
        Generate 5 catchy, engaging, and SEO-friendly blog titles based on this topic: "${promptContext}".
        Rules:
        1. Keep them under 60 characters if possible.
        2. Return ONLY a raw JSON array of strings. No markdown.
        Example: ["Title 1", "Title 2"]
      `;
      break;
    case 'outline':
      systemInstructions = `
        You are an expert technical writer. Create a detailed blog post outline for: "${promptContext}".
        Rules:
        1. Use standard HTML tags (<h2>, <ul>, <li>, <p>).
        2. Do NOT use markdown symbols like ## or *.
        3. Return ONLY the HTML string.
      `;
      break;
    case 'seo':
      systemInstructions = `
        Analyze this blog content and generate SEO metadata.
        Content Preview: "${promptContext.substring(0, 1500)}..."
        Return ONLY a raw JSON object with keys: metaTitle, metaDescription, keywords.
        No markdown.
      `;
      break;
  }

  // 3. Smart Fallback Loop
  for (const model of MODELS) {
    try {
      // We use raw fetch to avoid SDK 'model not found' errors on v1beta
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemInstructions }] }]
        })
      });

      const data = await response.json();

      // If specific model fails (404 or 429), log and try next
      if (!response.ok) {
        console.warn(`Model ${model} failed: ${data.error?.message}`);
        continue; 
      }

      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) continue;

      // 4. Success! Clean and return
      const cleanText = textResponse
        .replace(/```json/g, '')
        .replace(/```html/g, '')
        .replace(/```/g, '')
        .trim();

      return { success: true, data: cleanText };

    } catch (error) {
      console.error(`Error with ${model}:`, error);
      // Continue to next model
    }
  }

  // 5. Final Failure
  return { error: 'System busy. All AI models are currently overloaded. Please try again later.' };
}