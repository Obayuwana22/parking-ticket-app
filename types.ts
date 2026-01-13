
export enum Role {
  ADMIN = 'ADMIN',
  OFFICER = 'OFFICER'
}

export enum VehicleType {
  CAR = 'CAR',
  BIKE = 'BIKE',
  TRUCK = 'TRUCK'
}

export enum TicketStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Zone {
  id: string;
  name: string;
  basePrice: number;
  allowedVehicleTypes: VehicleType[];
}

export interface Ticket {
  id: string;
  vehiclePlate: string;
  vehicleType: VehicleType;
  zoneId: string;
  zoneName: string;
  amount: number;
  issuedBy: string;
  issuedAt: string;
  status: TicketStatus;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
