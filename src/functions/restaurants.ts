import { createSupabaseServerClient } from "@/libs/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export const getRestaurants = async () => {
  const supabase = createSupabaseServerClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new AuthError(error.message);

    if (user) {
      const { data: restaurants } = await supabase.from("restaurants").select();
      return restaurants || [];
    }

    return [];
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (error instanceof AuthError) toast.error(error.message);
  }
};

export const getRestaurantById = async (id: string) => {
  const restaurant = {
    id: "1",
    name: "Mezqal",
  };

  return restaurant;
};
