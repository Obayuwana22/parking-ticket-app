"use client";

import React, { useState } from 'react';
import { VehicleType } from '@/types';
import { MOCK_ZONES, Illustrations } from '@/constants';

interface Zone {
  id: string;
  name: string;
  basePrice: number;
  allowedVehicleTypes: string[];
}

const ZonesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [zones, setZones] = useState<Zone[]>(MOCK_ZONES);
  const [zoneName, setZoneName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [allowedTypes, setAllowedTypes] = useState<string[]>(['CAR']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newZone: Zone = {
      id: `Z-${Math.floor(Math.random() * 9000) + 1000}`,
      name: zoneName,
      basePrice: parseFloat(basePrice),
      allowedVehicleTypes: allowedTypes
    };
    setZones([newZone, ...zones]);
    setShowForm(false);
    setZoneName('');
    setBasePrice('');
    setAllowedTypes(['CAR']);
  };

  const toggleVehicleType = (type: string) => {
    if (allowedTypes.includes(type)) {
      setAllowedTypes(allowedTypes.filter(t => t !== type));
    } else {
      setAllowedTypes([...allowedTypes, type]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Enforcement Zones</h2>
          <p className="text-zinc-500 font-bold">Configure parking zones and pricing rules.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#FACC15] text-black px-8 md:px-10 py-4 font-black text-base md:text-lg border-2 border-black neo-shadow hover:neo-shadow-none transition-all w-full md:w-auto"
        >
          {showForm ? 'CANCEL' : 'NEW ZONE'}
        </button>
      </div>

      {showForm && (
        <div className="border-4 border-black p-6 md:p-8 mb-12 bg-white neo-shadow-lg rounded-2xl animate-in fade-in zoom-in duration-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-zinc-400">Zone Name</label>
                <input 
                  required
                  value={zoneName}
                  onChange={e => setZoneName(e.target.value)}
                  className="w-full p-4 border-2 border-black font-black text-lg md:text-2xl uppercase focus:bg-zinc-50 outline-none rounded-lg"
                  placeholder="Downtown Core"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-zinc-400">Base Price ($)</label>
                <input 
                  required
                  type="number"
                  step="0.01"
                  value={basePrice}
                  onChange={e => setBasePrice(e.target.value)}
                  className="w-full p-4 border-2 border-black font-black text-lg md:text-2xl focus:bg-zinc-50 outline-none rounded-lg"
                  placeholder="15.00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-zinc-400">Allowed Vehicle Types</label>
              <div className="flex flex-wrap gap-3">
                {[VehicleType.CAR, VehicleType.BIKE, VehicleType.TRUCK].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleVehicleType(type)}
                    className={`px-6 py-3 border-2 border-black font-black text-sm uppercase rounded-lg transition-colors ${
                      allowedTypes.includes(type) 
                        ? 'bg-[#FACC15] text-black' 
                        : 'bg-white text-black hover:bg-zinc-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-6 border-t-2 border-zinc-100">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-4 border-2 border-black font-black text-base hover:bg-zinc-50 transition-colors rounded-xl order-2 sm:order-1"
              >
                CANCEL
              </button>
              <button 
                type="submit"
                className="bg-black text-white px-12 py-4 font-black text-base md:text-xl hover:bg-[#FACC15] hover:text-black transition-colors rounded-xl border-2 border-black order-1 sm:order-2"
              >
                CREATE ZONE
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {zones.map(zone => (
          <div key={zone.id} className="bg-white border-4 border-black p-6 rounded-2xl hover:translate-x-1 transition-transform cursor-pointer neo-shadow">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-2xl md:text-3xl font-black tracking-tighter truncate">{zone.name}</h4>
                <p className="text-xs font-black uppercase text-zinc-400 mt-1">Zone ID: {zone.id}</p>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-50 border-2 border-black rounded-lg flex items-center justify-center grayscale shrink-0">
                <Illustrations.ParkingCar />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-zinc-100">
              <div>
                <p className="text-xs font-black uppercase text-zinc-400 mb-2">Base Fine</p>
                <p className="text-3xl md:text-4xl font-black">${zone.basePrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-zinc-400 mb-2">Allowed Vehicles</p>
                <div className="flex flex-wrap gap-2">
                  {zone.allowedVehicleTypes.map(type => (
                    <span 
                      key={type}
                      className="text-[10px] font-black uppercase bg-zinc-100 px-3 py-1 rounded border border-zinc-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZonesPage;
