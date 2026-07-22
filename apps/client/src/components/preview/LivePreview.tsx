"use client";

import { useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { WebPreview } from "./WebPreview";
import { MobilePreview } from "./MobilePreview";
import { ComponentsPreview } from "./ComponentsPreview";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function LivePreview() {
  const { theme, activeTab, setActiveTab, bottomTab, setBottomTab } = useTokenStore();
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const cssVariables = React.useMemo(() => {
    return {
      '--showcase-primary': theme.colors.primary,
      '--showcase-primary-foreground': theme.colors.primaryForeground,
      '--showcase-secondary': theme.colors.secondary,
      '--showcase-secondary-foreground': theme.colors.secondaryForeground,
      '--showcase-background': theme.colors.background,
      '--showcase-surface': theme.colors.surface,
      '--showcase-foreground': theme.colors.foreground,
      '--showcase-muted': theme.colors.muted,
      '--showcase-muted-foreground': theme.colors.mutedForeground,
      '--showcase-border': theme.colors.border,
      '--showcase-ring': theme.colors.ring,
      '--showcase-success': theme.colors.success,
      '--showcase-warning': theme.colors.warning,
      '--showcase-error': theme.colors.error,

      '--showcase-radius-sm': theme.radius.sm,
      '--showcase-radius-md': theme.radius.md,
      '--showcase-radius-lg': theme.radius.lg,
      '--showcase-radius-full': theme.radius.full,

      '--showcase-spacing-sm': theme.spacing.sm,
      '--showcase-spacing-md': theme.spacing.md,
      '--showcase-spacing-lg': theme.spacing.lg,
      '--showcase-spacing-xl': theme.spacing.xl,

      '--showcase-shadow-sm': theme.shadows.sm,
      '--showcase-shadow-md': theme.shadows.md,
      '--showcase-shadow-lg': theme.shadows.lg,

      '--showcase-font-heading': theme.typography.headingFont,
      '--showcase-font-body': theme.typography.bodyFont,
    } as React.CSSProperties;
  }, [theme]);

  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-background relative">
      <header className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0">
        <div className="flex gap-6 h-full">
          <button 
            onClick={() => setActiveTab('web')}
            className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'web' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Web
          </button>
          <button 
            onClick={() => setActiveTab('mobile')}
            className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'mobile' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Mobile
          </button>
          <button 
            onClick={() => setActiveTab('components')}
            className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'components' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Components
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 pb-32 flex flex-col items-center custom-scrollbar relative">
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 bg-surface border border-primary/30 text-foreground px-4 py-2 rounded-lg shadow-2xl z-50 text-sm font-medium flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> System saved to your library!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Showcase Container */}
        <div 
          id="preview-section"
          className="live-preview-container w-full max-w-5xl relative min-h-[500px] shrink-0"
          style={cssVariables}
          data-btn={theme.components.button}
          data-input={theme.components.input}
          data-card={theme.components.card}
        >
          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="w-full flex justify-center shrink-0"
             >
                {activeTab === 'web' && <WebPreview />}
                {activeTab === 'mobile' && <MobilePreview />}
                {activeTab === 'components' && <ComponentsPreview />}
             </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Tokens display below preview */}
        <div id="tokens-section" className="w-full max-w-5xl mt-12 bg-surface border border-border rounded-xl p-6 shrink-0 relative z-10 transition-all">
          <div className="flex gap-6 border-b border-border pb-4 mb-6 text-sm">
            <button onClick={() => setBottomTab('colors')} className={`${bottomTab === 'colors' ? 'text-primary font-medium border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'} pb-4 -mb-[17px] transition-colors`}>Color Tokens</button>
            <button onClick={() => setBottomTab('typography')} className={`${bottomTab === 'typography' ? 'text-primary font-medium border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'} pb-4 -mb-[17px] transition-colors`}>Typography</button>
            <button onClick={() => setBottomTab('spacing')} className={`${bottomTab === 'spacing' ? 'text-primary font-medium border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'} pb-4 -mb-[17px] transition-colors`}>Spacing</button>
            <button onClick={() => setBottomTab('radius')} className={`${bottomTab === 'radius' ? 'text-primary font-medium border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'} pb-4 -mb-[17px] transition-colors`}>Radius</button>
          </div>
          
          <div className="min-h-[120px]">
            {bottomTab === 'colors' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-3">Primary</h4>
                  <div className="flex gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                      <div key={weight} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-full aspect-square rounded-sm ${weight === 500 ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''}`} style={{ backgroundColor: `color-mix(in srgb, ${theme.colors.primary} ${weight/10}%, #f8fafc)` }}></div>
                        <span className="text-[9px] text-muted-foreground">{weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-400 mb-3">Surface</h4>
                  <div className="flex gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                      <div key={weight} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-full aspect-square rounded-sm`} style={{ backgroundColor: `color-mix(in srgb, ${theme.colors.surface} ${weight/10}%, #ffffff)` }}></div>
                        <span className="text-[9px] text-zinc-500">{weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-400 mb-3">Semantic</h4>
                  <div className="flex gap-2">
                    {[
                      { name: 'Success', color: theme.colors.success },
                      { name: 'Warning', color: theme.colors.warning },
                      { name: 'Error', color: theme.colors.error }
                    ].map(sem => (
                      <div key={sem.name} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full aspect-[2/1] rounded-md" style={{ backgroundColor: sem.color }}></div>
                        <span className="text-[9px] text-zinc-500">{sem.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {bottomTab === 'typography' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-medium text-zinc-400 mb-3">Heading Font</h4>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <span className="text-2xl font-bold" style={{ fontFamily: theme.typography.headingFont }}>Aa</span>
                    <p className="mt-2 text-sm text-zinc-300 font-mono text-xs">{theme.typography.headingFont}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-400 mb-3">Body Font</h4>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <span className="text-2xl" style={{ fontFamily: theme.typography.bodyFont }}>Aa</span>
                    <p className="mt-2 text-sm text-zinc-300 font-mono text-xs">{theme.typography.bodyFont}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {bottomTab === 'spacing' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-4 gap-4">
                {Object.entries(theme.spacing).map(([key, value]) => (
                  <div key={key} className="p-4 bg-surface rounded-lg border border-border flex flex-col items-center">
                    <div className="bg-primary/20 mb-3" style={{ width: value, height: value }}></div>
                    <span className="text-xs font-medium">{key}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {bottomTab === 'radius' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-4 gap-4">
                {Object.entries(theme.radius).map(([key, value]) => (
                  <div key={key} className="p-4 bg-surface rounded-lg border border-border flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/20 mb-3 border border-primary/50" style={{ borderRadius: value }}></div>
                    <span className="text-xs font-medium">{key}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
