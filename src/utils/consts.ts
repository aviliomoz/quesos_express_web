import { BookUser, Box, ShoppingBag, Wallet, Warehouse } from "lucide-react";
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
    url: "/inventory",
    text: "Inventario",
    icon: Warehouse,
  },
];
