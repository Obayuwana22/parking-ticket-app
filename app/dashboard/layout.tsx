"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
// import DashboardPage from "./dashboard/page";

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(user?.email || "");
    console.log("Hi")
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar user={user} onLogout={handleLogout} />
        <main className="flex-1 p-8 bg-[#FAFAFA] overflow-auto max-h-screen">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
