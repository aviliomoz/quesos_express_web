import { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponseType = {
  user?: User;
  error?: string;
  message?: string;
};

export type NavigationPath = {
  url: string;
  text: string;
  icon: LucideIcon;
};
