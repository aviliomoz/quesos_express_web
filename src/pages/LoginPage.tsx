import { LoggedButton } from "../components/auth/LoggedButton";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage = () => {
  const { user } = useAuth();

  return (
    <>
      <main className="flex justify-center items-center bg-gray-100 min-h-screen">
        {user ? <LoggedButton /> : <LoginForm />}
      </main>
    </>
  );
};
