import { useForm } from "../hooks/useForm";
import { FormInput } from "./form-input";
import { SignupSchema } from "../schemas/auth";

export function SignupForm() {
  const { data, handleChange, handleSubmit, validating } = useForm(
    { email: "", password: "", name: "" },
    SignupSchema
  );

  return (
    <form
      onSubmit={(e) => handleSubmit(e, signup)}
      className="flex flex-col gap-2"
    >
      <h3 className="font-semibold text-lg mb-4">Signup</h3>
      <FormInput
        value={data.name}
        type="text"
        label="Name"
        change={handleChange}
        name="name"
      />
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
        {validating ? "Validating" : "Create account"}
      </button>
    </form>
  );
}
