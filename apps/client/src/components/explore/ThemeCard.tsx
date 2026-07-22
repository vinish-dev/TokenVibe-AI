"use client";

import { ThemeSchema } from '@tokenvibe/shared';
import { useTokenStore } from '@/store/useTokenStore';
import { motion } from 'framer-motion';

interface ThemeCardProps {
  theme: ThemeSchema;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const { setTheme, setAppView } = useTokenStore();

  const handleApply = () => {
    setTheme(theme);
    setAppView('dashboard');
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
      onClick={handleApply}
    >
      <div className="p-4 bg-background flex-1 flex flex-col gap-4">
        {/* Color Palette Mini-Preview */}
        <div className="flex rounded-lg overflow-hidden h-16 w-full border border-border shadow-sm">
          <div className="flex-1" style={{ backgroundColor: theme.colors.primary }}></div>
          <div className="flex-1" style={{ backgroundColor: theme.colors.secondary }}></div>
          <div className="flex-1" style={{ backgroundColor: theme.colors.background }}></div>
          <div className="flex-1" style={{ backgroundColor: theme.colors.surface }}></div>
        </div>

        {/* Typography Preview */}
        <div className="space-y-1">
          <div className="text-xl font-bold truncate" style={{ fontFamily: theme.typography.headingFont, color: theme.colors.foreground }}>Aa</div>
          <div className="text-xs truncate" style={{ fontFamily: theme.typography.bodyFont, color: theme.colors.mutedForeground }}>{theme.typography.headingFont}</div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-surface flex justify-between items-center group-hover:bg-primary/5 transition-colors">
        <div>
          <h3 className="font-semibold text-foreground text-sm">{theme.metadata.name}</h3>
          <p className="text-xs text-muted-foreground truncate max-w-[150px]">{theme.intent.style} • {theme.intent.mood}</p>
        </div>
        <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Apply
        </button>
      </div>
    </motion.div>
  );
}
