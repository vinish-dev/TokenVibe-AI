import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ControlsPanel } from "@/components/controls/ControlsPanel";
import { LivePreview } from "@/components/preview/LivePreview";
import { ExportModal } from "@/components/export/ExportModal";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden flex-col">
        <Navbar />

        <div className="flex-1 flex overflow-hidden relative">
          <ControlsPanel />
          <LivePreview />
        </div>
      </main>

      <ExportModal />
    </div>
  );
}
