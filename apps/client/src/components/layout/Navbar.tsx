"use client";

import { Download, History, Sparkles } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setIsExportOpen } = useTokenStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [aiModeOn, setAiModeOn] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/themes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'mock-user-123',
          name: theme.metadata.name || 'Untitled Theme',
          schemaJson: theme
        })
      });
      // Show custom toast instead of alert ideally, but keeping alert for now
      alert('Theme saved successfully!');
    } catch (e) {
      alert('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  const loadHistory = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/themes/mock-user-123`);
      const data = await res.json();
      setHistoryItems(data);
      setShowHistory(!showHistory);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="h-16 glass-panel rounded-2xl flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setAiModeOn(!aiModeOn)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${aiModeOn ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface border border-white/5 text-zinc-400'}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Mode</span>
          <div className={`w-7 h-4 rounded-full relative transition-colors ${aiModeOn ? 'bg-primary' : 'bg-zinc-700'}`}>
            <motion.div 
              className="w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm"
              animate={{ left: aiModeOn ? '14px' : '2px' }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </button>

        <nav className="flex gap-6 text-sm font-medium text-zinc-400 relative">
          <a href="#" className="hover:text-white transition-colors relative group">
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors relative group">
            My Systems
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <div className="relative">
            <button onClick={loadHistory} className={`flex items-center gap-1.5 transition-colors ${showHistory ? 'text-white' : 'hover:text-white'}`}>
              <History className="w-4 h-4" /> History
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-10 -left-4 w-64 glass-panel border border-white/10 rounded-xl shadow-2xl p-2 z-50 origin-top-left"
                >
                  <h4 className="text-[10px] font-bold text-zinc-500 mb-2 px-2 uppercase tracking-widest">Saved Themes</h4>
                  {historyItems.length === 0 ? (
                    <p className="text-xs text-zinc-500 px-2 py-3 text-center">No themes saved yet.</p>
                  ) : (
                    <div className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                      {historyItems.map((item) => (
                        <button 
                          key={item.id}
                          className="text-left px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-zinc-300 truncate transition-colors flex justify-between items-center group"
                        >
                          <span className="group-hover:text-white transition-colors">{item.name}</span>
                          <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all"
        >
          <Download className="w-4 h-4" /> Export
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="relative px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all disabled:opacity-70 overflow-hidden group"
        >
          <span className="relative z-10">{isSaving ? 'Saving...' : 'Save System'}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity z-0" />
        </button>
      </div>
    </header>
  );
}
