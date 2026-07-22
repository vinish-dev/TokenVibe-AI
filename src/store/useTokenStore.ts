import { create } from 'zustand';

export interface ThemeSchema {
  metadata: {
    name: string;
    description: string;
    prompt: string;
  };
  intent: {
    style: string;
    mood: string;
    industry: string;
  };
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    ring: string;
    success: string;
    warning: string;
    error: string;
  };
  charts: {
    palette: string[];
  };
  gradients?: {
    primary?: string;
    hero?: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseFontSize: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  components: {
    button: "filled" | "outlined" | "ghost";
    input: "filled" | "outlined" | "underlined";
    card: "flat" | "elevated" | "bordered";
  };
}

interface TokenState {
  theme: ThemeSchema;
  setTheme: (theme: ThemeSchema) => void;
  updateThemeValue: (path: string[], value: any) => void;
  isExportOpen: boolean;
  setIsExportOpen: (isOpen: boolean) => void;
}

const defaultTheme: ThemeSchema = {
  metadata: {
    name: "Default Vibe",
    description: "A clean, balanced starting point for modern web applications.",
    prompt: ""
  },
  intent: {
    style: "Modern",
    mood: "Professional",
    industry: "Tech"
  },
  colors: {
    primary: "#8B5CF6", // Purple
    primaryForeground: "#FFFFFF",
    secondary: "#F3F4F6",
    secondaryForeground: "#1F2937",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    foreground: "#0F172A",
    muted: "#F8FAFC",
    mutedForeground: "#64748B",
    border: "#E2E8F0",
    ring: "rgba(139,92,246,0.3)",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444"
  },
  charts: {
    palette: ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"]
  },
  typography: {
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    baseFontSize: "16px"
  },
  spacing: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },
  motion: {
    duration: "200ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  components: {
    button: "filled",
    input: "outlined",
    card: "bordered"
  }
};

export const useTokenStore = create<TokenState>((set) => ({
  theme: defaultTheme,
  setTheme: (theme) => set({ theme }),
  updateThemeValue: (path, value) => set((state) => {
    // Simple deep clone and update
    const newTheme = JSON.parse(JSON.stringify(state.theme));
    let current = newTheme;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    return { theme: newTheme };
  }),
  isExportOpen: false,
  setIsExportOpen: (isOpen) => set({ isExportOpen: isOpen }),
}));
