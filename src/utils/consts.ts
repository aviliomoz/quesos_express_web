import { BookUser, Box, ShoppingBag, Truck, Wallet } from "lucide-react";
import { NavigationPath } from "../types";

export const paths: NavigationPath[] = [
  {
    url: "/products",
    text: "Productos",
    icon: Box,
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
    url: "/customers",
    text: "Clientes",
    icon: BookUser,
  },
  {
    url: "/suppliers",
    text: "Proveedores",
    icon: Truck,
  },
];
