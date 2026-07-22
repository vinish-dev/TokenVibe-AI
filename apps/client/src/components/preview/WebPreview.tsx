"use client";

import { useTokenStore } from "@/store/useTokenStore";
import { Sparkles, BarChart, Users, ArrowUpRight } from "lucide-react";

export function WebPreview() {
  const { theme } = useTokenStore();
  const t = theme.components;

  const btnPrimary = t.button === 'filled' 
    ? 'bg-showcase-primary text-showcase-primary-foreground border-transparent hover:opacity-90'
    : t.button === 'outlined'
      ? 'bg-transparent text-showcase-primary border-showcase-primary border hover:bg-showcase-primary/10'
      : 'bg-transparent text-showcase-primary border-transparent hover:bg-showcase-primary/10';

  const cardStyle = t.card === 'elevated' 
    ? 'shadow-showcase-lg border-transparent'
    : t.card === 'bordered'
      ? 'border border-showcase-border shadow-none'
      : 'border-transparent shadow-none bg-showcase-surface';

  return (
    <div className="w-full max-w-5xl bg-showcase-background text-showcase-foreground rounded-showcase-lg shadow-showcase-lg p-6 sm:p-showcase-xl min-h-[500px] font-showcase-body transition-all duration-300">
      {/* Mock Live Preview Dashboard */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-showcase-primary font-bold font-showcase-heading text-xl">
          <Sparkles className="w-6 h-6" /> FocusAI
        </div>
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-showcase-muted-foreground">
          <a href="#" className="hover:text-showcase-foreground transition-colors">Product</a>
          <a href="#" className="hover:text-showcase-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-showcase-foreground transition-colors">Pricing</a>
          <a href="#" className="hover:text-showcase-foreground transition-colors">Resources</a>
        </nav>
        <div className="flex gap-4 items-center">
          <a href="#" className="hidden sm:block text-sm font-medium text-showcase-foreground">Sign in</a>
          <button className={`${btnPrimary} px-showcase-lg py-showcase-sm rounded-showcase-md text-sm font-medium transition-colors`}>Get Started</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span 
            className="text-xs font-semibold tracking-wider text-showcase-primary px-showcase-md py-showcase-sm rounded-showcase-full mb-6 inline-block bg-showcase-primary/10" 
          >
            AI-Powered Productivity
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 font-showcase-heading text-showcase-foreground">Focus on what matters. <span className="text-showcase-primary">Achieve extraordinary things.</span></h1>
          <p className="text-showcase-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">FocusAI helps professionals plan smarter, work faster, and achieve their goals with the power of artificial intelligence.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`${btnPrimary} px-showcase-xl py-showcase-md rounded-showcase-lg font-medium shadow-showcase-md transition-colors justify-center flex items-center`}>Get Started Free</button>
            <button className="px-showcase-xl py-showcase-md bg-showcase-surface text-showcase-foreground border border-showcase-border rounded-showcase-lg font-medium flex items-center justify-center gap-2 hover:bg-showcase-surface/80 transition-colors">Watch Demo</button>
          </div>
        </div>
        <div className={`bg-showcase-surface text-showcase-foreground rounded-showcase-lg p-showcase-lg ${cardStyle} flex flex-col gap-showcase-md transition-all`}>
          <h3 className="font-semibold font-showcase-heading text-lg mb-2">Good morning, Alex! 👋</h3>
          {/* Mock Dashboard widgets */}
          <div className="grid grid-cols-2 gap-showcase-md">
            <div className={`bg-showcase-background p-showcase-md rounded-showcase-lg ${t.card === 'bordered' ? 'border border-showcase-border' : 'shadow-showcase-sm'} transition-all`}>
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-showcase-muted-foreground font-medium">Tasks Completed</span>
                 <BarChart className="w-4 h-4 text-showcase-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-showcase-heading text-showcase-foreground">128</div>
              <div className="text-xs text-showcase-success font-medium mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +14%</div>
            </div>
            <div className={`bg-showcase-background p-showcase-md rounded-showcase-lg ${t.card === 'bordered' ? 'border border-showcase-border' : 'shadow-showcase-sm'} transition-all`}>
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-showcase-muted-foreground font-medium">Focus Time</span>
                 <Users className="w-4 h-4 text-showcase-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-showcase-heading text-showcase-foreground">24.5h</div>
              <div className="text-xs text-showcase-success font-medium mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +2.4h</div>
            </div>
          </div>
          <div className={`bg-showcase-background p-showcase-md rounded-showcase-lg ${t.card === 'bordered' ? 'border border-showcase-border' : 'shadow-showcase-sm'} flex-1 transition-all`}>
             <div className="text-xs text-showcase-muted-foreground font-medium mb-4">Weekly Activity</div>
             {/* Fake chart bars using the first chart palette color or primary */}
             <div className="flex items-end gap-2 h-24 mt-auto">
               {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
                 <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ backgroundColor: h === 90 ? theme.charts.palette[0] || theme.colors.primary : theme.colors.muted, height: `${h}%` }}></div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
