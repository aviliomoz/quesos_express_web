import { getRestaurantById } from "@/functions/restaurants";
import { createSupabaseServerClient } from "@/libs/supabase/server";
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
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/dashboard/restaurants");

  if (user) {
    const { data, error } = await supabase
      .from("teams")
      .select()
      .eq("user_id", user.id)
      .eq("restaurant_id", restaurant_id)
      .single();

    if (error || !data) redirect("/dashboard/restaurants");
  }

  return children;
}
