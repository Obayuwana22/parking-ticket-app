"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "ADMIN" | "OFFICER";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        router.replace("/login");
      } else if (requiredRole && user?.role !== requiredRole) {
        // Authenticated but wrong role
        router.replace("/login");
      }
    }
  }, [isAuthenticated, user, isLoading, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <div className="inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-[#FACC15]"></div>
          </div>
          <p className="mt-4 font-black text-black uppercase tracking-widest">
            Verifying credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
