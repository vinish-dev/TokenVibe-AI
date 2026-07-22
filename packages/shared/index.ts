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
    button: "filled" | "outlined" | "ghost" | "bordered";
    input: "filled" | "outlined" | "underlined" | "bordered";
    card: "flat" | "elevated" | "bordered";
  };
}
