"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout(user?.email || "");
    console.log("Hi")
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="flex relative">
        {/* Fixed Mobile Header - Only visible on mobile */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FACC15] border-2 border-black rounded-lg flex items-center justify-center neo-shadow transform -rotate-3">
              <span className="text-xl font-black">P</span>
            </div>
            <h1 className="text-lg font-black tracking-tighter">
              PARK<span className="text-[#FACC15]">DASH</span>
            </h1>
          </div>
          
          <button
            onClick={toggleSidebar}
            className="bg-[#FACC15] border-2 border-black p-2 rounded-lg neo-shadow hover:neo-shadow-none transition-all"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-black transition-transform ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-opacity ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-transform ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </header>

        <Sidebar user={user} onLogout={handleLogout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 pt-28 md:pt-0 p-4 md:p-6 lg:p-8 bg-[#FAFAFA] overflow-auto max-h-screen">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
