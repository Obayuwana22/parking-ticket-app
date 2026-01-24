"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/commands");
  }, [router]);

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold">Redirecting...</p>
      </div>
    </ProtectedRoute>
  );
}
