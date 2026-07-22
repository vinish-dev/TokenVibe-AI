"use client";

import { useTokenStore } from "@/store/useTokenStore";
import { ChevronRight, ChevronDown, Palette, Type, Layers, Box, Layout, ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExplorerPanel() {
  const { theme } = useTokenStore();
  
  const TreeItem = ({ label, icon: Icon, children, defaultOpen = false }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <div className="flex flex-col">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-300 hover:bg-white/5 rounded-md transition-colors w-full text-left group"
        >
          {children ? (
            isOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          ) : (
            <div className="w-3.5 h-3.5" />
          )}
          {Icon && <Icon className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />}
          <span className="font-medium group-hover:text-white transition-colors">{label}</span>
        </button>
        <AnimatePresence>
          {isOpen && children && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pl-6 border-l border-white/5 ml-3.5 mt-1 flex flex-col gap-0.5">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const ColorItem = ({ label, color }: { label: string, color: string }) => (
    <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-200 rounded-md transition-colors cursor-pointer group">
      <div className="w-3.5 h-3.5 rounded-sm shadow-sm border border-white/10 group-hover:border-white/30 transition-colors" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );

  const TextItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between px-2 py-1 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-200 rounded-md transition-colors cursor-pointer">
      <span className="truncate mr-2">{label}</span>
      <span className="font-mono text-xs text-zinc-500 bg-black/40 px-1 rounded truncate max-w-[80px]">{value}</span>
    </div>
  );

  return (
    <aside className="w-60 h-full bg-[#0a0a0c]/80 backdrop-blur-xl border-r border-white/5 flex flex-col shrink-0 z-20">
      <div className="h-12 border-b border-white/5 flex items-center px-4 shrink-0 bg-black/20">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Explorer</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <TreeItem label="Theme Tokens" icon={Palette} defaultOpen={true}>
          <TreeItem label="Colors" defaultOpen={true}>
            <ColorItem label="Background" color={theme.colors.background} />
            <ColorItem label="Foreground" color={theme.colors.foreground} />
            <ColorItem label="Primary" color={theme.colors.primary} />
            <ColorItem label="Secondary" color={theme.colors.secondary} />
            <ColorItem label="Surface" color={theme.colors.surface} />
            <TreeItem label="Semantic" defaultOpen={false}>
              <ColorItem label="Success" color={theme.colors.success} />
              <ColorItem label="Warning" color={theme.colors.warning} />
              <ColorItem label="Error" color={theme.colors.error} />
            </TreeItem>
          </TreeItem>
          
          <TreeItem label="Typography" icon={Type} defaultOpen={true}>
            <TextItem label="Heading Font" value={theme.typography.headingFont.split(',')[0]} />
            <TextItem label="Body Font" value={theme.typography.bodyFont.split(',')[0]} />
          </TreeItem>
          
          <TreeItem label="Spacing & Radius" icon={ArrowDownUp} defaultOpen={false}>
            <TextItem label="Spacing sm" value={theme.spacing.sm} />
            <TextItem label="Spacing md" value={theme.spacing.md} />
            <TextItem label="Radius md" value={theme.radius.md} />
          </TreeItem>
        </TreeItem>

        <div className="mt-4">
          <TreeItem label="Components" icon={Layers} defaultOpen={true}>
            <TreeItem label="Button" icon={Box}>
              <TextItem label="Style" value={theme.components.button} />
            </TreeItem>
            <TreeItem label="Input" icon={Layout}>
              <TextItem label="Style" value={theme.components.input} />
            </TreeItem>
            <TreeItem label="Card" icon={Layout}>
              <TextItem label="Style" value={theme.components.card} />
            </TreeItem>
          </TreeItem>
        </div>
      </div>
    </aside>
  );
}
