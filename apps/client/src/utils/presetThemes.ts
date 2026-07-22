import { ThemeSchema } from '@tokenvibe/shared';

export const presetThemes: ThemeSchema[] = [
  {
    metadata: {
      name: "Cyberpunk Edge",
      description: "A dark, high-contrast theme with neon accents, perfect for futuristic or developer-focused tools.",
      prompt: "A dark mode cyberpunk theme with neon purple and green."
    },
    intent: { style: "Cyberpunk", mood: "Bold", industry: "Tech" },
    colors: {
      primary: "#8b5cf6",
      primaryForeground: "#ffffff",
      secondary: "#10b981",
      secondaryForeground: "#ffffff",
      background: "#09090b",
      surface: "#18181b",
      foreground: "#f8fafc",
      muted: "#27272a",
      mutedForeground: "#a1a1aa",
      border: "#3f3f46",
      ring: "rgba(139,92,246,0.5)",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    },
    typography: { headingFont: "Space Grotesk, sans-serif", bodyFont: "Inter, sans-serif", baseFontSize: "16px" },
    spacing: { sm: "0.25rem", md: "0.75rem", lg: "1.5rem", xl: "3rem" },
    radius: { sm: "0px", md: "0.125rem", lg: "0.25rem", full: "9999px" },
    shadows: {
      sm: "0 0 10px rgba(139,92,246,0.1)",
      md: "0 0 20px rgba(139,92,246,0.2)",
      lg: "0 0 30px rgba(139,92,246,0.3)"
    },
    motion: { duration: "150ms", easing: "ease-out" },
    components: { button: "filled", input: "outlined", card: "bordered" },
    charts: { palette: ["#8b5cf6", "#10b981", "#3b82f6", "#ef4444", "#f59e0b"] }
  },
  {
    metadata: {
      name: "Neobrutalism",
      description: "Bold, flat colors with hard shadows and sharp corners. High energy and playful.",
      prompt: "A bold neobrutalism theme."
    },
    intent: { style: "Neobrutalism", mood: "Playful", industry: "Creative" },
    colors: {
      primary: "#ff3e00",
      primaryForeground: "#ffffff",
      secondary: "#ffb000",
      secondaryForeground: "#000000",
      background: "#f4f4f0",
      surface: "#ffffff",
      foreground: "#000000",
      muted: "#e5e5e5",
      mutedForeground: "#525252",
      border: "#000000",
      ring: "#000000",
      success: "#00c48c",
      warning: "#ffb000",
      error: "#ff3e00"
    },
    typography: { headingFont: "Syne, sans-serif", bodyFont: "DM Sans, sans-serif", baseFontSize: "16px" },
    spacing: { sm: "0.5rem", md: "1rem", lg: "2rem", xl: "4rem" },
    radius: { sm: "0px", md: "0px", lg: "0px", full: "9999px" },
    shadows: {
      sm: "4px 4px 0px 0px rgba(0,0,0,1)",
      md: "6px 6px 0px 0px rgba(0,0,0,1)",
      lg: "8px 8px 0px 0px rgba(0,0,0,1)"
    },
    motion: { duration: "100ms", easing: "linear" },
    components: { button: "filled", input: "outlined", card: "bordered" },
    charts: { palette: ["#ff3e00", "#ffb000", "#00c48c", "#000000", "#e5e5e5"] }
  },
  {
    metadata: {
      name: "Apple Minimal",
      description: "Clean, elegant, glassmorphic UI with soft shadows and high attention to typography.",
      prompt: "Clean minimal UI inspired by Apple."
    },
    intent: { style: "Minimal", mood: "Elegant", industry: "Tech" },
    colors: {
      primary: "#0071e3",
      primaryForeground: "#ffffff",
      secondary: "#f5f5f7",
      secondaryForeground: "#1d1d1f",
      background: "#ffffff",
      surface: "rgba(255, 255, 255, 0.72)",
      foreground: "#1d1d1f",
      muted: "#f5f5f7",
      mutedForeground: "#86868b",
      border: "#d2d2d7",
      ring: "rgba(0,113,227,0.3)",
      success: "#34c759",
      warning: "#ff9f0a",
      error: "#ff3b30"
    },
    typography: { headingFont: "-apple-system, BlinkMacSystemFont, sans-serif", bodyFont: "-apple-system, BlinkMacSystemFont, sans-serif", baseFontSize: "16px" },
    spacing: { sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2.5rem" },
    radius: { sm: "0.375rem", md: "0.75rem", lg: "1.25rem", full: "9999px" },
    shadows: {
      sm: "0 1px 2px rgba(0,0,0,0.04)",
      md: "0 4px 12px rgba(0,0,0,0.08)",
      lg: "0 12px 32px rgba(0,0,0,0.12)"
    },
    motion: { duration: "300ms", easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    components: { button: "filled", input: "outlined", card: "elevated" },
    charts: { palette: ["#0071e3", "#34c759", "#ff9f0a", "#ff3b30", "#5e5ce6"] }
  },
  {
    metadata: {
      name: "Stripe Finance",
      description: "Trustworthy, sharp, and highly legible. Perfect for fintech applications.",
      prompt: "A trustworthy fintech theme."
    },
    intent: { style: "Modern", mood: "Professional", industry: "Finance" },
    colors: {
      primary: "#635bff",
      primaryForeground: "#ffffff",
      secondary: "#f6f9fc",
      secondaryForeground: "#425466",
      background: "#f6f9fc",
      surface: "#ffffff",
      foreground: "#0a2540",
      muted: "#e3e8ee",
      mutedForeground: "#425466",
      border: "#e3e8ee",
      ring: "rgba(99,91,255,0.4)",
      success: "#00d924",
      warning: "#ffb400",
      error: "#ff2f40"
    },
    typography: { headingFont: "Inter, sans-serif", bodyFont: "Inter, sans-serif", baseFontSize: "16px" },
    spacing: { sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "3rem" },
    radius: { sm: "0.25rem", md: "0.375rem", lg: "0.5rem", full: "9999px" },
    shadows: {
      sm: "0 2px 5px -1px rgba(50,50,93,0.25), 0 1px 3px -1px rgba(0,0,0,0.3)",
      md: "0 7px 14px 0 rgba(60,66,87,0.1), 0 3px 6px 0 rgba(0,0,0,0.1)",
      lg: "0 15px 35px 0 rgba(60,66,87,0.1), 0 5px 15px 0 rgba(0,0,0,0.1)"
    },
    motion: { duration: "200ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
    components: { button: "filled", input: "outlined", card: "elevated" },
    charts: { palette: ["#635bff", "#00d924", "#ffb400", "#ff2f40", "#0a2540"] }
  }
];
