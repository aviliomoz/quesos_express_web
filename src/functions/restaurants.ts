import { createSupabaseBrowserClient } from "@/libs/supabase/browser";
import { createSupabaseServerClient } from "@/libs/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export const getUserRestaurantIds = async () => {
  const supabase = createSupabaseServerClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new AuthError(error.message);

    if (user) {
      const { data: restaurants, error } = await supabase
        .from("teams")
        .select()
        .eq("user_id", user.id);

      if (error) throw new Error(error.message);

      return restaurants || [];
    }

    return [];
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (error instanceof AuthError) toast.error(error.message);
  }
};

export const getRestaurantById = async (id: string) => {
  const supabase = createSupabaseBrowserClient();

  try {
    const { data: restaurant, error } = await supabase
      .from("restaurants")
      .select()
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return restaurant;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
  }
};
