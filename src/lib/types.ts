export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingSource = "ai-agent" | "admin" | "manual";

export interface Booking {
  _id: string;
  fullName: string;
  reservationNumber?: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: number;
  notes?: string;
  source: BookingSource;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookingStats {
  statsMap: Record<string, number>;
  total: number;
  latest: Booking[];
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface ApiSuccess<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  meta?: PaginationMeta;
}

export interface ApiErrorBody {
  success: boolean;
  message: string;
  statusCode: number;
}