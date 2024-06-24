import { ChangeEvent } from "react";

type Props = {
  type: "text" | "number" | "email" | "password";
  label: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export function FormInput({
  type = "text",
  label,
  change,
  value,
  name,
  min,
  max,
  disabled = false,
}: Props) {
  return (
    <label className="flex items-center gap-4">
      <p className="font-medium">{label}:</p>
      <input
        className="border rounded-md px-3 py-1 outline-none w-full"
        name={name}
        type={type}
        value={value}
        onChange={change}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete="off"
      />
    </label>
  );
}
