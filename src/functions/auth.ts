import { z } from "zod";
import { LoginSchema, SignupSchema } from "../schemas/auth";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  const session = await res.json();

  if (session) {
    redirect("/dashboard/restaurants");
  }
};

export const signup = async (data: z.infer<typeof SignupSchema>) => {};

export const logout = async () => {};

export const refreshToken = async (token: string): Promise<string> => {
  const res = await fetch("http://localhost:5000/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const data = await res.json();

  return data.token;
};
