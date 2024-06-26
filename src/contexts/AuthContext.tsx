import { createContext, useContext, useEffect, useState } from "react";
import { axiosAPI } from "../libs/axios";
import { handleErrorMessage } from "../utils/errors";
import { User, AuthResponseType } from "../types";

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  validating: boolean;
};

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [validating, setValidating] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosAPI.get<AuthResponseType>("/auth/check");
        setUser(data.user);
      } catch (error) {
        return handleErrorMessage(error);
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
