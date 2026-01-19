
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase">Violations</h2>
          <p className="text-zinc-500 font-bold">Manage and issue parking citations in real-time.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#FACC15] text-black px-10 py-4 font-black text-lg border-2 border-black neo-shadow hover:neo-shadow-none transition-all"
        >
          {showForm ? 'CANCEL FILING' : 'NEW VIOLATION'}
        </button>
      </div>

      {showForm && (
        <div className="border-4 border-black p-8 mb-12 bg-white neo-shadow-lg rounded-2xl animate-in fade-in zoom-in duration-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">License Plate</label>
              <input 
                required
                value={plate}
                onChange={e => setPlate(e.target.value)}
                className="w-full p-4 border-2 border-black font-black text-2xl uppercase focus:bg-zinc-50 outline-none rounded-lg"
                placeholder="ABC-1234"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">Vehicle Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value as VehicleType)}
                className="w-full p-4 border-2 border-black font-black text-lg uppercase outline-none rounded-lg appearance-none bg-white"
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
                className="w-full p-4 border-2 border-black font-black text-lg uppercase outline-none rounded-lg bg-white"
              >
                {MOCK_ZONES.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
              </select>
            </div>
            <div className="lg:col-span-3 flex items-center justify-between pt-6 border-t-2 border-zinc-100">
              <div className="flex gap-4 items-center">
                 <span className="text-xs font-black uppercase text-zinc-400">Calculated Fine</span>
                 <span className="text-4xl font-black">${calculatePrice(zoneId, type).toFixed(2)}</span>
              </div>
              <button className="bg-black text-white px-12 py-5 font-black text-xl hover:bg-[#FACC15] hover:text-black transition-colors rounded-xl border-2 border-black">
                ISSUE CITATION
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tickets.map(t => (
          <div key={t.id} className="bg-white border-2 border-black p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:translate-x-1 transition-transform cursor-pointer rounded-xl neo-shadow">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-zinc-50 border-2 border-black rounded-lg flex items-center justify-center grayscale">
                 <Illustrations.TicketIcon />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter">{t.vehiclePlate}</h4>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] font-black uppercase bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">{t.vehicleType}</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.zoneName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-zinc-400">Officer: {t.issuedBy}</p>
                <p className="text-2xl font-black">${t.amount.toFixed(2)}</p>
              </div>
              <div className={`px-4 py-2 border-2 border-black font-black text-xs rounded-lg ${t.status === 'PAID' ? 'bg-green-100' : 'bg-[#FACC15]'}`}>
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