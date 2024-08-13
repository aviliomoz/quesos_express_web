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
export type SaleStatus = "pending" | "deleted" | "completed";

export type Product = {
  id: string;
  name: string;
  price: number;
  initialStock: number;
  status: Status;
  stock?: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string | null;
  status: Status;
  dni: string;
  address: string | null;
};

export type Supplier = {
  id: string;
  ruc: string;
  name: string;
  phone: string;
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
  date: string;
  description: string;
  status: Status;
  productId: string;
  amount: number;
};

export type Kardex = {
  id: string;
  date: Date;
  product: {
    id: string;
    name: string;
    status: string;
  };
  type: "entry" | "output" | "sale" | "purchase";
  description: string;
  status: string;
  entry: number;
  output: number;
  balance: number;
}[];

export type Purchase = {
  status: Status;
  date: string;
  id: string;
  supplier: {
    id: string;
    name: string;
  };
};

export type PurchaseDetail = {
  product: {
    id: string;
    name: string;
    status: Status;
  };
  amount: number;
  id: string;
  price: number;
  purchaseId: string;
  discount: number;
};

export type Sale = {
  customer: {
    id: string;
    name: string;
  };
  date: string;
  delivered: boolean;
  paid: boolean;
  status: SaleStatus;
  id: string;
};

export type SaleDetail = {
  product: {
    id: string;
    name: string;
    status: Status;
  };
  amount: number;
  price: number;
  discount: number;
  id: string;
  saleId: string;
};
