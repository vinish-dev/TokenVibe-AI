import { Sparkles, BarChart, Users, ArrowUpRight } from "lucide-react";

export function WebPreview() {
  return (
    <div className="w-full max-w-5xl bg-showcase-background text-showcase-foreground rounded-showcase-xl shadow-2xl p-showcase-xl min-h-[500px]">
      {/* Mock Live Preview Dashboard */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-showcase-primary font-bold text-xl">
          <Sparkles className="w-6 h-6" /> FocusAI
        </div>
        <nav className="flex gap-6 text-sm font-medium opacity-80">
          <a href="#">Product</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </nav>
        <div className="flex gap-4 items-center">
          <a href="#" className="text-sm font-medium opacity-80">Sign in</a>
          <button className="px-showcase-lg py-showcase-sm bg-showcase-primary text-white rounded-showcase-md text-sm font-medium">Get Started</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span 
            className="text-xs font-semibold tracking-wider text-showcase-primary px-showcase-md py-showcase-sm rounded-showcase-full mb-6 inline-block" 
            style={{ backgroundColor: 'color-mix(in srgb, var(--showcase-primary) 10%, transparent)' }}
          >
            AI-Powered Productivity
          </span>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Focus on what matters. <span className="text-showcase-primary">Achieve extraordinary things.</span></h1>
          <p className="opacity-80 text-lg mb-8 leading-relaxed">FocusAI helps professionals plan smarter, work faster, and achieve their goals with the power of artificial intelligence.</p>
          <div className="flex gap-4">
            <button className="px-showcase-xl py-showcase-md bg-showcase-primary text-white rounded-showcase-lg font-medium shadow-lg" style={{ boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--showcase-primary) 20%, transparent)' }}>Get Started Free</button>
            <button className="px-showcase-xl py-showcase-md bg-showcase-surface text-showcase-foreground border border-showcase-border rounded-showcase-lg font-medium flex items-center gap-2">Watch Demo</button>
          </div>
        </div>
        <div className="bg-showcase-surface border border-showcase-border rounded-showcase-xl p-showcase-lg shadow-sm flex flex-col gap-showcase-md">
          <h3 className="font-semibold text-lg mb-2">Good morning, Alex! 👋</h3>
          {/* Mock Dashboard widgets */}
          <div className="grid grid-cols-2 gap-showcase-md">
            <div className="bg-showcase-background p-showcase-md rounded-showcase-lg border border-showcase-border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs opacity-60 font-medium">Tasks Completed</span>
                 <BarChart className="w-4 h-4 opacity-40" />
              </div>
              <div className="text-2xl font-bold">128</div>
              <div className="text-xs text-showcase-success font-medium mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +14%</div>
            </div>
            <div className="bg-showcase-background p-showcase-md rounded-showcase-lg border border-showcase-border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs opacity-60 font-medium">Focus Time</span>
                 <Users className="w-4 h-4 opacity-40" />
              </div>
              <div className="text-2xl font-bold">24.5h</div>
              <div className="text-xs text-showcase-success font-medium mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +2.4h</div>
            </div>
          </div>
          <div className="bg-showcase-background p-showcase-md rounded-showcase-lg border border-showcase-border flex-1">
             <div className="text-xs opacity-60 font-medium mb-4">Weekly Activity</div>
             {/* Fake chart bars */}
             <div className="flex items-end gap-2 h-24 mt-auto">
               {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
                 <div key={i} className="flex-1 bg-showcase-primary rounded-t-sm" style={{ height: `${h}%`, opacity: h === 90 ? 1 : 0.4 }}></div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
