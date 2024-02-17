import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function SearchBar() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>(
    searchParams[0].get("search") || ""
  );

  useEffect(() => {
    const updateSearch = setTimeout(() => {
      const params = new URLSearchParams(searchParams[0]);
      if (search.length > 0) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      searchParams[1]();
    }, 400);

    return () => {
      clearTimeout(updateSearch);
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
