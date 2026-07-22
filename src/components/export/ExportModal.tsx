"use client";

import { useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { X, Check, Copy, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  generateCSS, 
  generateTailwind, 
  generateCompose, 
  generateFlutter, 
  generateFigmaTokens 
} from "@/utils/export/exportGenerators";

const TABS = [
  { id: 'css', label: 'CSS Variables' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'compose', label: 'Jetpack Compose' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'figma', label: 'Figma JSON' },
];

export function ExportModal() {
  const { tokens, isExportOpen, setIsExportOpen } = useTokenStore();
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeTab) {
      case 'css': return generateCSS(tokens);
      case 'tailwind': return generateTailwind(tokens);
      case 'compose': return generateCompose(tokens);
      case 'flutter': return generateFlutter(tokens);
      case 'figma': return generateFigmaTokens(tokens);
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isExportOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#0e0e11] border border-border w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Export Design System</h2>
                  <p className="text-sm text-zinc-400">Generate production-ready code for your platform.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExportOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col overflow-hidden bg-background">
              {/* Tabs */}
              <div className="flex gap-1 p-2 border-b border-border bg-[#0a0a0c] overflow-x-auto custom-scrollbar">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-surface text-white shadow-sm border border-border/50' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-surface/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code View */}
              <div className="flex-1 relative overflow-hidden bg-[#0a0a0c]">
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border hover:bg-zinc-800 text-xs font-medium rounded-lg text-zinc-300 transition-colors shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-6 h-full overflow-auto custom-scrollbar text-[13px] leading-relaxed font-mono text-zinc-300">
                  <code>{getCode()}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
