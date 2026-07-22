"use client";

import { Download, History } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";
import { useState } from "react";

export function Navbar() {
  const { theme, setIsExportOpen } = useTokenStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);

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
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-[#0e0e11] shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full text-sm">
          <span className="text-zinc-300">AI Mode</span>
          <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
            <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
          </div>
        </div>
        <nav className="flex gap-6 ml-4 text-sm font-medium text-zinc-400 relative">
          <a href="#" className="hover:text-zinc-100">Explore</a>
          <a href="#" className="hover:text-zinc-100">My Systems</a>
          <button onClick={loadHistory} className="hover:text-zinc-100 flex items-center gap-1">
            <History className="w-4 h-4" /> History
          </button>

          {showHistory && (
            <div className="absolute top-8 left-0 w-64 bg-surface border border-border rounded-lg shadow-xl p-2 z-50">
              <h4 className="text-xs font-bold text-zinc-500 mb-2 px-2 uppercase tracking-wider">Saved Themes</h4>
              {historyItems.length === 0 ? (
                <p className="text-xs text-zinc-500 px-2 py-1">No themes saved yet.</p>
              ) : (
                <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                  {historyItems.map((item) => (
                    <button 
                      key={item.id}
                      className="text-left px-2 py-1.5 hover:bg-zinc-800 rounded text-sm text-zinc-300 truncate"
                    >
                      {item.name}
                      <div className="text-[10px] text-zinc-500">{new Date(item.createdAt).toLocaleDateString()}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface transition-colors"
        >
          <Download className="w-4 h-4" /> Export
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save System'}
        </button>
      </div>
    </header>
  );
}
