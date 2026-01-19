"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Role, AuthState } from "@/types";
import api from "@/lib/axiosAuth";
import { setAccessToken, clearAccessToken } from "@/lib/token";
import toast from "react-hot-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    role: Role,
  ) => Promise<void>;
  logout: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("authState");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error("Failed to parse auth state:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Persist auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const login = async (email: string, password: string, role: Role) => {
    setIsLoading(true);
    if (isLoading) {
      toast.loading("Signing in...");
    }
    try {
      const res = await api.post("/login", { email, password });
      setAccessToken(res.data.accessToken);
      setAuthState({
        user: res.data.user || { email },
        isAuthenticated: true,
      });
      toast.success("Login Successful");
      return res.data;
    } catch (error) {
      let errorMessage = "Unknown error";

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = apiError.response?.data?.message || "Unknown error";
      }

      console.error("Login failed:", errorMessage);
      toast.error(`Login failed: ${errorMessage}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: Role,
  ) => {
    setIsLoading(true);
    if (isLoading) {
      toast.loading("Signing in...");
    }
    try {
      const res = await api.post("/register", { name, email, password });
      setAccessToken(res.data.accessToken);
      setAuthState({
        user: res.data.user || { name, email },
        isAuthenticated: true,
      });
      console.log(res);
      toast.success("Signup Successful");
      return res.data;
    } catch (error) {
      let errorMessage = "Unknown error";

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = apiError.response?.data?.message || "Unknown error";
      }

      console.error("Signup failed:", errorMessage);
      toast.error(`Signup failed: ${errorMessage}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (email: string) => {
    try {
      clearAccessToken();
      await api.post("/logout", { email: email });
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
      localStorage.removeItem("authState");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
