import { RestaurantStoreProvider } from "@/providers/restaurant-store-provider";
import { redirect } from "next/navigation";

type Props = {
  children: JSX.Element | JSX.Element[];
  params: {
    restaurant_id: string;
  };
};

export default async function RestaurantLayout({
  children,
  params: { restaurant_id },
}: Props) {
  // Aqui va la validacion de si el restaurante existe y si el usuario es miembro

  return <RestaurantStoreProvider>{children}</RestaurantStoreProvider>;
}
