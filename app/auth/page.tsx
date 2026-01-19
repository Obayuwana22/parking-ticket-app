"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AuthBrandingSection } from "@/components/auth/AuthBrandingSection";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { Role } from "@/types";

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleRoleSelect = (selectedRole: Role) => {
    // Navigate to login page for the selected role
    const roleSlug = selectedRole.toLowerCase();
    router.push(`/auth/${roleSlug}/login`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA]">
      <AuthBrandingSection />
      
      <AuthContainer>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </AuthContainer>
    </div>
  );
};

export default AuthPage;
