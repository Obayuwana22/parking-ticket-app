"use client";

import React, { useEffect, useState } from "react";
import { registerSchema, RegisterUser, Role } from "@/types";
import { Illustrations } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: (role: Role, name?: string) => void;
}

type AuthView = "role-select" | "auth-form";
type AuthMode = "login" | "signup";

const Login = ({ onLogin }: LoginProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [view, setView] = useState<AuthView>("role-select");
  const [mode, setMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<Role>(Role.OFFICER);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setView("auth-form");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: Role.OFFICER,
    },
  });

  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  const onSubmit = async (data: RegisterUser) => {
    console.log("Form submitted successfully:", data);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA]">
      {/* Visual Branding Section */}
      <div className="lg:w-1/2 bg-black text-white p-12 hidden lg:flex flex-col justify-between items-center lg:items-start text-center lg:text-left ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FACC15] border-2 border-white rounded-xl flex items-center justify-center">
            <span className="text-black font-black text-2xl">P</span>
          </div>
          <h2 className="text-2xl font-black tracking-tighter">PARKDASH</h2>
        </div>

        <div className="py-20">
          <div className="animate-float mb-12 flex justify-center lg:justify-start">
            <Illustrations.ParkingCar />
          </div>
          <h1 className="text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-8">
            SMART
            <br />
            ENFORCE
            <br />
            <span className="text-[#FACC15]">MENT.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-md font-medium">
            The modern standard for municipal parking logistics and automated
            officer dispatch.
          </p>
        </div>

        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <span>v2.4.0 Stable</span>
          <span>© 2024 PD Municipal</span>
        </div>
      </div>

      {/* Action Section */}
      <div className="lg:w-1/2 p-6 md:p-12 flex items-center justify-center h-screen">
        <div className="max-w-md w-full">
          <div className="bg-white border-4 border-black p-8 md:p-12 neo-shadow-lg rounded-[2.5rem] relative transition-all duration-300">
            {view === "role-select" ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <header className="mb-10">
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                    Identify.
                  </h3>
                  <p className="font-bold text-zinc-400">
                    Select your operational clearance level.
                  </p>
                </header>

                <div className="space-y-6">
                  <button
                    onClick={() => handleRoleSelect(Role.OFFICER)}
                    className="w-full group bg-[#FACC15] border-4 border-black py-6 px-8 font-black text-2xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:translate-x-1 hover:translate-y-1 hover:neo-shadow-none rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <span>FIELD OFFICER</span>
                      <span className="transition-transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 border-t-2 border-zinc-100"></div>
                    <span className="font-black text-zinc-300 text-xs tracking-widest">
                      OR
                    </span>
                    <div className="flex-1 border-t-2 border-zinc-100"></div>
                  </div>

                  <button
                    onClick={() => handleRoleSelect(Role.ADMIN)}
                    className="w-full group bg-white border-4 border-black py-6 px-8 font-black text-2xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:translate-x-1 hover:translate-y-1 hover:neo-shadow-none rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <span>SYSTEM ADMIN</span>
                      <span className="transition-transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <button
                  onClick={() => setView("role-select")}
                  className="text-xs font-black uppercase mb-6 flex items-center gap-2 text-zinc-400 hover:text-black transition-colors"
                >
                  ← Back to Role selection
                </button>

                <header className="mb-8">
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-1">
                    {mode === "login" ? "Login" : "Signup"}
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
                  {mode === "signup" && (
                    <div className="space-y-1">
                      <label
                        htmlFor="fullName"
                        className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        // required
                        id="fullName"
                        name="fullName"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border-2 border-black font-bold outline-none rounded-xl focus:bg-zinc-50"
                        placeholder="Officer John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
                    >
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      // required
                      id="email"
                      name="email"
                      type="email"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
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
                        // required
                        id="password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        // onChange={(e) => setPassword(e.target.value)}
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
                    className="group w-full bg-[#FACC15] border-4 border-black py-5 font-black text-xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:neo-shadow-none rounded-2xl mt-4"
                  >
                    {/* {isSubmitting && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )} */}
                    {isSubmitting
                      ?   <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black group-hover:border-white border-t-transparent group-hover:border-t-black" />
                      : mode === "login"
                      ? "AUTHENTICATE"
                      : "CREATE ACCOUNT"}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() =>
                      setMode(mode === "login" ? "signup" : "login")
                    }
                    className="text-xs font-black uppercase border-b-2 border-black pb-1 hover:text-[#FACC15] hover:border-[#FACC15] transition-all"
                  >
                    {mode === "login"
                      ? "Need an account? Sign up here"
                      : "Already have an account? Log in"}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 p-4 bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200">
              <p className="text-[10px] font-black text-zinc-400 uppercase leading-loose text-center">
                Secure login session provided by PD Municipal Network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
