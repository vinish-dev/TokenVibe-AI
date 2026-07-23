"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { presetThemes } from '@/utils/presetThemes';
import { ThemeCard } from './ThemeCard';
import { Compass, Filter } from 'lucide-react';

export function ExploreGallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Tech', 'Creative', 'Finance', 'Playful'];

  const filteredThemes = activeFilter === 'All' 
    ? presetThemes 
    : presetThemes.filter(t => t.intent.industry === activeFilter || t.intent.mood === activeFilter);

  return (
    <section className="flex-1 flex flex-col bg-background relative h-full overflow-hidden">
      <header className="h-24 lg:h-32 border-b border-border flex flex-col justify-end px-6 pb-6 shrink-0 bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explore</h1>
            <p className="text-sm text-muted-foreground">Discover AI-generated design systems</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0 ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-surface border border-border text-foreground hover:bg-surface/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredThemes.map(theme => (
                <motion.div
                  key={theme.metadata.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThemeCard theme={theme} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredThemes.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No themes found for this filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
