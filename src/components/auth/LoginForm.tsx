import { FormInput } from "../ui/FormInput";
import { useForm } from "../../hooks/useForm";
import { LoginSchema } from "../../schemas/auth";
import { FormEvent, useState } from "react";
import { axiosAPI } from "../../libs/axios";
import { handleErrorMessage } from "../../utils/errors";

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

      window.location.assign("/home");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h3 className="font-semibold text-lg mb-4 text-center">Iniciar sesión</h3>
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
        className="bg-orange-500 hover:bg-orange-400 rounded-md border border-orange-200 text-white py-1.5 text-sm mt-4 font-medium"
        type="submit"
      >
        {loading ? "Validando..." : "Entrar"}
      </button>
    </form>
  );
}
