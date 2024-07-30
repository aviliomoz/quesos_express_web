import { MovementFilters } from "../components/MovementFilters";
import { MovementsTable } from "../components/MovementsTable";
import { SearchBar } from "../components/SearchBar";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const MovementsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Buscar movimiento..." />
        <div className="flex items-center gap-4">
          <MovementFilters />
          <GradientLink
            text="Nuevo movimiento"
            icon={Plus}
            url="/movements/new"
          />
        </div>
      </div>
      <MovementsTable />
    </>
  );
};
