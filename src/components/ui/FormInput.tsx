import { ChangeEvent } from "react";

type Props = {
  type: "text" | "number" | "email" | "password";
  label: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
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
    <label className="flex flex-col gap-1 mb-1 text-sm">
      <p className="">{label}:</p>
      <input
        className="border rounded-md px-3 py-1 outline-none w-full text-base"
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
