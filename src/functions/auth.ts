import { z } from "zod";
import { LoginSchema, SignupSchema } from "@/schemas/auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  console.log(data);
};

export const signup = async (data: z.infer<typeof SignupSchema>) => {
  console.log(data);
};
