import { z } from "zod";
import { LoginSchema, SignupSchema } from "@/schemas/auth";
import { createSupabaseBrowserClient } from "@/libs/supabase/browser";
import { AuthError } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const supabase = createSupabaseBrowserClient();

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw new AuthError(error.message);

    session && document.location.assign("/dashboard/restaurants");
  } catch (error) {
    if (error instanceof AuthError) toast.error(error.message);
    if (error instanceof Error) toast.error(error.message);
  }
};

export const signup = async (data: z.infer<typeof SignupSchema>) => {
  const supabase = createSupabaseBrowserClient();

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) throw new AuthError(error.message);

    if (session) {
      const { error } = await supabase
        .from("profiles")
        .insert({ id: session.user.id, name: data.name, language: "en" });

      if (error) throw new Error(error.message);

      document.location.assign("/dashboard/restaurants");
    }
  } catch (error) {
    if (error instanceof AuthError) toast.error(error.message);
    if (error instanceof Error) toast.error(error.message);
  }
};

export const logout = async () => {
  const supabase = createSupabaseBrowserClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new AuthError(error.message);

    document.location.reload();
  } catch (error) {
    if (error instanceof AuthError) toast.error(error.message);
    if (error instanceof Error) toast.error(error.message);
  }
};
