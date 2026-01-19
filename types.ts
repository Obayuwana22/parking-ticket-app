import { z } from "zod";

const passwordSchema =  z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&#]/, "Must contain a special character")

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
  role: z.enum(["ADMIN", "OFFICER"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  role: z.enum(["ADMIN", "OFFICER"]),
});

export type SignupUser = z.infer<typeof signupSchema>;
export type loginUser = z.infer<typeof loginSchema>

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
