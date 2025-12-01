import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API Client
// Using the API key from environment variables as strictly required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a nail art image based on a user prompt using Gemini 2.5 Flash Image.
 */
export const generateNailArtImage = async (prompt: string): Promise<string | null> => {
  try {
    const fullPrompt = `Professional nail art design, macro photography style, high resolution, realistic texture. The design should be: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating nail art:", error);
    throw error;
  }
};

/**
 * Generates a text description/suggestion for nail art if image generation fails or as an alternative.
 */
export const generateNailArtSuggestion = async (mood: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Suggest a unique and trendy nail art design description for a client who wants something related to: "${mood}". Keep it concise, under 50 words, and focused on visual details.`,
        });
        return response.text || "Could not generate a suggestion at this time.";
    } catch (error) {
        console.error("Error generating text suggestion:", error);
        return "Connect with Miral directly for personalized suggestions!";
    }
}
