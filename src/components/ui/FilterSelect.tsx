import { useSearchParams } from "react-router-dom";

type Props = {
  label: string;
  name: string;
  options: Option[];
};

type Option = {
  value: string;
  text: string;
};

export const FilterSelect = ({ label, name, options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    params.delete("page");

    setSearchParams(params);
  };

  return (
    <div>
      <label className="mr-3">{label}:</label>
      <select
        className="border rounded-md px-3 py-1 outline-none"
        onChange={(e) => updateSearchParams(e.target.value)}
        value={searchParams.get(name) || undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
