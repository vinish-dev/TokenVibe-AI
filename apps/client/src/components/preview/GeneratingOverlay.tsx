import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

const STEPS = [
  "Analyzing product intent...",
  "Generating semantic color palette...",
  "Selecting typography scales...",
  "Calculating spacing and layout...",
  "Finalizing design system..."
];

export function GeneratingOverlay() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Progress through steps every 1200ms to match the ControlsPanel delay
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full overflow-hidden bg-surface border border-border shadow-lg flex items-center gap-3 px-6 py-3 pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-primary absolute animate-pulse opacity-50" />
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
      
      <span className="text-sm font-medium text-foreground">
        {STEPS[currentStepIndex]}
      </span>
      
      {/* Subtle Shimmer Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12"
        animate={{ translateX: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
    </motion.div>
  );
}
