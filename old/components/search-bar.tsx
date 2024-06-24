import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const updateSearch = (text: string) => {
    const params = new URLSearchParams(searchParams);

    if (search.trim() !== "") {
      params.set("search", text);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const update = setTimeout(() => updateSearch(search), 400);

    return () => {
      clearTimeout(update);
    };
  }, [search]);

  return (
    <label className="flex items-center gap-3 w-full max-w-96 min-w-40 border rounded-md px-3 py-1">
      <Search className="w-4 stroke-zinc-600" />
      <input
        className="w-full outline-none text-sm"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
}
