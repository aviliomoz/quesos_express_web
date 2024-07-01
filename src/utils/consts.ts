import { BookUser, Box, ShoppingBag, Truck, Wallet, Warehouse } from "lucide-react";
import { NavigationPath } from "../types";

export const paths: NavigationPath[] = [
  {
    url: "/products",
    text: "Productos",
    icon: Box,
  },
  {
    url: "/customers",
    text: "Clientes",
    icon: BookUser,
  },
  {
    url: "/sales",
    text: "Ventas",
    icon: Wallet,
  },
  {
    url: "/purchases",
    text: "Compras",
    icon: ShoppingBag,
  },
  {
    url: "/suppliers",
    text: "Proveedores",
    icon: Truck,
  },
  {
    url: "/inventory",
    text: "Inventario",
    icon: Warehouse,
  },
];
