"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { AuthBrandingSection } from "@/components/auth/AuthBrandingSection";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { SignupForm } from "@/components/auth/SignupForm";
import { Role } from "@/types";

const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  
  // Get role from URL params and convert to uppercase
  const roleSlug = params.role as string;
  const role = roleSlug?.toUpperCase() as Role;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleBack = () => {
    router.push("/auth");
  };

  const handleSwitchToLogin = () => {
    router.push(`/auth/${roleSlug}/login`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA]">
      <AuthBrandingSection />
      
      <AuthContainer>
        <SignupForm 
          role={role} 
          onBack={handleBack} 
          onSwitchToLogin={handleSwitchToLogin}
        />
      </AuthContainer>
    </div>
  );
};

export default SignupPage;
