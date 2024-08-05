import { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type NavigationPath = {
  url: string;
  text: string;
  icon: LucideIcon;
};

export type APIResponse<T> = {
  ok: boolean;
  message: string;
  error: { code: string; details: string } | null;
  data: T;
  meta?: {
    count?: number;
    pages?: number;
  };
};

export type Status = "active" | "inactive";

export type Product = {
  id: string;
  name: string;
  price: number;
  initialStock: number;
  status: Status;
  stock?: number
};

export type Customer = {
  id: string;
  dni: string;
  name: string;
  lastname: string;
  phone?: string;
  address?: string;
  status: Status;
};

export type Supplier = {
  id: string;
  ruc: string;
  name: string;
  phone: string;
  status: Status;
};

export type Sale = {
  id: string;
  customer_id: string;
  orderDate: string; // assuming ISO 8601 date string
  deliveryDate?: string; // assuming ISO 8601 date string
  paymentDate?: string; // assuming ISO 8601 date string
  delivered: boolean;
  paid: boolean;
  total: number;
  user_id: string;
  status: Status;
};

export type Purchase = {
  id: string;
  timestamp: string; // assuming ISO 8601 date string
  user_id: string;
  supplier_id: string;
  total: number;
  status: Status;
};

export type MovementDetail = {
  id: string;
  productId: string;
  movementId: string;
  amount: number;
};

export type Movement = {
  id: string;
  type: "entry" | "output";
  date: Date;
  description: string;
  userId: string;
  status: Status;
};
