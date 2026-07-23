"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ControlsPanel } from "@/components/controls/ControlsPanel";
import { LivePreview } from "@/components/preview/LivePreview";
import { ExportModal } from "@/components/export/ExportModal";
import { ExploreGallery } from "@/components/explore/ExploreGallery";
import { useTokenStore } from "@/store/useTokenStore";

export default function Home() {
  const { appView } = useTokenStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden flex-col">
        <Navbar />

        {appView === 'dashboard' ? (
          <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row relative">
            <ControlsPanel />
            <LivePreview />
          </div>
        ) : (
          <ExploreGallery />
        )}
      </main>

      <ExportModal />
    </div>
  )
}
