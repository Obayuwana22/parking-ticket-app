import React from "react";
import NavItem from "./NavItem";
import { Role, User } from "../types";

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, isOpen, onClose }) => {
  return (
    <aside className={`
      fixed md:sticky top-0 z-40 
      h-screen w-full md:w-72 
      border-r-4 border-black bg-white flex flex-col
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="hidden p-6 md:p-8 md:flex flex-col items-center border-b-2 border-zinc-100">
        <div className="w-16 h-16 bg-[#FACC15] border-4 border-black rounded-2xl flex items-center justify-center neo-shadow transform -rotate-3 mb-4">
          <span className="text-3xl font-black">P</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-center">
          PARK<span className="text-[#FACC15]">WELL</span>
        </h1>
      </div>

      <nav className="flex-1 pt-28 md:pt-8" onClick={onClose}>
        <NavItem to="/dashboard/commands" label="Command" />
        <NavItem to="/dashboard/tickets" label="Tickets" />
        <NavItem to="/dashboard/zones" label="Zones" />
        {user?.role === Role.ADMIN && <NavItem to="/users" label="System" />}
      </nav>

      <div className="p-6 bg-zinc-50 border-t-2 border-zinc-100 mt-auto">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-black rounded-full overflow-hidden bg-[#FACC15] flex items-center justify-center">
              <span className="font-bold text-xs">{user?.name[0]}</span>
            </div>
            <div>
              <p className="font-black text-xs uppercase truncate w-32">
                {user?.name}
              </p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-3 bg-white border-2 border-black text-black font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all neo-shadow hover:neo-shadow-none cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
