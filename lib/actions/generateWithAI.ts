"use server";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

// 1. Defined Model List (Prioritized by speed/quota)
const MODELS = [
  'gemini-2.0-flash-lite-preview-02-05', // Best for speed/quota
  'gemini-2.0-flash-exp',               // Fallback 1
  'gemini-2.5-flash',                   // Fallback 2
  'gemini-2.0-flash',                   // Fallback 3 (Standard)
];

export async function generateCaseStudyAI(topic: string, type: "titles" | "full_draft") {
  if (!apiKey) {
    console.error("Gemini API Key is missing.");
    return null;
  }

  // 2. Prepare the System Prompt
  let systemInstructions = '';
  
  if (type === "titles") {
    systemInstructions = `
      You are a specialized B2B copywriter. 
      Generate 5 professional, high-converting case study titles based on this project topic: "${topic}".
      Rules:
      1. Focus on results, problem-solving, or industry impact.
      2. Return ONLY a raw JSON array of strings. 
      3. No markdown, no intro text.
      Example: ["How we scaled X to Y", "Redesigning FinTech for Gen Z"]
    `;
  } 
  
  if (type === "full_draft") {
    systemInstructions = `
      You are a professional case study writer. Write a detailed case study for the project titled: "${topic}".
      
      Return ONLY a raw JSON object with the following specific fields:
      - excerpt: A compelling 2-sentence summary (string).
      - client: A fictional or placeholder client name (string).
      - industry: The likely industry (string).
      - challenge: A paragraph describing the specific problem or pain point (string).
      - solution: A paragraph summarizing the strategic solution implemented (string).
      - content: The deep-dive body content (Strategy, Process, Implementation, Conclusion). Use HTML tags like <h2>, <h3>, <p>, <ul>, <li>. Do NOT include the Challenge or Solution headers here as they are separate fields. (string).
      - seoTitle: An SEO-optimized meta title under 60 chars (string).
      - seoDescription: An SEO meta description under 160 chars (string).
      - tags: An array of 5 relevant keyword strings (array).
      - results: An array of 3 objects, each with "label" (string) and "value" (string). e.g. { "label": "Revenue", "value": "+200%" }.
      - schemaMarkup: A valid, minified JSON-LD 'Article' schema string. Include headline, datePublished (use placeholder), and author (Aitek Media) (string).

      IMPORTANT: Return ONLY the JSON. No markdown formatting like \`\`\`json.
    `;
  }

  // 3. Smart Fallback Loop
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemInstructions }] }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn(`Model ${model} failed: ${data.error?.message || response.statusText}`);
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

      return JSON.parse(cleanText);

    } catch (error) {
      console.error(`Error with model ${model}:`, error);
    }
  }

  // 5. Final Failure
  console.error('All AI models failed to generate content.');
  return null;
}