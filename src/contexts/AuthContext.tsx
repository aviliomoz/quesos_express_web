import { createContext, useContext, useEffect, useState } from "react";
import { axiosAPI } from "../libs/axios";
import { User, APIResponse } from "../types";
import { handleErrorMessage } from "../utils/errors";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  validating: boolean;
};

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [validating, setValidating] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      setValidating(true);

      try {
        const {
          data: { data },
        } = await axiosAPI.get<APIResponse<User | null>>("/auth/check");
        setUser(data);
      } catch (error) {
        if (location.pathname !== "/") handleErrorMessage(error);
      } finally {
        setValidating(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, validating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );

  return context;
};
