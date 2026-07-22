"use client";

import { useState, useEffect } from "react";
import { Sparkles, LayoutDashboard, Palette, Type, Layers, Eye, Download, Settings, Moon, Compass, Clock, FolderHeart, Info } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";
import { AnimatePresence, motion } from "framer-motion";

export function Sidebar() {
  const { setIsExportOpen } = useTokenStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <aside className="w-64 border-r border-border bg-[#0e0e11] flex flex-col py-6 px-4 shrink-0 relative">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">TokenVibe AI</h1>
          <p className="text-[10px] text-zinc-400">Semantic Design System</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
        <nav className="space-y-1 mb-8">
          <div className="px-3 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Main</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <button onClick={() => showToast("Explore is coming in v2.0")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Compass className="w-5 h-5" /> Explore
          </button>
        </nav>

        <nav className="space-y-1 mb-8">
          <div className="px-3 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Library</div>
          <button onClick={() => showToast("My Systems is coming in v2.0")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <FolderHeart className="w-5 h-5" /> My Systems
          </button>
          <button onClick={() => showToast("History is coming in v2.0")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Clock className="w-5 h-5" /> History
          </button>
        </nav>

        <nav className="space-y-1 mb-8">
          <div className="px-3 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">System View</div>
          <button onClick={() => showToast("Click on Tabs in Preview panel")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Palette className="w-5 h-5" /> Tokens
          </button>
          <button onClick={() => showToast("Click on Tabs in Preview panel")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Type className="w-5 h-5" /> Typography
          </button>
          <button onClick={() => showToast("Click on Tabs in Preview panel")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Layers className="w-5 h-5" /> Components
          </button>
          <button onClick={() => setIsExportOpen(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Download className="w-5 h-5" /> Export
          </button>
        </nav>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center justify-between px-2 text-zinc-400">
          <div className="flex gap-3">
            <Settings className="w-5 h-5 cursor-pointer hover:text-zinc-100" />
            <Moon className="w-5 h-5 cursor-pointer hover:text-zinc-100" />
          </div>
          <div className="w-7 h-7 rounded-full bg-zinc-700 border border-border"></div>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-4 right-4 bg-[#18181b] border border-border text-xs font-medium px-4 py-3 rounded-lg shadow-xl text-zinc-200 flex items-center gap-2 z-50"
          >
            <Info className="w-4 h-4 text-primary" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
