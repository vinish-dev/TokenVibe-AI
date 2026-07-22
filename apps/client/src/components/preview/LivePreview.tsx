"use client";

import { useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { WebPreview } from "./WebPreview";
import { MobilePreview } from "./MobilePreview";
import { ComponentsPreview } from "./ComponentsPreview";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function LivePreview() {
  const { theme } = useTokenStore();
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'components'>('web');
  const [bottomTab, setBottomTab] = useState<'colors' | 'typography' | 'spacing' | 'radius'>('colors');
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

  const TabButton = ({ id, label }: { id: 'web' | 'mobile' | 'components', label: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`relative px-4 py-1.5 text-sm font-medium transition-colors z-10 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
      >
        {isActive && (
          <motion.div 
            layoutId="preview-tab" 
            className="absolute inset-0 bg-white/10 rounded-full -z-10 backdrop-blur-sm border border-white/10"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        {label}
      </button>
    );
  };

  return (
    <section className="flex-1 flex flex-col overflow-hidden relative">
      <header className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-black/40 backdrop-blur-md border border-white/5 p-1 rounded-full flex gap-1 shadow-2xl">
        <TabButton id="web" label="Web" />
        <TabButton id="mobile" label="Mobile" />
        <TabButton id="components" label="Components" />
      </header>
      
      <div className="flex-1 overflow-y-auto pt-24 pb-32 flex flex-col items-center custom-scrollbar relative">
        {/* Stage Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none z-[-1]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: `40px 40px`
          }}
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-4 bg-primary/20 backdrop-blur-xl border border-primary/30 text-white px-5 py-2.5 rounded-full shadow-[0_10px_40px_rgba(139,92,246,0.3)] z-50 text-sm font-medium flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> System saved to your library!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Showcase Container */}
        <div 
          className="live-preview-container w-full max-w-7xl relative min-h-[500px] shrink-0 z-10"
          style={cssVariables}
          data-btn={theme.components.button}
          data-input={theme.components.input}
          data-card={theme.components.card}
        >
          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20, scale: 0.98 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -20, scale: 0.98 }}
               transition={{ duration: 0.3, type: "spring", bounce: 0 }}
               className="w-full flex justify-center shrink-0"
             >
                {activeTab === 'web' && <WebPreview />}
                {activeTab === 'mobile' && <MobilePreview />}
                {activeTab === 'components' && <ComponentsPreview />}
             </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Tokens display below preview */}
        <div className="w-full max-w-7xl mt-12 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 shrink-0 relative z-20 transition-all">
          <div className="flex gap-6 border-b border-white/5 pb-4 mb-6 text-sm relative">
            {['colors', 'typography', 'spacing', 'radius'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setBottomTab(tab as any)} 
                className={`pb-4 -mb-[17px] capitalize transition-colors relative ${bottomTab === tab ? 'text-primary font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                {tab === 'colors' ? 'Color Tokens' : tab}
                {bottomTab === tab && (
                  <motion.div 
                    layoutId="bottom-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="min-h-[120px]">
            {bottomTab === 'colors' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wider uppercase">Primary</h4>
                  <div className="flex gap-1 p-2 bg-black/20 rounded-xl border border-white/5">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                      <div key={weight} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className={`w-full aspect-square rounded-[4px] transition-transform group-hover:scale-110 ${weight === 500 ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''}`} style={{ backgroundColor: `color-mix(in srgb, ${theme.colors.primary} ${weight/10}%, #f8fafc)` }}></div>
                        <span className="text-[10px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4">{weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wider uppercase">Surface</h4>
                  <div className="flex gap-1 p-2 bg-black/20 rounded-xl border border-white/5">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                      <div key={weight} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className={`w-full aspect-square rounded-[4px] transition-transform group-hover:scale-110`} style={{ backgroundColor: `color-mix(in srgb, ${theme.colors.surface} ${weight/10}%, #ffffff)` }}></div>
                        <span className="text-[10px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4">{weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wider uppercase">Semantic</h4>
                  <div className="flex gap-2">
                    {[
                      { name: 'Success', color: theme.colors.success },
                      { name: 'Warning', color: theme.colors.warning },
                      { name: 'Error', color: theme.colors.error }
                    ].map(sem => (
                      <div key={sem.name} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full aspect-[2/1] rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: sem.color }}></div>
                        <span className="text-xs font-medium text-zinc-400">{sem.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {bottomTab === 'typography' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wider uppercase">Heading Font</h4>
                  <div className="p-5 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between group hover:border-primary/50 transition-colors">
                    <div>
                      <span className="text-4xl font-bold text-white group-hover:text-primary transition-colors" style={{ fontFamily: theme.typography.headingFont }}>Aa</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-200">{theme.typography.headingFont}</p>
                      <p className="text-xs text-zinc-500 font-mono mt-1">Headings & Display</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wider uppercase">Body Font</h4>
                  <div className="p-5 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between group hover:border-blue-400/50 transition-colors">
                    <div>
                      <span className="text-4xl text-white group-hover:text-blue-400 transition-colors" style={{ fontFamily: theme.typography.bodyFont }}>Aa</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-200">{theme.typography.bodyFont}</p>
                      <p className="text-xs text-zinc-500 font-mono mt-1">Paragraphs & UI</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {bottomTab === 'spacing' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-4">
                {Object.entries(theme.spacing).map(([key, value]) => (
                  <div key={key} className="p-4 bg-black/20 rounded-xl border border-white/5 flex flex-col items-center group hover:bg-white/5 transition-colors">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <div className="bg-primary/40 rounded-sm shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all group-hover:bg-primary" style={{ width: value, height: value }}></div>
                    </div>
                    <span className="text-xs font-bold text-zinc-200">{key}</span>
                    <span className="text-xs font-mono text-zinc-500">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {bottomTab === 'radius' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-4">
                {Object.entries(theme.radius).map(([key, value]) => (
                  <div key={key} className="p-4 bg-black/20 rounded-xl border border-white/5 flex flex-col items-center group hover:bg-white/5 transition-colors">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <div className="w-12 h-12 bg-white/5 border border-white/20 transition-all group-hover:border-primary group-hover:bg-primary/20" style={{ borderRadius: value }}></div>
                    </div>
                    <span className="text-xs font-bold text-zinc-200">{key}</span>
                    <span className="text-xs font-mono text-zinc-500">{value}</span>
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
