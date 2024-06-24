import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "../ui/Modal";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function AuthButtons() {
  const { user } = useAuth();
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signupModal, setSignupModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-6 w-full justify-end">
        {user ? (
          <>
            <Link
              to={"/home"}
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border border-orange-400 rounded-md px-4 py-1.5 text-sm font-medium hover:bg-orange-400"
            >
              Entrar a la App
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setLoginModal(true)}
              className="text-sm font-medium sm:block hidden"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setSignupModal(true)}
              className="bg-orange-500 text-white rounded-md px-4 py-1.5 text-sm font-medium sm:block hidden"
            >
              Registrarse
            </button>
            <button
              onClick={() => setLoginModal(true)}
              className="bg-orange-500 text-white rounded-md px-4 py-1.5 text-sm font-medium sm:hidden"
            >
              Acceder
            </button>
          </>
        )}
      </div>
      {loginModal && (
        <Modal close={() => setLoginModal(false)}>
          <LoginForm />
          <button
            className="text-sm flex mx-auto mt-4"
            onClick={() => {
              setLoginModal(false);
              setSignupModal(true);
            }}
          >
            ¿No tienes cuenta?{" "}
            <span className="text-orange-500 ml-2">Regístrate</span>
          </button>
        </Modal>
      )}
      {signupModal && (
        <Modal close={() => setSignupModal(false)}>
          <SignupForm />
          <button
            className="text-sm flex mx-auto mt-4"
            onClick={() => {
              setSignupModal(false);
              setLoginModal(true);
            }}
          >
            ¿Ya estas registrado?{" "}
            <span className="text-orange-500 ml-2">Inicia sesión</span>
          </button>
        </Modal>
      )}
    </>
  );
}
