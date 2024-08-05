import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  label: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  value: Date;
  name?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
};

export function FormDateInput({
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
      <p>{label}:</p>
      <input
        className="border rounded-md px-3 py-1 outline-none w-full text-base"
        name={name}
        type="date"
        value={format(value, "yyyy-MM-dd")}
        onChange={change}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete="off"
      />
    </label>
  );
}
