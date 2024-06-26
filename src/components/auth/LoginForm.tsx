import { FormInput } from "../ui/FormInput";
import { useForm } from "../../hooks/useForm";
import { LoginSchema } from "../../schemas/auth";
import { FormEvent, useState } from "react";
import { axiosAPI } from "../../libs/axios";
import { handleErrorMessage } from "../../utils/errors";
import { Logo } from "../Logo";
import { AuthResponseType } from "../../types";

const initialFormData = {
  email: "",
  password: "",
};

export function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, handleChange, validateForm } = useForm(
    initialFormData,
    LoginSchema
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validatedData = validateForm();
    if (!validatedData) return;

    setLoading(true);

    try {
      await axiosAPI.post<AuthResponseType>("/auth/login", validatedData);

      location.assign("/products");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-white p-10 rounded-md shadow-sm w-10/12 max-w-80"
    >
      <Logo />
      <h3 className="mt-4 mb-6 text-center">Inicia sesión para entrar</h3>
      <FormInput
        value={data.email}
        type="email"
        label="Correo"
        change={handleChange}
        name="email"
      />
      <FormInput
        value={data.password}
        type="password"
        label="Contraseña"
        change={handleChange}
        name="password"
      />
      <button
        className="bg-dark-gradient rounded-md text-white py-1.5 text-sm mt-4 font-medium"
        type="submit"
      >
        {loading ? "Validando..." : "Entrar"}
      </button>
    </form>
  );
}
