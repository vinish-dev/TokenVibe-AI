import { GoogleGenAI } from "@google/genai";
import { ThemeSchema } from "@tokenvibe/shared";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schemaDef = {
  type: "OBJECT",
  properties: {
    metadata: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        description: { type: "STRING" },
        prompt: { type: "STRING" }
      },
      required: ["name", "description", "prompt"]
    },
    intent: {
      type: "OBJECT",
      properties: {
        style: { type: "STRING" },
        mood: { type: "STRING" },
        industry: { type: "STRING" }
      },
      required: ["style", "mood", "industry"]
    },
    colors: {
      type: "OBJECT",
      properties: {
        primary: { type: "STRING", description: "Hex color e.g., #FDE047" },
        primaryForeground: { type: "STRING" },
        secondary: { type: "STRING" },
        secondaryForeground: { type: "STRING" },
        background: { type: "STRING" },
        surface: { type: "STRING" },
        foreground: { type: "STRING" },
        muted: { type: "STRING" },
        mutedForeground: { type: "STRING" },
        border: { type: "STRING" },
        ring: { type: "STRING" },
        success: { type: "STRING" },
        warning: { type: "STRING" },
        error: { type: "STRING" }
      },
      required: ["primary", "primaryForeground", "secondary", "secondaryForeground", "background", "surface", "foreground", "muted", "mutedForeground", "border", "ring", "success", "warning", "error"]
    },
    charts: {
      type: "OBJECT",
      properties: {
        palette: { type: "ARRAY", items: { type: "STRING" } }
      },
      required: ["palette"]
    },
    typography: {
      type: "OBJECT",
      properties: {
        headingFont: { type: "STRING" },
        bodyFont: { type: "STRING" },
        baseFontSize: { type: "STRING", description: "e.g., 16px" }
      },
      required: ["headingFont", "bodyFont", "baseFontSize"]
    },
    spacing: {
      type: "OBJECT",
      properties: {
        sm: { type: "STRING", description: "e.g., 0.5rem" },
        md: { type: "STRING" },
        lg: { type: "STRING" },
        xl: { type: "STRING" }
      },
      required: ["sm", "md", "lg", "xl"]
    },
    radius: {
      type: "OBJECT",
      properties: {
        sm: { type: "STRING", description: "e.g., 4px" },
        md: { type: "STRING" },
        lg: { type: "STRING" },
        full: { type: "STRING", description: "e.g., 9999px" }
      },
      required: ["sm", "md", "lg", "full"]
    },
    shadows: {
      type: "OBJECT",
      properties: {
        sm: { type: "STRING", description: "e.g., 0 1px 2px rgba(0,0,0,0.05)" },
        md: { type: "STRING" },
        lg: { type: "STRING" }
      },
      required: ["sm", "md", "lg"]
    },
    motion: {
      type: "OBJECT",
      properties: {
        duration: { type: "STRING", description: "e.g., 200ms" },
        easing: { type: "STRING", description: "e.g., ease-in-out" }
      },
      required: ["duration", "easing"]
    },
    components: {
      type: "OBJECT",
      properties: {
        button: { type: "STRING", enum: ["filled", "outlined", "bordered"] },
        input: { type: "STRING", enum: ["filled", "underlined", "bordered"] },
        card: { type: "STRING", enum: ["flat", "elevated", "bordered"] }
      },
      required: ["button", "input", "card"]
    }
  },
  required: ["metadata", "intent", "colors", "charts", "typography", "spacing", "radius", "shadows", "motion", "components"]
};

export async function generateThemeWithGemini(prompt: string, personality: string, sliderValues?: Record<string, number>): Promise<ThemeSchema> {
  const systemInstruction = `You are an expert UI/UX designer. Given a prompt, personality, and slider values (0-100), generate a comprehensive semantic design system theme schema. Ensure colors have good contrast and typography choices match the personality. Ensure the response perfectly aligns with the requested JSON schema.`;
  
  let userMessage = `Generate a design system theme based on this prompt: "${prompt}" with this personality: "${personality}".`;
  if (sliderValues) {
    userMessage += ` Also consider these specific design slider traits (0-100 scale): ${JSON.stringify(sliderValues)}. Adjust the colors, fonts, spacing, shadows, and radii accordingly to reflect these traits.`;
  }

  // Provide a fallback in case API key is missing
  if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Returning a default mock theme.");
      return mockFallback(prompt, personality);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: systemInstruction,
        // @ts-ignore
        responseMimeType: "application/json",
        responseSchema: schemaDef as any
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response generated from Gemini.");
    }
    return JSON.parse(text) as ThemeSchema;
  } catch (error) {
    console.error("Gemini API call failed, using fallback:", error);
    return mockFallback(prompt, personality);
  }
}

function mockFallback(prompt: string, personality: string): ThemeSchema {
  return {
    metadata: {
      name: "Cyberpunk Edge Fallback",
      description: "Fallback theme due to missing API key.",
      prompt: prompt
    },
    intent: {
      style: "Cyberpunk",
      mood: personality,
      industry: "Gaming"
    },
    colors: {
      primary: "#FDE047",
      primaryForeground: "#000000",
      secondary: "#D946EF",
      secondaryForeground: "#FFFFFF",
      background: "#09090B",
      surface: "#18181B",
      foreground: "#FAFAFA",
      muted: "#27272A",
      mutedForeground: "#A1A1AA",
      border: "#D946EF",
      ring: "rgba(217, 70, 239, 0.4)",
      success: "#4ADE80",
      warning: "#FDE047",
      error: "#EF4444"
    },
    charts: {
      palette: ["#FDE047", "#D946EF", "#06B6D4", "#4ADE80", "#EF4444"]
    },
    typography: {
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'JetBrains Mono', monospace",
      baseFontSize: "14px"
    },
    spacing: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      xl: "2rem"
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "0px",
      full: "9999px" 
    },
    shadows: {
      sm: "4px 4px 0px 0px rgba(217,70,239,0.4)",
      md: "8px 8px 0px 0px rgba(217,70,239,0.4)",
      lg: "12px 12px 0px 0px rgba(217,70,239,0.4)"
    },
    motion: {
      duration: "100ms",
      easing: "linear"
    },
    components: {
      button: "outlined",
      input: "underlined",
      card: "flat"
    }
  };
}
