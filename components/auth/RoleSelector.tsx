import React from "react";
import { Role } from "@/types";

interface RoleSelectorProps {
  onRoleSelect: (role: Role) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  return (
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
          onClick={() => onRoleSelect(Role.OFFICER)}
          className="w-full group bg-[#FACC15] border-4 border-black py-6 px-8 font-black text-2xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:translate-x-1 hover:translate-y-1 hover:neo-shadow-none rounded-2xl cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span>FIELD OFFICER</span>
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </div>
        </button>

        {/* Commented out admin role - can be enabled later */}
        {/* <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t-2 border-zinc-100"></div>
          <span className="font-black text-zinc-300 text-xs tracking-widest">
            OR
          </span>
          <div className="flex-1 border-t-2 border-zinc-100"></div>
        </div> */}

        {/* <button
          onClick={() => onRoleSelect(Role.ADMIN)}
          className="w-full group bg-white border-4 border-black py-6 px-8 font-black text-2xl hover:bg-black hover:text-white transition-all duration-300 neo-shadow hover:translate-x-1 hover:translate-y-1 hover:neo-shadow-none rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <span>SYSTEM ADMIN</span>
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </div>
        </button> */}
      </div>
    </div>
  );
};
