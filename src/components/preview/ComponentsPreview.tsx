import { Check, AlertCircle, Info, Star } from "lucide-react";

export function ComponentsPreview() {
  return (
    <div className="w-full max-w-5xl bg-showcase-background text-showcase-foreground rounded-showcase-xl shadow-2xl p-showcase-xl min-h-[500px] flex gap-12">
      {/* Left Column: Typography & Basics */}
      <div className="flex-1 space-y-10">
        <div>
          <h2 className="text-xs font-bold tracking-wider opacity-50 uppercase mb-4">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-medium">Heading 3</h3>
            <p className="text-base opacity-80">This is body text. It demonstrates how standard paragraphs look with the current font family, weight, and color applied through variables.</p>
            <p className="text-sm opacity-60">Small text for captions and supplementary information.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-wider opacity-50 uppercase mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-showcase-lg py-showcase-sm bg-showcase-primary text-white rounded-showcase-md font-medium">Primary</button>
            <button className="px-showcase-lg py-showcase-sm bg-showcase-surface text-showcase-foreground border border-showcase-border rounded-showcase-md font-medium">Secondary</button>
            <button className="px-showcase-lg py-showcase-sm text-showcase-primary font-medium hover:bg-showcase-primary/10 rounded-showcase-md transition-colors">Ghost</button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 items-center">
             <button className="px-4 py-1.5 bg-showcase-primary text-white rounded-showcase-md text-sm font-medium">Small</button>
             <button className="px-8 py-4 bg-showcase-primary text-white rounded-showcase-md text-lg font-medium">Large Button</button>
             <button className="w-10 h-10 bg-showcase-primary text-white rounded-showcase-full flex items-center justify-center"><Star className="w-4 h-4"/></button>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-wider opacity-50 uppercase mb-4">Inputs & Controls</h2>
          <div className="space-y-4 max-w-md">
            <div>
               <label className="block text-sm font-medium mb-1 opacity-80">Email Address</label>
               <input type="email" placeholder="you@example.com" className="w-full bg-showcase-surface border border-showcase-border rounded-showcase-md px-showcase-md py-showcase-sm focus:outline-none focus:border-showcase-primary transition-colors text-showcase-foreground" />
            </div>
            
            <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded border border-showcase-primary bg-showcase-primary flex items-center justify-center">
                 <Check className="w-3 h-3 text-white" />
               </div>
               <span className="text-sm">I accept the terms</span>
            </div>

            <div className="flex items-center gap-3">
               <div className="w-10 h-5 rounded-showcase-full bg-showcase-primary relative">
                 <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
               </div>
               <span className="text-sm">Enable notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Feedback & Surfaces */}
      <div className="flex-1 space-y-10">
        <div>
          <h2 className="text-xs font-bold tracking-wider opacity-50 uppercase mb-4">Alerts & Badges</h2>
          <div className="space-y-3">
            <div className="flex gap-2">
               <span className="px-2.5 py-0.5 rounded-showcase-full text-xs font-medium bg-showcase-success/10 text-showcase-success">Success</span>
               <span className="px-2.5 py-0.5 rounded-showcase-full text-xs font-medium bg-showcase-warning/10 text-showcase-warning">Warning</span>
               <span className="px-2.5 py-0.5 rounded-showcase-full text-xs font-medium bg-showcase-error/10 text-showcase-error">Error</span>
               <span className="px-2.5 py-0.5 rounded-showcase-full text-xs font-medium bg-showcase-info/10 text-showcase-info">Info</span>
            </div>
            
            <div className="p-showcase-md rounded-showcase-md border border-showcase-info/20 bg-showcase-info/5 flex gap-3 text-showcase-info mt-4">
               <Info className="w-5 h-5 shrink-0" />
               <div>
                  <h4 className="font-semibold text-sm">System Update</h4>
                  <p className="text-sm opacity-80 mt-1">A new software version is available. Please update your client to continue.</p>
               </div>
            </div>
            <div className="p-showcase-md rounded-showcase-md border border-showcase-error/20 bg-showcase-error/5 flex gap-3 text-showcase-error mt-3">
               <AlertCircle className="w-5 h-5 shrink-0" />
               <div>
                  <h4 className="font-semibold text-sm">Connection Lost</h4>
                  <p className="text-sm opacity-80 mt-1">We couldn't connect to the server. Check your network and try again.</p>
               </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-wider opacity-50 uppercase mb-4">Cards & Progress</h2>
          
          <div className="bg-showcase-surface border border-showcase-border rounded-showcase-xl p-showcase-lg shadow-sm mb-6">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-showcase-primary/10 text-showcase-primary rounded-showcase-full flex items-center justify-center">
                   <Star className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-semibold">Pro Plan</h3>
                   <p className="text-sm opacity-60">$29/month</p>
                </div>
             </div>
             <p className="text-sm opacity-80 mb-6">Unlock all premium features including priority support and advanced analytics.</p>
             <button className="w-full py-showcase-sm bg-showcase-primary text-white rounded-showcase-md font-medium">Upgrade Plan</button>
          </div>

          <div>
             <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Downloading...</span>
                <span className="opacity-60">65%</span>
             </div>
             <div className="w-full h-2 bg-showcase-surface rounded-showcase-full overflow-hidden border border-showcase-border">
                <div className="h-full bg-showcase-primary rounded-showcase-full w-[65%]"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
