import { ThemeSchema } from "@/store/useTokenStore";

export const mockThemes: ThemeSchema[] = [
  {
    metadata: {
      name: "Cyberpunk Edge",
      description: "High contrast, neon-lit aesthetics designed for gaming and futuristic interfaces.",
      prompt: "Cyberpunk"
    },
    intent: {
      style: "Cyberpunk",
      mood: "Bold",
      industry: "Gaming"
    },
    colors: {
      primary: "#FDE047", // Neon Yellow
      primaryForeground: "#000000",
      secondary: "#D946EF", // Neon Pink
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
    gradients: {
      primary: "linear-gradient(135deg, #D946EF 0%, #06B6D4 100%)",
      hero: "linear-gradient(180deg, rgba(217,70,239,0.15) 0%, rgba(9,9,11,1) 100%)"
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
      full: "9999px" // Keeps some pill shapes valid
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
  },
  {
    metadata: {
      name: "Apple Inspired",
      description: "Clean, frosted glass elements with refined typography and soft shadows.",
      prompt: "Apple-inspired"
    },
    intent: {
      style: "Glassmorphism",
      mood: "Premium",
      industry: "Technology"
    },
    colors: {
      primary: "#007AFF",
      primaryForeground: "#FFFFFF",
      secondary: "#E5E5EA",
      secondaryForeground: "#000000",
      background: "#F2F2F7",
      surface: "rgba(255, 255, 255, 0.7)",
      foreground: "#000000",
      muted: "rgba(255, 255, 255, 0.5)",
      mutedForeground: "#8E8E93",
      border: "rgba(0, 0, 0, 0.1)",
      ring: "rgba(0, 122, 255, 0.3)",
      success: "#34C759",
      warning: "#FF9500",
      error: "#FF3B30"
    },
    charts: {
      palette: ["#007AFF", "#34C759", "#FF9500", "#FF3B30", "#5856D6"]
    },
    typography: {
      headingFont: "'-apple-system', BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      bodyFont: "'-apple-system', BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      baseFontSize: "16px"
    },
    spacing: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem"
    },
    radius: {
      sm: "6px",
      md: "12px",
      lg: "20px",
      full: "9999px"
    },
    shadows: {
      sm: "0 1px 2px rgba(0,0,0,0.04)",
      md: "0 4px 12px rgba(0,0,0,0.08)",
      lg: "0 12px 32px rgba(0,0,0,0.12)"
    },
    motion: {
      duration: "300ms",
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    },
    components: {
      button: "filled",
      input: "filled",
      card: "elevated"
    }
  },
  {
    metadata: {
      name: "Neo Brutalism",
      description: "High impact, unrefined structural elements with harsh contrasts.",
      prompt: "Neo Brutalism"
    },
    intent: {
      style: "Neobrutalism",
      mood: "Playful",
      industry: "Design"
    },
    colors: {
      primary: "#FF4D4D",
      primaryForeground: "#000000",
      secondary: "#4DA6FF",
      secondaryForeground: "#000000",
      background: "#FFF4E0",
      surface: "#FFFFFF",
      foreground: "#000000",
      muted: "#E0D5C1",
      mutedForeground: "#4A4A4A",
      border: "#000000",
      ring: "#000000",
      success: "#00E676",
      warning: "#FFEA00",
      error: "#FF4D4D"
    },
    charts: {
      palette: ["#FF4D4D", "#4DA6FF", "#FFEA00", "#00E676", "#D500F9"]
    },
    typography: {
      headingFont: "'Archivo Black', sans-serif",
      bodyFont: "'Public Sans', sans-serif",
      baseFontSize: "18px"
    },
    spacing: {
      sm: "0.75rem",
      md: "1.5rem",
      lg: "2.5rem",
      xl: "4rem"
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "0px",
      full: "0px"
    },
    shadows: {
      sm: "4px 4px 0px #000000",
      md: "8px 8px 0px #000000",
      lg: "16px 16px 0px #000000"
    },
    motion: {
      duration: "150ms",
      easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    },
    components: {
      button: "bordered",
      input: "bordered",
      card: "bordered"
    }
  }
];

export const getRandomMockTheme = (): ThemeSchema => {
  const index = Math.floor(Math.random() * mockThemes.length);
  return mockThemes[index];
};

export const getMockThemeByPersonality = (personality: string): ThemeSchema => {
  const p = personality.toLowerCase();
  if (p === 'cyberpunk' || p === 'bold') {
    return mockThemes[0]; // Cyberpunk Edge
  } else if (p === 'elegant' || p === 'luxury' || p === 'minimal') {
    return mockThemes[1]; // Apple Inspired
  } else if (p === 'playful' || p === 'friendly') {
    return mockThemes[2]; // Neo Brutalism
  }
  return mockThemes[0]; // Default fallback
};
