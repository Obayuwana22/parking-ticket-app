import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({
  to,
  label,
}: {
  to: string;
  label: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <div>
      <Link
        href={to}
        className={`flex items-center justify-start gap-3 py-4 px-6 mx-4 my-1 rounded-xl font-bold transition-all border-2 border-transparent ${
          isActive
            ? "bg-black text-white neo-shadow translate-x-1 border-black"
            : "text-zinc-600 hover:text-black hover:bg-zinc-100"
        }`}
      >
        <span className="uppercase tracking-widest text-sm">{label}</span>
      </Link>
    </div>
  );
};

export default NavItem;
