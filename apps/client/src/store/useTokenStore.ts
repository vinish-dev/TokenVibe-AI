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

import { persist } from 'zustand/middleware';

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
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
        // Local storage automatically loads historyItems via persist middleware
        set({ showHistory: true });
      },
      saveTheme: async (newTheme) => {
        const { historyItems } = get();
        // Check for duplicates by comparing colors (simplest proxy for unique theme)
        const isDuplicate = historyItems.some(item => {
          if (!item.schemaJson) return false;
          let schemaObj = item.schemaJson;
          if (typeof schemaObj === 'string') {
            try { schemaObj = JSON.parse(schemaObj); } catch(e) {}
          }
          if (!schemaObj.colors) return false;
          return JSON.stringify(schemaObj.colors) === JSON.stringify(newTheme.colors);
        });
        
        if (isDuplicate) {
          return false; // Indicates duplicate
        }
        
        const newItem = {
          id: `local-${Date.now()}`,
          name: newTheme.metadata.name || 'Untitled Theme',
          createdAt: new Date().toISOString(),
          schemaJson: newTheme
        };
        
        set({ historyItems: [newItem, ...historyItems] });
        return true; // Indicates success
      },
      deleteTheme: async (id) => {
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
    }),
    {
      name: 'tokenvibe-storage',
      partialize: (state) => ({ 
        historyItems: state.historyItems,
        theme: state.theme,
        isDarkMode: state.isDarkMode
      })
    }
  )
);
