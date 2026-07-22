"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTokenStore } from "@/store/useTokenStore";

import { getMockThemeByPersonality } from "@/utils/ai/aiMockService";

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
  const { setTheme } = useTokenStore();
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(['Modern']);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    warmth: 65,
    energy: 40,
    luxury: 70,
    minimalism: 60,
    roundedness: 80,
    animation: 50,
  });
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);

  const togglePersonality = (pill: string) => {
    setSelectedPersonalities(prev => 
      prev.includes(pill) 
        ? prev.filter(p => p !== pill)
        : [...prev, pill]
    );
  };

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      const personality = selectedPersonalities.length > 0 ? selectedPersonalities[0] : 'Modern';
      setTheme(getMockThemeByPersonality(personality));
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <section className="w-80 border-r border-border bg-[#09090b] p-6 overflow-y-auto custom-scrollbar shrink-0 flex flex-col relative">
      {/* AI Mode Toggle */}
      <div className="flex items-center justify-between mb-8 bg-surface border border-border p-1 rounded-xl">
        <button 
          onClick={() => setIsAiMode(true)}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all ${isAiMode ? 'bg-primary text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Magic AI
        </button>
        <button 
          onClick={() => setIsAiMode(false)}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all ${!isAiMode ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Manual
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium">1. Brand Personality</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          onClick={() => {
            setSelectedPersonalities(['Modern']);
            setSliderValues({ warmth: 65, energy: 40, luxury: 70, minimalism: 60, roundedness: 80, animation: 50 });
            setPrompt("");
          }}
        >
          Reset
        </motion.button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {PERSONALITIES.map((pill) => {
          const isSelected = selectedPersonalities.includes(pill);
          return (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={pill} 
              onClick={() => togglePersonality(pill)}
              className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                isSelected 
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(139,92,246,0.1)]' 
                  : 'border-border bg-surface text-zinc-300 hover:border-primary/50'
              }`}
            >
              {pill}
            </motion.button>
          );
        })}
      </div>

      <div className="space-y-6 mb-8">
        {SLIDERS.map((slider) => (
          <div key={slider.id}>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium">{slider.label}</span>
              <span className="text-zinc-500">{sliderValues[slider.id]}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full mb-1 relative cursor-pointer group">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderValues[slider.id]}
                onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <motion.div 
                className="absolute left-0 top-0 h-full bg-primary rounded-full pointer-events-none group-hover:bg-primary-hover transition-colors" 
                initial={false}
                animate={{ width: `${sliderValues[slider.id]}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none" 
                initial={false}
                animate={{ left: `calc(${sliderValues[slider.id]}% - 6px)` }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>{slider.left}</span>
              <span>{slider.right}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium mb-3">2. Describe Your Product</h2>
      <div className="relative mb-6">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={300}
          className="w-full bg-surface border border-border rounded-xl p-3 pb-8 min-h-32 text-sm text-zinc-300 focus:outline-none focus:border-primary transition-all resize-none shadow-inner" 
          placeholder="An AI productivity platform for professionals that helps them plan, focus, and achieve more with intelligent assistance."
        />
        <span className="absolute bottom-3 right-3 text-[10px] text-zinc-500">{prompt.length} / 300</span>
      </div>
      
      <div className="mt-auto">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-blue-500 text-white py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-80 transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Generating...
              </motion.div>
            ) : (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2"
              >
                Generate Design System <Sparkles className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Shimmer effect */}
          {isGenerating && (
            <motion.div 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{ translateX: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          )}
        </motion.button>
      </div>

      {/* Loading Overlay state for the entire panel using AnimatePresence if needed, but blocking button is enough */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-lg m-2 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
