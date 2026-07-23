"use client";

import { useState } from "react";
import { Sparkles, LayoutDashboard, Compass, FolderHeart, Clock, Settings, Search } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar({ 
  activeItem, 
  onSelect 
}: { 
  activeItem: string;
  onSelect: (id: string) => void;
}) {
  const NavItem = ({ id, icon: Icon, tooltip }: { id: string, icon: any, tooltip: string }) => {
    const isActive = activeItem === id;
    return (
      <div className="relative group">
        <button 
          onClick={() => onSelect(id)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl relative transition-colors ${isActive ? 'text-primary' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'}`}
        >
          {isActive && (
            <motion.div 
              layoutId="active-sidebar-nav" 
              className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon className="w-5 h-5 relative z-10" /> 
        </button>
        {/* Tooltip */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
          {tooltip}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-[68px] h-full bg-[#050508] border-r border-white/5 flex flex-col items-center py-4 shrink-0 z-30">
      {/* App Logo */}
      <div className="w-10 h-10 mb-8 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-shadow">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      
      {/* Top Nav */}
      <nav className="flex flex-col gap-3 flex-1 w-full items-center">
        <NavItem id="search" icon={Search} tooltip="Search (Cmd+K)" />
        <div className="w-8 h-px bg-white/10 my-2" />
        <NavItem id="dashboard" icon={LayoutDashboard} tooltip="Dashboard" />
        <NavItem id="explore" icon={Compass} tooltip="Explore Designs" />
        <NavItem id="systems" icon={FolderHeart} tooltip="My Systems" />
        <NavItem id="history" icon={Clock} tooltip="Generation History" />
      </nav>
      
      {/* Bottom Nav */}
      <div className="mt-auto flex flex-col gap-4 items-center">
        <NavItem id="settings" icon={Settings} tooltip="Settings" />
        
        {/* User Profile / Pro Badge */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-[2px] cursor-pointer hover:scale-105 transition-transform mt-2">
          <div className="w-full h-full bg-[#0a0a0c] rounded-full flex items-center justify-center overflow-hidden border border-black">
             <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <span className="text-xs font-bold text-zinc-400">US</span>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
