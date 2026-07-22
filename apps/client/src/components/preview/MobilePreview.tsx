"use client";

import { useTokenStore } from "@/store/useTokenStore";
import { Menu, Search, Bell, Home, User, Heart } from "lucide-react";

export function MobilePreview() {
  const { theme } = useTokenStore();
  const t = theme.components;

  const cardStyle = t.card === 'elevated' 
    ? 'shadow-showcase-lg border-transparent'
    : t.card === 'bordered'
      ? 'border border-showcase-border shadow-none'
      : 'border-transparent shadow-none bg-showcase-surface';

  return (
    <div className="w-[360px] h-[720px] bg-showcase-background text-showcase-foreground rounded-[2.5rem] shadow-2xl border-[8px] border-zinc-900 overflow-hidden flex flex-col relative mx-auto font-showcase-body transition-all duration-300">
      {/* Status Bar Mock */}
      <div className="h-6 w-full flex justify-between items-center px-4 text-[10px] font-medium text-showcase-muted-foreground">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2.5 border border-current rounded-sm relative">
            <div className="absolute top-[1px] bottom-[1px] left-[1px] right-[1px] bg-current"></div>
          </div>
        </div>
      </div>

      {/* App Bar */}
      <div className="px-showcase-md py-showcase-sm flex items-center justify-between mb-2">
        <Menu className="w-6 h-6 text-showcase-foreground" />
        <span className="font-semibold font-showcase-heading text-lg text-showcase-foreground">Explore</span>
        <div className="flex gap-3 text-showcase-foreground">
          <Search className="w-5 h-5" />
          <Bell className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-showcase-md pb-24 custom-scrollbar">
        <h2 className="text-2xl font-bold font-showcase-heading mb-showcase-md text-showcase-foreground">For You</h2>
        
        <div className="flex gap-showcase-sm overflow-x-auto pb-4 mb-2 -mx-showcase-md px-showcase-md snap-x">
          {['Design', 'Technology', 'Art', 'Business'].map((chip, i) => (
             <div key={chip} className={`px-showcase-md py-showcase-sm rounded-showcase-full text-sm font-medium snap-start whitespace-nowrap transition-colors ${i === 0 ? 'bg-showcase-primary text-showcase-primary-foreground' : 'bg-showcase-surface text-showcase-foreground border border-showcase-border'}`}>
                {chip}
             </div>
          ))}
        </div>

        <div className="space-y-showcase-md">
          {/* Card 1 */}
          <div className={`bg-showcase-surface ${t.card === 'bordered' ? 'border border-showcase-border' : 'shadow-showcase-md'} rounded-showcase-lg overflow-hidden transition-all`}>
             <div className="h-32 bg-showcase-muted relative">
               <div className="absolute top-2 right-2 bg-showcase-background/80 backdrop-blur rounded-showcase-full p-1.5">
                  <Heart className="w-4 h-4 text-showcase-foreground" />
               </div>
             </div>
             <div className="p-showcase-md">
                <span className="text-[10px] font-bold tracking-wider text-showcase-primary uppercase mb-1 block">Article</span>
                <h3 className="font-semibold font-showcase-heading text-lg leading-tight mb-2 text-showcase-foreground">The Future of UI Design in the AI Era</h3>
                <p className="text-sm text-showcase-muted-foreground line-clamp-2 mb-4">Discover how artificial intelligence is shaping the tools we use to build the web and native platforms seamlessly.</p>
                <button className="text-sm text-showcase-primary font-medium hover:underline">Read more</button>
             </div>
          </div>
          
          {/* Card 2 */}
          <div className={`bg-showcase-surface ${t.card === 'bordered' ? 'border border-showcase-border' : 'shadow-showcase-md'} rounded-showcase-lg p-showcase-md flex gap-4 transition-all`}>
             <div className="w-20 h-20 rounded-showcase-md bg-showcase-muted shrink-0"></div>
             <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-semibold font-showcase-heading leading-tight mb-1 text-showcase-foreground">State Management Tips</h3>
                <p className="text-xs text-showcase-muted-foreground mb-2">5 mins read</p>
                <div className="flex gap-2">
                   <span className="text-[10px] bg-showcase-background text-showcase-foreground border border-showcase-border px-2 py-0.5 rounded-showcase-sm">React</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className={`absolute bottom-20 right-4 w-14 h-14 bg-showcase-primary text-showcase-primary-foreground ${t.card === 'flat' ? 'rounded-showcase-md shadow-none border border-showcase-primary' : 'rounded-showcase-full shadow-showcase-lg'} flex items-center justify-center transition-all`}>
         <Search className="w-6 h-6" />
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full h-16 bg-showcase-surface border-t border-showcase-border flex justify-around items-center px-4">
         <div className="flex flex-col items-center gap-1 text-showcase-primary">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
         </div>
         <div className="flex flex-col items-center gap-1 text-showcase-muted-foreground hover:text-showcase-foreground transition-colors">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">Search</span>
         </div>
         <div className="flex flex-col items-center gap-1 text-showcase-muted-foreground hover:text-showcase-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="text-[10px] font-medium">Alerts</span>
         </div>
         <div className="flex flex-col items-center gap-1 text-showcase-muted-foreground hover:text-showcase-foreground transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
         </div>
      </div>
    </div>
  );
}
