import { Download } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-[#0e0e11] shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full text-sm">
          <span className="text-zinc-300">AI Mode</span>
          <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
            <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
          </div>
        </div>
        <nav className="flex gap-6 ml-4 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-zinc-100">Explore</a>
          <a href="#" className="hover:text-zinc-100">My Systems</a>
          <a href="#" className="hover:text-zinc-100">History</a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors">
          Save System
        </button>
      </div>
    </header>
  );
}
