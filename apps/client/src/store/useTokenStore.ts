import { create } from 'zustand';

import { ThemeSchema } from '@tokenvibe/shared';

export type ActiveTab = 'web' | 'mobile' | 'components';
export type BottomTab = 'colors' | 'typography' | 'spacing' | 'radius';

interface TokenState {
  theme: ThemeSchema;
  setTheme: (theme: ThemeSchema) => void;
  updateThemeValue: (path: string[], value: any) => void;
  isExportOpen: boolean;
  setIsExportOpen: (isOpen: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  bottomTab: BottomTab;
  setBottomTab: (tab: BottomTab) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  historyItems: any[];
  loadHistory: () => Promise<void>;
  saveTheme: (theme: ThemeSchema) => Promise<boolean>;
  deleteTheme: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  appView: 'dashboard' | 'explore';
  setAppView: (view: 'dashboard' | 'explore') => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
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

export const useTokenStore = create<TokenState>((set, get) => ({
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
  activeTab: 'web',
  setActiveTab: (tab) => set({ activeTab: tab }),
  bottomTab: 'colors',
  setBottomTab: (tab) => set({ bottomTab: tab }),
  showHistory: false,
  setShowHistory: (show) => set({ showHistory: show }),
  historyItems: [],
  loadHistory: async () => {
    const { showHistory } = get();
    if (showHistory) {
      set({ showHistory: false });
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/themes/mock-user-123`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      set({ historyItems: data, showHistory: true });
    } catch (e) {
      console.error(e);
      // Fallback for when API server is not running
      const currentItems = get().historyItems;
      if (currentItems.length === 0) {
        set({ 
          historyItems: [{ id: 'mock-1', name: 'Sample Saved Theme', createdAt: new Date().toISOString(), schemaJson: defaultTheme }], 
          showHistory: true 
        });
      } else {
        set({ showHistory: true });
      }
    }
  },
  saveTheme: async (newTheme) => {
    const { historyItems } = get();
    // Check for duplicates by comparing colors (simplest proxy for unique theme)
    const isDuplicate = historyItems.some(item => {
      if (!item.schemaJson || !item.schemaJson.colors) return false;
      return JSON.stringify(item.schemaJson.colors) === JSON.stringify(newTheme.colors);
    });
    
    if (isDuplicate) {
      return false; // Indicates duplicate
    }
    
    const newItem = {
      id: `mock-${Date.now()}`,
      name: newTheme.metadata.name || 'Untitled Theme',
      createdAt: new Date().toISOString(),
      schemaJson: newTheme
    };
    
    set({ historyItems: [newItem, ...historyItems] });
    return true; // Indicates success
  },
  deleteTheme: (id) => {
    set({ historyItems: get().historyItems.filter(item => item.id !== id) });
  },
  isDarkMode: true,
  toggleDarkMode: () => {
    const newDarkMode = !get().isDarkMode;
    set({ isDarkMode: newDarkMode });
    if (typeof window !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  appView: 'dashboard',
  setAppView: (view) => set({ appView: view }),
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating })
}));
