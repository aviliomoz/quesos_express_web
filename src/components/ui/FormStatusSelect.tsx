import { ChangeEvent } from "react";

type Props = {
  label: string;
  change: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  disabled?: boolean;
};

export function FormStatusSelect({
  label,
  change,
  value,
  name,
  disabled = false,
}: Props) {
  return (
    <label className="flex flex-col gap-1 mb-1 text-sm ">
      <p className="">{label}:</p>
      <select
        className="border rounded-md px-3 py-1 outline-none w-full text-base cursor-pointer"
        name={name}
        value={value}
        onChange={change}
        disabled={disabled}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
    </label>
  );
}
