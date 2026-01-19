"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signupSchema, SignupUser, Role } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface SignupFormProps {
  role: Role;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ role, onBack, onSwitchToLogin }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupUser>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Role.OFFICER,
    },
  });

  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  const onSubmit = async (data: SignupUser) => {
    try {
      await signup(data.name, data.email, data.password, data.role as Role);
      console.log("Signup successful");
      reset();
    } catch (error) {
         console.log(error);
      let errorMessage = "Unknown error";

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = apiError.response?.data?.message || "Unknown error";
      }

      console.error("Auth error:", errorMessage);
      throw error;
    }
  };



  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
      <button
        onClick={onBack}
        className="text-xs font-black uppercase mb-6 flex items-center gap-2 text-zinc-400 hover:text-black transition-colors"
      >
        ← Back to Role selection
      </button>

      <header className="mb-8">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-1">
          Signup
        </h3>
        <p className="text-sm font-bold text-zinc-400">
          As <span className="text-black underline">{role}</span>
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <input type="hidden" {...register("role")} />

        <div className="space-y-1">
          <label
            htmlFor="name"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            name="name"
            className="w-full p-4 border-2 border-black font-bold outline-none rounded-xl focus:bg-zinc-50"
            placeholder="Officer John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            className="w-full p-4 border-2 border-black font-bold outline-none rounded-xl focus:bg-zinc-50"
            placeholder="officer@parkdash.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            Secure Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              className="w-full p-4 border-2 border-black font-bold outline-none rounded-xl focus:bg-zinc-50"
              placeholder="••••••••"
            />
            <div
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
              {isPasswordVisible ? (
                <Eye className="w-4 h-4 text-accent " />
              ) : (
                <EyeOff className="w-4 h-4 text-accent" />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full bg-[#FACC15] border-4 border-black py-5 font-black text-xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:neo-shadow-none rounded-2xl mt-4 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black group-hover:border-white border-t-transparent group-hover:border-t-black" />
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-xs font-black uppercase border-b-2 border-black pb-1 hover:text-[#FACC15] hover:border-[#FACC15] transition-all"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};
