import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  placeholder: string;
};

export const SearchBar = ({ placeholder }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  const updateSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    setSearchParams(params);
  };

  useEffect(() => {
    const timeout = setTimeout(() => updateSearchParams(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <input
      className="text-sm border rounded-md px-4 py-1.5 outline-none w-full max-w-96"
      type="text"
      placeholder={placeholder}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
};
