import { useForm } from "../hooks/useForm";
import { FormInput } from "./form-input";
import { LoginSchema } from "../schemas/auth";
import { login } from "../functions/auth";

export function LoginForm() {
  const { data, handleChange, handleSubmit, validating } = useForm(
    { email: "", password: "" },
    LoginSchema
  );

  return (
    <form
      onSubmit={(e) => handleSubmit(e, login)}
      className="flex flex-col gap-2"
    >
      <h3 className="font-semibold text-lg mb-4">Login</h3>
      <FormInput
        value={data.email}
        type="email"
        label="Email"
        change={handleChange}
        name="email"
      />
      <FormInput
        value={data.password}
        type="password"
        label="Password"
        change={handleChange}
        name="password"
      />
      <button
        className="bg-orange-500 hover:bg-orange-400 rounded-md border border-orange-200 text-white py-1.5 text-sm mt-4 font-medium"
        type="submit"
      >
        {validating ? "Validating" : "Login"}
      </button>
    </form>
  );
}
