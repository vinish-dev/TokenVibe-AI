"use client";

import { useState, useEffect } from "react";
import { Sparkles, LayoutDashboard, Palette, Type, Layers, Eye, Download, Settings, Moon, Compass, Clock, FolderHeart, Info } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";
import { AnimatePresence, motion } from "framer-motion";

export function Sidebar() {
  const { setIsExportOpen, setActiveTab, setBottomTab, loadHistory, showHistory, setShowHistory, historyItems, setTheme } = useTokenStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <aside className="w-54 border-r border-border bg-[#0e0e11] flex flex-col py-6 px-4 shrink-0 relative">
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
          <button onClick={loadHistory} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <FolderHeart className="w-5 h-5" /> My Systems
          </button>
          <button onClick={loadHistory} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Clock className="w-5 h-5" /> History
          </button>

          <AnimatePresence>
            {showHistory && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full bg-[#18181b] border border-border rounded-lg p-2 mt-2 overflow-hidden">
                <h4 className="text-xs font-bold text-zinc-500 mb-2 px-2 uppercase tracking-wider">Saved Themes</h4>
                {historyItems.length === 0 ? (
                  <p className="text-xs text-zinc-500 px-2 py-1">No themes saved yet.</p>
                ) : (
                  <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                    {historyItems.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => {
                          if (item.schemaJson) {
                            try {
                              const parsedSchema = typeof item.schemaJson === 'string' 
                                ? JSON.parse(item.schemaJson) 
                                : item.schemaJson;
                              
                              if (parsedSchema && parsedSchema.colors) {
                                setTheme(parsedSchema);
                              } else {
                                console.warn("Invalid schema shape: missing colors", parsedSchema);
                              }
                            } catch (e) {
                              console.error("Failed to parse schema JSON", e);
                            }
                          } else {
                            console.log("No schema available for this mock item");
                          }
                          setShowHistory(false);
                        }}
                        className="text-left px-2 py-1.5 hover:bg-zinc-800 rounded text-sm text-zinc-300 truncate"
                      >
                        {item.name}
                        <div className="text-[10px] text-zinc-500">{new Date(item.createdAt).toLocaleDateString()}</div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <nav className="space-y-1 mb-8">
          <div className="px-3 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">System View</div>
          <button onClick={() => { setBottomTab('colors'); document.getElementById('tokens-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Palette className="w-5 h-5" /> Tokens
          </button>
          <button onClick={() => { setBottomTab('typography'); document.getElementById('tokens-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
            <Type className="w-5 h-5" /> Typography
          </button>
          <button onClick={() => { setActiveTab('components'); document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface transition-colors">
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
