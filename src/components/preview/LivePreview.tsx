"use client";

import { useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { WebPreview } from "./WebPreview";
import { MobilePreview } from "./MobilePreview";
import { ComponentsPreview } from "./ComponentsPreview";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function LivePreview() {
  const { tokens } = useTokenStore();
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'components'>('web');

  const cssVariables = React.useMemo(() => {
    return {
      '--showcase-primary': tokens.colors.primary,
      '--showcase-background': tokens.colors.background,
      '--showcase-foreground': tokens.colors.foreground,
      '--showcase-surface': tokens.colors.surface,
      '--showcase-border': tokens.colors.border,
      '--showcase-success': tokens.colors.success,
      '--showcase-warning': tokens.colors.warning,
      '--showcase-error': tokens.colors.error,
      '--showcase-info': tokens.colors.info,
      '--showcase-radius-sm': tokens.radius.sm,
      '--showcase-radius-md': tokens.radius.md,
      '--showcase-radius-lg': tokens.radius.lg,
      '--showcase-radius-xl': tokens.radius.xl,
      '--showcase-radius-full': tokens.radius.full,
      '--showcase-spacing-sm': tokens.spacing.sm,
      '--showcase-spacing-md': tokens.spacing.md,
      '--showcase-spacing-lg': tokens.spacing.lg,
      '--showcase-spacing-xl': tokens.spacing.xl,
    } as React.CSSProperties;
  }, [tokens]);

  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0c]">
      <header className="h-14 border-b border-border flex items-center px-6 gap-6 shrink-0">
        <button 
          onClick={() => setActiveTab('web')}
          className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'web' ? 'border-primary text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          Web
        </button>
        <button 
          onClick={() => setActiveTab('mobile')}
          className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'mobile' ? 'border-primary text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          Mobile
        </button>
        <button 
          onClick={() => setActiveTab('components')}
          className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${activeTab === 'components' ? 'border-primary text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          Components
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 pb-32 flex flex-col items-center custom-scrollbar">
        {/* Showcase Container */}
        <div 
          className="live-preview-container w-full max-w-5xl relative min-h-[500px] shrink-0"
          style={cssVariables}
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
        <div className="w-full max-w-5xl mt-12 bg-[#0e0e11] border border-border rounded-xl p-6 shrink-0 relative z-10">
          <div className="flex gap-6 border-b border-border pb-4 mb-6 text-sm">
            <span className="text-primary font-medium border-b-2 border-primary pb-4 -mb-[17px]">Color Tokens</span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Typography</span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Spacing</span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Radius</span>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-medium text-zinc-400 mb-3">Primary</h4>
              <div className="flex gap-1">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                  <div key={weight} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full aspect-square rounded-sm ${weight === 500 ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#0e0e11]' : ''}`} style={{ backgroundColor: `color-mix(in srgb, ${tokens.colors.primary} ${weight/10}%, #f8fafc)` }}></div>
                    <span className="text-[9px] text-zinc-500">{weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-zinc-400 mb-3">Surface</h4>
              <div className="flex gap-1">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                  <div key={weight} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full aspect-square rounded-sm`} style={{ backgroundColor: `color-mix(in srgb, ${tokens.colors.surface} ${weight/10}%, #ffffff)` }}></div>
                    <span className="text-[9px] text-zinc-500">{weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-zinc-400 mb-3">Semantic</h4>
              <div className="flex gap-2">
                {[
                  { name: 'Success', color: tokens.colors.success },
                  { name: 'Warning', color: tokens.colors.warning },
                  { name: 'Error', color: tokens.colors.error },
                  { name: 'Info', color: tokens.colors.info }
                ].map(sem => (
                  <div key={sem.name} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full aspect-[2/1] rounded-md" style={{ backgroundColor: sem.color }}></div>
                    <span className="text-[9px] text-zinc-500">{sem.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
