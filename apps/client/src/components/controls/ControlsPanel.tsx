"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTokenStore } from "@/store/useTokenStore";
import { presetThemes } from "@/utils/presetThemes";

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
  const { setTheme, isGenerating, setIsGenerating } = useTokenStore();
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
  const [brandColor, setBrandColor] = useState("");
  const [isSurpriseMeMode, setIsSurpriseMeMode] = useState(false);

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

  const handleGenerate = async () => {
    setIsGenerating(true);
    let generatedTheme;

    try {
      const personality = selectedPersonalities.length > 0 ? selectedPersonalities[0] : 'Modern';
      
      // SURPRISE ME FEATURE: If toggle is on, skip API and pick a preset instantly
      if (isSurpriseMeMode || prompt.trim() === "") {
        if (selectedPersonalities.length === 0) {
          // If no personality is selected, pick a completely random theme
          generatedTheme = presetThemes[Math.floor(Math.random() * presetThemes.length)];
        } else {
          // Otherwise try to match the selected personality
          const personality = selectedPersonalities[0];
          const fallbackMatches = presetThemes.filter(t => t.intent.mood === personality || t.intent.style === personality);
          generatedTheme = fallbackMatches.length > 0 
            ? fallbackMatches[Math.floor(Math.random() * fallbackMatches.length)]
            : presetThemes[Math.floor(Math.random() * presetThemes.length)];
        }
      } else {
        // We now call the Next.js API proxy route, which securely forwards to the ECS backend
        // This solves the Mixed Content error since the browser only sees a same-origin request.
        const response = await fetch(`/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, personality, sliderValues, brandColor })
        });
        
        if (!response.ok) throw new Error("Failed to generate theme");
        generatedTheme = await response.json();
      }
    } catch (error) {
      console.error("AI Generation failed, falling back to presets:", error);
      if (selectedPersonalities.length === 0) {
        generatedTheme = presetThemes[Math.floor(Math.random() * presetThemes.length)];
      } else {
        const personality = selectedPersonalities[0];
        const fallbackMatches = presetThemes.filter(t => t.intent.mood === personality || t.intent.style === personality);
        generatedTheme = fallbackMatches.length > 0 
          ? fallbackMatches[Math.floor(Math.random() * fallbackMatches.length)]
          : presetThemes[Math.floor(Math.random() * presetThemes.length)];
      }
    }

    try {
      // Step 1: Wait for Analyzing... (1200ms)
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const currentTheme = useTokenStore.getState().theme;
      
      // Step 2: Apply Colors (2400ms total)
      await new Promise(resolve => setTimeout(resolve, 1200));
      setTheme({ ...currentTheme, colors: generatedTheme.colors, intent: generatedTheme.intent });
      
      // Step 3: Apply Typography (3600ms total)
      await new Promise(resolve => setTimeout(resolve, 1200));
      setTheme({ ...currentTheme, colors: generatedTheme.colors, typography: generatedTheme.typography, intent: generatedTheme.intent });
      
      // Step 4: Apply Spacing & Radius (4800ms total)
      await new Promise(resolve => setTimeout(resolve, 1200));
      setTheme({ ...currentTheme, colors: generatedTheme.colors, typography: generatedTheme.typography, spacing: generatedTheme.spacing, radius: generatedTheme.radius, intent: generatedTheme.intent });
      
      // Step 5: Full theme applied (6000ms total)
      await new Promise(resolve => setTimeout(resolve, 1200));
      setTheme(generatedTheme);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-surface p-6 lg:overflow-y-auto custom-scrollbar shrink-0 flex flex-col relative z-10">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium">1. Brand Personality</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          title="Reset all selections to default values"
          onClick={() => {
            setSelectedPersonalities(['Modern']);
            setSliderValues({ warmth: 65, energy: 40, luxury: 70, minimalism: 60, roundedness: 80, animation: 50 });
            setPrompt("");
            setBrandColor("");
            setIsSurpriseMeMode(false);
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
                  : 'border-border bg-surface text-foreground hover:border-primary/50'
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
              <span className="text-muted-foreground">{sliderValues[slider.id]}%</span>
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
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>{slider.left}</span>
              <span>{slider.right}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-3 gap-2">
        <h2 className="text-sm font-medium whitespace-nowrap truncate">2. Describe Product</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Surprise Me</span>
          <button 
            type="button"
            title="Turn on to instantly generate a random theme based on your personality, skipping the AI prompt"
            onClick={() => setIsSurpriseMeMode(!isSurpriseMeMode)}
            className={`w-8 h-4 rounded-full relative transition-colors ${isSurpriseMeMode ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
          >
            <motion.div 
              className="w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm"
              animate={{ left: isSurpriseMeMode ? '18px' : '2px' }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Brand Color</label>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1 w-full opacity-100 transition-opacity" style={{ opacity: isSurpriseMeMode ? 0.5 : 1 }}>
          <input 
            type="color" 
            value={brandColor || "#000000"} 
            onChange={(e) => setBrandColor(e.target.value)}
            disabled={isSurpriseMeMode}
            className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
          />
          <input 
            type="text" 
            placeholder="#HEX (Optional)" 
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            disabled={isSurpriseMeMode}
            className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder:text-muted-foreground/50"
          />
          {brandColor && (
            <button 
              onClick={() => setBrandColor("")} 
              disabled={isSurpriseMeMode}
              className="text-muted-foreground hover:text-foreground text-[10px] px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="relative mb-6">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isSurpriseMeMode}
          maxLength={300}
          title={isSurpriseMeMode ? "Surprise mode active. Turn off to type a custom prompt." : "Describe your product here to let AI generate a custom design system"}
          className={`w-full bg-surface border border-border rounded-xl p-3 pb-8 min-h-32 text-sm text-foreground focus:outline-none focus:border-primary transition-all resize-none shadow-inner ${isSurpriseMeMode ? 'opacity-50 cursor-not-allowed grayscale' : ''}`} 
          placeholder={isSurpriseMeMode ? "Surprise mode active..." : "An AI productivity platform for professionals that helps them plan, focus, and achieve more with intelligent assistance."}
        />
        <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">{prompt.length} / 300</span>
      </div>
      
      <div className="mt-auto">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          title={isSurpriseMeMode ? "Instantly pick a random matching preset theme" : "Generate a custom design system using AI"}
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
                {isSurpriseMeMode ? (
                  <>Surprise Me 🎲</>
                ) : (
                  <>Generate Design System <Sparkles className="w-4 h-4" /></>
                )}
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
