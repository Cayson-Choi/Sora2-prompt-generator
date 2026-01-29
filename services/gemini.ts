import { GoogleGenAI, Type } from "@google/genai";
import { PromptResult } from "../types";

const parseResponse = (text: string): PromptResult | null => {
  try {
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as PromptResult;
  } catch (e) {
    console.error("Failed to parse JSON response", e);
    return null;
  }
};

export const generateSoraPrompt = async (userInput: string): Promise<PromptResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an expert AI Video Prompt Engineer specializing in Sora 2 and other high-end video generation models. 
    Your goal is to take a short, vague user description and transform it into a highly detailed, cinematic, and photorealistic prompt.
    
    GUIDELINES:
    1.  **Structure**: The output must be valid JSON.
    2.  **Detail Level**: Add details about lighting (volumetric, cinematic, golden hour), camera angles (wide shot, macro, drone), movement (pan, tilt, dolly zoom), film stock (35mm, IMAX), texture, and atmosphere.
    3.  **Language**: 
        - 'englishPrompt': The detailed video prompt in English (best for Sora).
        - 'koreanPrompt': The detailed video prompt translated into natural, descriptive Korean.
        - 'koreanExplanation': A brief explanation in Korean of the enhancements you made (e.g., why you chose this lighting).
    4.  **Sora Specifics**: Focus on continuity, physics, and vivid visual descriptors.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInput,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          englishPrompt: {
            type: Type.STRING,
            description: "The final, highly detailed video generation prompt in English."
          },
          koreanPrompt: {
            type: Type.STRING,
            description: "The Korean translation of the final detailed prompt."
          },
          koreanExplanation: {
            type: Type.STRING,
            description: "A summary in Korean explaining the enhanced details (lighting, camera, mood) added to the prompt."
          },
          visualStyle: {
            type: Type.STRING,
            description: "3-5 keywords describing the visual style (e.g., Cyberpunk, Photorealistic, 35mm Film)."
          }
        },
        required: ["englishPrompt", "koreanPrompt", "koreanExplanation", "visualStyle"]
      }
    }
  });

  const result = response.text ? parseResponse(response.text) : null;
  
  if (!result) {
    throw new Error("Failed to generate a valid prompt.");
  }

  return result;
};