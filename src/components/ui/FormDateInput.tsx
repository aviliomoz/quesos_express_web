import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  label: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
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
  const [currentValue, setCurrentValue] = useState<string>("");

  useEffect(() => {
    if (!value) {
      const today = new Date().toISOString().split("T")[0];
      setCurrentValue(today);
    } else {
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <label className="flex flex-col gap-1 mb-1 text-sm">
      <p>{label}:</p>
      <input
        className="border rounded-md px-3 py-1 outline-none w-full text-base"
        name={name}
        type="date"
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          change(e);
        }}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete="off"
      />
    </label>
  );
}
