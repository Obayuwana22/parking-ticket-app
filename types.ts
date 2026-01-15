import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&#]/, "Must contain a special character"),
  role: z.enum(["ADMIN", "OFFICER"]),
});

// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

export type RegisterUser = z.infer<typeof registerSchema>;
// export type loginUser = z.infer<typeof loginSchema>

export enum Role {
  ADMIN = "ADMIN",
  OFFICER = "OFFICER",
}

export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  TRUCK = "TRUCK",
}

export enum TicketStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
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
