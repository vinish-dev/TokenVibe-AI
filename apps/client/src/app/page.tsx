import { Sidebar } from "@/components/layout/Sidebar";
import { ExplorerPanel } from "@/components/layout/ExplorerPanel";
import { ControlsPanel } from "@/components/controls/ControlsPanel";
import { LivePreview } from "@/components/preview/LivePreview";
import { ExportModal } from "@/components/export/ExportModal";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050508] text-foreground font-sans">
      {/* 1. Far Left: Thin Global Navigation (Sidebar repurposed) */}
      <Sidebar />

      {/* 2. Left Panel: Theme Explorer */}
      <ExplorerPanel />

      {/* 3. Center Canvas: Live Preview */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-0">
        <LivePreview />
      </main>

      {/* 4. Right Panel: AI Inspector/Controls */}
      <ControlsPanel />

      <ExportModal />
    </div>
  );
}
