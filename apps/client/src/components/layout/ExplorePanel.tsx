import { Compass } from "lucide-react";

export function ExplorePanel() {
  return (
    <aside className="w-60 h-full bg-[#0a0a0c]/80 backdrop-blur-xl border-r border-white/5 flex flex-col shrink-0 z-20">
      <div className="h-12 border-b border-white/5 flex items-center px-4 shrink-0 bg-black/20">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Explore</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col items-center justify-center text-center opacity-50">
        <Compass className="w-8 h-8 text-zinc-500 mb-3" />
        <p className="text-sm text-zinc-400">Discover community designs and themes.</p>
        <p className="text-xs text-zinc-500 mt-2">Coming soon</p>
      </div>
    </aside>
  );
}
