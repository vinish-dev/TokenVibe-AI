"use client";

import { Download, History, Menu } from "lucide-react";
import { useTokenStore } from "@/store/useTokenStore";
import { useState } from "react";

export function Navbar() {
  const { theme, setIsExportOpen, setIsSidebarOpen } = useTokenStore();
  const [isSaving, setIsSaving] = useState(false);

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


  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-surface shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
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
