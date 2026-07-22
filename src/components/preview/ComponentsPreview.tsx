"use client";

import { useTokenStore } from "@/store/useTokenStore";
import { Check, AlertCircle, Info, Star } from "lucide-react";

export function ComponentsPreview() {
  const { theme } = useTokenStore();
  const t = theme.components;

  const btnPrimary = t.button === 'filled' 
    ? 'bg-showcase-primary text-showcase-primary-foreground border-transparent hover:opacity-90'
    : t.button === 'outlined'
      ? 'bg-transparent text-showcase-primary border-showcase-primary border hover:bg-showcase-primary/10'
      : 'bg-transparent text-showcase-primary border-transparent hover:bg-showcase-primary/10';

  const btnSecondary = 'bg-showcase-secondary text-showcase-secondary-foreground hover:bg-showcase-secondary/80 border border-transparent';
  
  const cardStyle = t.card === 'elevated' 
    ? 'shadow-showcase-lg border-transparent'
    : t.card === 'bordered'
      ? 'border border-showcase-border shadow-none'
      : 'border-transparent shadow-none bg-showcase-surface';

  const inputStyle = t.input === 'filled'
    ? 'bg-showcase-muted border-transparent focus:ring-2 focus:ring-showcase-ring focus:bg-showcase-background'
    : t.input === 'underlined'
      ? 'bg-transparent border-b border-showcase-border rounded-none px-0 focus:border-showcase-primary focus:outline-none'
      : 'bg-showcase-background border border-showcase-border focus:ring-2 focus:ring-showcase-ring focus:border-showcase-primary';

  return (
    <div className="w-full max-w-5xl bg-showcase-background text-showcase-foreground rounded-showcase-lg shadow-showcase-lg p-showcase-xl min-h-[500px] flex gap-12 shrink-0 font-showcase-body transition-all duration-300">
      
      {/* Left Column */}
      <div className="flex-1 space-y-12">
        <section>
          <h4 className="text-[10px] font-bold tracking-widest text-showcase-muted-foreground uppercase mb-6">Typography</h4>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold font-showcase-heading text-showcase-foreground">Heading 1</h1>
            <h2 className="text-3xl font-semibold font-showcase-heading text-showcase-foreground">Heading 2</h2>
            <h3 className="text-2xl font-medium font-showcase-heading text-showcase-foreground">Heading 3</h3>
            <p className="text-base leading-relaxed text-showcase-muted-foreground mt-4">
              This is body text. It demonstrates how standard paragraphs look with the current font family, weight, and color applied through variables.
            </p>
            <p className="text-sm text-showcase-muted-foreground/70">Small text for captions and supplementary information.</p>
          </div>
        </section>

        <section>
          <h4 className="text-[10px] font-bold tracking-widest text-showcase-muted-foreground uppercase mb-6">Buttons</h4>
          <div className="flex flex-wrap items-center gap-4">
            <button className={`${btnPrimary} px-showcase-lg py-showcase-sm rounded-showcase-md font-medium transition-colors`}>
              Primary
            </button>
            <button className={`${btnSecondary} px-showcase-lg py-showcase-sm rounded-showcase-md font-medium transition-colors`}>
              Secondary
            </button>
            <button className="text-showcase-primary hover:bg-showcase-primary/10 px-showcase-lg py-showcase-sm rounded-showcase-md font-medium transition-colors">
              Ghost
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button className={`${btnPrimary} px-showcase-md py-showcase-sm text-sm rounded-showcase-md font-medium transition-colors`}>
              Small
            </button>
            <button className={`${btnPrimary} px-showcase-xl py-showcase-md text-lg rounded-showcase-md font-medium transition-colors`}>
              Large Button
            </button>
          </div>
        </section>
        
        <section>
          <h4 className="text-[10px] font-bold tracking-widest text-showcase-muted-foreground uppercase mb-6">Inputs</h4>
          <div className="space-y-4 max-w-sm">
            <input type="text" placeholder="Enter your email" className={`w-full p-showcase-md rounded-showcase-md text-sm outline-none transition-all ${inputStyle}`} />
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 rounded-showcase-sm text-showcase-primary border-showcase-border focus:ring-showcase-ring" defaultChecked />
              <span className="text-sm">I accept the terms</span>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="flex-1 space-y-12">
        <section>
          <h4 className="text-[10px] font-bold tracking-widest text-showcase-muted-foreground uppercase mb-6">Alerts & Badges</h4>
          <div className="flex gap-2 mb-6">
            <span className="px-2 py-1 rounded-showcase-full text-xs font-medium bg-showcase-success/10 text-showcase-success border border-showcase-success/20">Success</span>
            <span className="px-2 py-1 rounded-showcase-full text-xs font-medium bg-showcase-warning/10 text-showcase-warning border border-showcase-warning/20">Warning</span>
            <span className="px-2 py-1 rounded-showcase-full text-xs font-medium bg-showcase-error/10 text-showcase-error border border-showcase-error/20">Error</span>
          </div>
          <div className="space-y-4">
            <div className="bg-showcase-success/10 text-showcase-success border border-showcase-success/20 p-showcase-md rounded-showcase-md flex gap-3">
              <Info className="w-5 h-5 shrink-0" />
              <div>
                <h5 className="font-semibold text-sm mb-1">System Update</h5>
                <p className="text-sm opacity-90">A new software version is available. Please update your client to continue.</p>
              </div>
            </div>
            <div className="bg-showcase-error/10 text-showcase-error border border-showcase-error/20 p-showcase-md rounded-showcase-md flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h5 className="font-semibold text-sm mb-1">Connection Lost</h5>
                <p className="text-sm opacity-90">We couldn't connect to the server. Check your network and try again.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-[10px] font-bold tracking-widest text-showcase-muted-foreground uppercase mb-6">Cards & Progress</h4>
          <div className={`bg-showcase-surface text-showcase-foreground p-showcase-lg rounded-showcase-lg ${cardStyle} transition-all`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-showcase-full bg-showcase-primary/10 text-showcase-primary flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold font-showcase-heading">Pro Plan</h5>
                <p className="text-sm text-showcase-muted-foreground">$29/month</p>
              </div>
            </div>
            <p className="text-sm text-showcase-muted-foreground mb-6">
              Unlock all premium features including priority support and advanced analytics.
            </p>
            <button className={`w-full ${btnPrimary} py-showcase-sm rounded-showcase-md font-medium transition-colors`}>
              Upgrade Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
