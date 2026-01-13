
import React from 'react';

export const Illustrations = {
  ParkingCar: () => (
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="60" width="180" height="40" fill="white" stroke="black" strokeWidth="4" />
      <rect x="40" y="30" width="120" height="30" fill="#FACC15" stroke="black" strokeWidth="4" />
      <circle cx="50" cy="100" r="18" fill="black" />
      <circle cx="50" cy="100" r="8" fill="white" />
      <circle cx="150" cy="100" r="18" fill="black" />
      <circle cx="150" cy="100" r="8" fill="white" />
      <path d="M10 80H190" stroke="black" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  ),
  TicketIcon: () => (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="70" height="90" rx="4" fill="white" stroke="black" strokeWidth="4" />
      <rect x="5" y="5" width="70" height="25" fill="#FACC15" stroke="black" strokeWidth="4" />
      <rect x="15" y="45" width="50" height="6" rx="2" fill="black" />
      <rect x="15" y="60" width="50" height="6" rx="2" fill="black" />
      <rect x="15" y="75" width="30" height="6" rx="2" fill="black" />
    </svg>
  ),
  PoliceOfficer: () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="35" r="22" fill="white" stroke="black" strokeWidth="4" />
      <path d="M30 110V70C30 58.9543 38.9543 50 50 50H70C81.0457 50 90 58.9543 90 70V110" fill="white" stroke="black" strokeWidth="4" />
      <rect x="48" y="5" width="24" height="12" fill="black" rx="2" />
      <rect x="55" y="65" width="10" height="10" fill="#FACC15" stroke="black" strokeWidth="2" />
      <path d="M40 18H80" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  SearchBox: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="12" stroke="black" strokeWidth="4" />
      <path d="M28 28L36 36" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
};

export const MOCK_ZONES: any[] = [
  { id: '1', name: 'Downtown Core', basePrice: 15.00, allowedVehicleTypes: ['CAR', 'BIKE'] },
  { id: '2', name: 'Industrial Strip', basePrice: 25.00, allowedVehicleTypes: ['CAR', 'TRUCK'] },
  { id: '3', name: 'Residential West', basePrice: 5.00, allowedVehicleTypes: ['CAR', 'BIKE', 'TRUCK'] },
  { id: '4', name: 'Harbor Front', basePrice: 18.00, allowedVehicleTypes: ['CAR', 'BIKE'] }
];

export const MOCK_TICKETS: any[] = [
  { id: 'T-1001', vehiclePlate: 'XYZ-9087', vehicleType: 'CAR', zoneId: '1', zoneName: 'Downtown Core', amount: 15.00, issuedBy: 'Officer Smith', issuedAt: new Date().toISOString(), status: 'UNPAID' },
  { id: 'T-1002', vehiclePlate: 'ABC-1234', vehicleType: 'TRUCK', zoneId: '2', zoneName: 'Industrial Strip', amount: 45.00, issuedBy: 'Officer Jones', issuedAt: new Date().toISOString(), status: 'PAID' },
];
