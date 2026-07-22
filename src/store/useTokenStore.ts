import { create } from 'zustand';

export interface DesignTokens {
  colors: {
    primary: string;
    background: string;
    foreground: string;
    surface: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface TokenState {
  tokens: DesignTokens;
  setTokens: (tokens: DesignTokens) => void;
  updateToken: (category: keyof DesignTokens, key: string, value: string) => void;
  isExportOpen: boolean;
  setIsExportOpen: (isOpen: boolean) => void;
}

const defaultTokens: DesignTokens = {
  colors: {
    primary: '#4f46e5', // indigo-600
    background: '#ffffff',
    foreground: '#0f172a',
    surface: '#f8fafc',
    border: '#e2e8f0',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  }
};

export const useTokenStore = create<TokenState>((set) => ({
  tokens: defaultTokens,
  setTokens: (tokens) => set({ tokens }),
  updateToken: (category, key, value) => set((state) => ({
    tokens: {
      ...state.tokens,
      [category]: {
        ...state.tokens[category],
        [key]: value
      }
    }
  })),
  isExportOpen: false,
  setIsExportOpen: (isOpen) => set({ isExportOpen: isOpen }),
}));
