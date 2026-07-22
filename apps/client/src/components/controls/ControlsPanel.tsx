"use client";

import { useState } from "react";
import { Sparkles, Loader2, RotateCcw, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTokenStore } from "@/store/useTokenStore";

const PERSONALITIES = ['Modern', 'Elegant', 'Playful', 'Luxury', 'Minimal', 'Cyberpunk', 'Friendly', 'Bold'];

const SLIDERS = [
  { id: 'warmth', label: 'Warmth', left: 'Cool', right: 'Warm' },
  { id: 'energy', label: 'Energy', left: 'Calm', right: 'Energetic' },
  { id: 'luxury', label: 'Luxury', left: 'Subtle', right: 'Luxurious' },
  { id: 'minimalism', label: 'Minimalism', left: 'Detailed', right: 'Minimal' },
  { id: 'roundedness', label: 'Roundedness', left: 'Sharp', right: 'Soft' },
  { id: 'animation', label: 'Animation', left: 'Fast', right: 'Smooth' },
];

export function ControlsPanel() {
  const { setTheme, setIsExportOpen } = useTokenStore();
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(['Modern']);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    warmth: 65, energy: 40, luxury: 70, minimalism: 60, roundedness: 80, animation: 50,
  });
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);

  const togglePersonality = (pill: string) => {
    setSelectedPersonalities(prev => prev.includes(pill) ? prev.filter(p => p !== pill) : [...prev, pill]);
  };

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const personality = selectedPersonalities.length > 0 ? selectedPersonalities[0] : 'Modern';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, personality, sliderValues })
      });
      if (!response.ok) throw new Error("Failed to generate theme");
      const newTheme = await response.json();
      setTheme(newTheme);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <aside className="w-80 h-full bg-[#0a0a0c]/80 backdrop-blur-xl border-l border-white/5 flex flex-col shrink-0 z-20">
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-black/20">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Inspector</h2>
        <div className="flex gap-2">
          <button onClick={() => setIsExportOpen(true)} className="text-zinc-400 hover:text-white transition-colors p-1" title="Export Code">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col relative">
        {/* AI Mode Toggle */}
        <div className="flex items-center justify-between mb-8 bg-black/40 border border-white/5 p-1 rounded-lg backdrop-blur-md">
          <button 
            onClick={() => setIsAiMode(true)}
            className={`flex-1 py-1.5 text-sm font-bold rounded flex items-center justify-center gap-1.5 transition-all ${isAiMode ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow shadow-primary/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Magic AI
          </button>
          <button 
            onClick={() => setIsAiMode(false)}
            className={`flex-1 py-1.5 text-sm font-bold rounded flex items-center justify-center gap-1.5 transition-all ${!isAiMode ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Manual
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">Brand Personality</h2>
          <button 
            className="text-zinc-500 hover:text-primary transition-colors p-1"
            onClick={() => {
              setSelectedPersonalities(['Modern']);
              setSliderValues({ warmth: 65, energy: 40, luxury: 70, minimalism: 60, roundedness: 80, animation: 50 });
              setPrompt("");
            }}
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-8">
          {PERSONALITIES.map((pill) => {
            const isSelected = selectedPersonalities.includes(pill);
            return (
              <button 
                key={pill} 
                onClick={() => togglePersonality(pill)}
                className={`px-3 py-1.5 rounded border text-sm font-medium transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary/50 bg-primary/20 text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]' 
                    : 'border-white/5 bg-black/20 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>

        <div className="space-y-5 mb-8">
          {SLIDERS.map((slider) => (
            <div key={slider.id} className="group/slider">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-zinc-400 group-hover/slider:text-zinc-200 transition-colors">{slider.label}</span>
                <span className="text-primary font-mono">{sliderValues[slider.id]}%</span>
              </div>
              <div className="w-full h-1 bg-black/60 rounded-full mb-1.5 relative cursor-pointer group border border-white/5">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderValues[slider.id]}
                  onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute left-0 top-0 h-full bg-primary rounded-full pointer-events-none group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)] transition-shadow" 
                  style={{ width: `${sliderValues[slider.id]}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none scale-0 group-hover:scale-100 transition-transform" 
                  style={{ left: `calc(${sliderValues[slider.id]}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-600 uppercase tracking-wider">
                <span>{slider.left}</span>
                <span>{slider.right}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase mb-3">Product Description</h2>
        <div className="relative mb-6 flex-1 flex flex-col min-h-[140px]">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={300}
            className="flex-1 w-full bg-black/20 border border-white/5 rounded-lg p-3 pb-8 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-black/40 transition-all resize-none shadow-inner" 
            placeholder="An AI productivity platform for professionals..."
          />
          <span className={`absolute bottom-2 right-3 text-xs font-mono ${prompt.length > 280 ? 'text-orange-400' : 'text-zinc-600'}`}>
            {prompt.length} / 300
          </span>
        </div>
        
        <div className="mt-auto relative">
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-xl -z-10 transform scale-90 translate-y-1 opacity-50"></div>
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full relative overflow-hidden bg-primary hover:bg-primary-hover text-white py-3 rounded-lg text-sm font-semibold tracking-wide flex justify-center items-center gap-2 shadow-[0_4px_15px_rgba(139,92,246,0.3)] disabled:opacity-80 transition-all group border border-white/10"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Generate <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              </div>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/30 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg m-2 pointer-events-none"
            >
              <div className="absolute inset-0 rounded-lg border-2 border-primary/30 animate-pulse pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
