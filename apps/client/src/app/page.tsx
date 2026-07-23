"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ExplorerPanel } from "@/components/layout/ExplorerPanel";
import { ExplorePanel } from "@/components/layout/ExplorePanel";
import { SystemsPanel } from "@/components/layout/SystemsPanel";
import { HistoryPanel } from "@/components/layout/HistoryPanel";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { ControlsPanel } from "@/components/controls/ControlsPanel";
import { LivePreview } from "@/components/preview/LivePreview";
import { ExportModal } from "@/components/export/ExportModal";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderLeftPanel = () => {
    switch (activeView) {
      case "dashboard":
        return <ExplorerPanel />;
      case "explore":
        return <ExplorePanel />;
      case "systems":
        return <SystemsPanel />;
      case "history":
        return <HistoryPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <ExplorerPanel />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050508] text-foreground font-sans">
      {/* 1. Far Left: Thin Global Navigation (Sidebar repurposed) */}
      <Sidebar activeItem={activeView} onSelect={setActiveView} />

      {/* 2. Left Panel: Contextual Explorer/Panel */}
      {renderLeftPanel()}

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
