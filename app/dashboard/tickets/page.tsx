"use client"

import React, { useState } from 'react';
import { User, VehicleType, Ticket, TicketStatus } from '@/types';
import { MOCK_TICKETS, MOCK_ZONES, Illustrations } from '@/constants';

interface TicketsProps {
  user: User | null;
}

const Tickets: React.FC<TicketsProps> = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [plate, setPlate] = useState('');
  const [type, setType] = useState<VehicleType>(VehicleType.CAR);
  const [zoneId, setZoneId] = useState(MOCK_ZONES[0].id);

  const calculatePrice = (zId: string, vType: VehicleType) => {
    const zone = MOCK_ZONES.find(z => z.id === zId);
    if (!zone) return 0;
    let price = zone.basePrice;
    if (vType === VehicleType.TRUCK) price += 30;
    if (vType === VehicleType.BIKE) price -= 5;
    return price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zone = MOCK_ZONES.find(z => z.id === zoneId);
    const newTicket: Ticket = {
      id: `T-${Math.floor(Math.random() * 9000) + 1000}`,
      vehiclePlate: plate.toUpperCase(),
      vehicleType: type,
      zoneId: zoneId,
      zoneName: zone?.name || 'Unknown',
      amount: calculatePrice(zoneId, type),
      issuedBy: user?.name || 'Unknown',
      issuedAt: new Date().toISOString(),
      status: TicketStatus.UNPAID
    };
    setTickets([newTicket, ...tickets]);
    setShowForm(false);
    setPlate('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase">Violations</h2>
          <p className="text-sm sm:text-base text-zinc-500 font-bold">Manage and issue parking citations in real-time.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#FACC15] text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 font-black text-sm sm:text-base lg:text-lg border-2 border-black neo-shadow hover:neo-shadow-none transition-all w-full sm:w-auto shrink-0"
        >
          {showForm ? 'CANCEL FILING' : 'NEW VIOLATION'}
        </button>
      </div>

      {showForm && (
        <div className="border-4 border-black p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 bg-white neo-shadow-lg rounded-2xl animate-in fade-in zoom-in duration-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">License Plate</label>
              <input 
                required
                value={plate}
                onChange={e => setPlate(e.target.value)}
                className="w-full p-3 sm:p-4 border-2 border-black font-black text-lg sm:text-xl lg:text-2xl uppercase focus:bg-zinc-50 outline-none rounded-lg"
                placeholder="ABC-1234"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">Vehicle Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value as VehicleType)}
                className="w-full p-3 sm:p-4 border-2 border-black font-black text-sm sm:text-base lg:text-lg uppercase outline-none rounded-lg appearance-none bg-white"
              >
                <option value={VehicleType.CAR}>CAR</option>
                <option value={VehicleType.BIKE}>BIKE</option>
                <option value={VehicleType.TRUCK}>TRUCK</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">Enforcement Zone</label>
              <select 
                value={zoneId}
                onChange={e => setZoneId(e.target.value)}
                className="w-full p-3 sm:p-4 border-2 border-black font-black text-sm sm:text-base lg:text-lg uppercase outline-none rounded-lg bg-white"
              >
                {MOCK_ZONES.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
              </select>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 pt-5 sm:pt-6 border-t-2 border-zinc-100">
              <div className="flex gap-3 sm:gap-4 items-center justify-center sm:justify-start">
                 <span className="text-xs font-black uppercase text-zinc-400">Calculated Fine</span>
                 <span className="text-2xl sm:text-3xl lg:text-4xl font-black">${calculatePrice(zoneId, type).toFixed(2)}</span>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#FACC15] text-black px-8 py-4 sm:py-5 font-black text-base sm:text-lg lg:text-xl hover:bg-black hover:text-white transition-colors rounded-xl border-2 border-black neo-shadow hover:neo-shadow-none whitespace-nowrap"
              >
                ISSUE CITATION
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {tickets.map(t => (
          <div key={t.id} className="bg-white border-2 border-black p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 hover:translate-x-1 transition-transform cursor-pointer rounded-xl neo-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-50 border-2 border-black rounded-lg flex items-center justify-center grayscale shrink-0">
                 <Illustrations.TicketIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter truncate">{t.vehiclePlate}</h4>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] font-black uppercase bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">{t.vehicleType}</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase truncate">{t.zoneName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-zinc-100">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Officer: {t.issuedBy}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black">${t.amount.toFixed(2)}</p>
              </div>
              <div className={`px-3 sm:px-4 py-2 border-2 border-black font-black text-xs rounded-lg shrink-0 ${t.status === 'PAID' ? 'bg-green-100' : 'bg-[#FACC15]'}`}>
                {t.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;