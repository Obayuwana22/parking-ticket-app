"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Illustrations, MOCK_TICKETS } from "@/constants";

const CommandsPage: React.FC = () => {
  const { user } = useAuth();
  const [aiSummary] = useState<string>("Booting analysis engine...");
  const [loadingAi] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Hero with Human Mascot */}
      <section className="bg-white border-4 border-black p-6 md:p-10 rounded-[2.5rem] neo-shadow flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden">
        <div className="relative z-10 flex-1 space-y-4 w-full">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            ACTIVE SESSION
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
            Welcome back,
            <br />
            <span className="text-[#FACC15] drop-shadow-[2px_2px_0px_#000]">
              {user?.name.split(" ")[0]}
            </span>
            .
          </h2>
          <div className="bg-zinc-50 border-2 border-black p-4 md:p-6 rounded-2xl relative">
            <div className="absolute -left-3 top-4 w-4 h-4 bg-zinc-50 border-l-2 border-b-2 border-black rotate-45"></div>
            <p
              className={`text-lg md:text-xl font-bold leading-snug italic ${
                loadingAi ? "animate-pulse text-zinc-300" : "text-zinc-600"
              }`}
            >
              &quot;{aiSummary}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            label: "Violations Issued",
            val: "42",
            icon: <Illustrations.TicketIcon />,
          },
          {
            label: "Active Zones",
            val: "08",
            icon: <Illustrations.ParkingCar />,
          },
          { label: "Collection Rate", val: "88%", icon: null },
          { label: "Response Time", val: "4m", icon: null },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border-4 border-black p-4 md:p-6 rounded-2xl neo-shadow hover:-translate-y-1 transition-transform group"
          >
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <p className="text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-widest">
                {item.label}
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-black tracking-tighter">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <section className="lg:col-span-2 bg-white border-4 border-black p-6 md:p-8 rounded-4xl neo-shadow">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 md:mb-8 flex items-center gap-4">
            <span className="w-3 h-3 bg-[#FACC15] border-2 border-black rounded-full"></span>
            Real-time Violation Stream
          </h3>
          <div className="space-y-4">
            {MOCK_TICKETS.map((t) => (
              <div
                key={t.id}
                className="border-2 border-black p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50 transition-colors group"
              >
                <div className="flex items-center gap-4 md:gap-5 w-full sm:w-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center group-hover:bg-[#FACC15] transition-colors shrink-0">
                    <Illustrations.TicketIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg md:text-xl font-black tracking-tight truncate">
                      {t.vehiclePlate}
                    </p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase truncate">
                      {t.zoneName} • {t.vehicleType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="font-black text-lg md:text-xl">${t.amount}</p>
                  </div>
                  <div className="bg-black text-white px-3 md:px-4 py-2 rounded-lg font-black text-xs uppercase shrink-0">
                    {t.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black text-white p-6 md:p-8 rounded-4xl border-4 border-black neo-shadow relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4">
              System Alerts
            </h3>
            <div className="space-y-4 md:space-y-6">
              <div className="p-4 bg-zinc-900 border-l-4 border-[#FACC15] rounded-r-xl">
                <p className="text-xs font-black text-[#FACC15] uppercase mb-1">
                  Heavy Congestion
                </p>
                <p className="text-sm font-bold">
                  Harbor Front requires additional unit deployment for meter
                  checks.
                </p>
              </div>
              <div className="p-4 bg-zinc-900 border-l-4 border-white rounded-r-xl opacity-60">
                <p className="text-xs font-black uppercase mb-1">
                  Policy Update
                </p>
                <p className="text-sm font-bold">
                  Truck rates in Sector 2 adjusted by +$5.00 effective 00:00.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 md:mt-8 bg-[#FACC15] text-black py-3 md:py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white transition-colors">
              Acknowledge All
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10 scale-150 rotate-12">
            <Illustrations.ParkingCar />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommandsPage;
