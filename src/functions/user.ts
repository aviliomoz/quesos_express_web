import { createSupabaseBrowserClient } from "@/libs/supabase/browser";
import { AuthError } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export const getUserProfile = async () => {
  const supabase = createSupabaseBrowserClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new AuthError(error.message);

  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();

    if (error) throw new Error(error.message);

    return profile;
  }

  try {
  } catch (error) {
    if (error instanceof AuthError) toast.error(error.message);
    if (error instanceof Error) toast.error(error.message);
  }
};
