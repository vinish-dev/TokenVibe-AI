"use client";

import { Sparkles, LayoutDashboard, Palette, Type, Layers, Eye, Download, Settings, Moon } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";

export function Sidebar() {
  const { setIsExportOpen } = useTokenStore();

  return (
    <aside className="w-64 border-r border-border bg-[#0e0e11] flex flex-col py-6 px-4 shrink-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">TokenVibe AI</h1>
          <p className="text-[10px] text-zinc-400">Semantic Design System Generator</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
          <Palette className="w-5 h-5" /> Tokens
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
          <Type className="w-5 h-5" /> Typography
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
          <Layers className="w-5 h-5" /> Components
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
          <Eye className="w-5 h-5" /> Preview
        </a>
        <button 
          onClick={() => setIsExportOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors"
        >
          <Download className="w-5 h-5" /> Export
        </button>
      </nav>
      
      <div className="mt-auto">
        <div className="bg-surface rounded-xl p-4 mb-4">
          <h3 className="font-medium text-sm mb-1 text-zinc-200">Design with AI</h3>
          <p className="text-xs text-zinc-400 mb-3">Describe the vibe or purpose of your product and let AI build the perfect design system.</p>
          <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary py-2 rounded-lg text-sm font-medium transition-colors">
            Generate with AI
          </button>
        </div>
        
        <div className="flex items-center justify-between px-2 text-zinc-400">
          <div className="flex gap-3">
            <Settings className="w-5 h-5 cursor-pointer hover:text-zinc-100" />
            <Moon className="w-5 h-5 cursor-pointer hover:text-zinc-100" />
          </div>
          <div className="w-6 h-6 rounded-full bg-zinc-700"></div>
        </div>
      </div>
    </aside>
  );
}
