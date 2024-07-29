import { ProductFilters } from "../components/ProductFilters";
import { SalesTable } from "../components/SalesTable";
import { SearchBar } from "../components/SearchBar";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const SalesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Buscar cliente..." />
        <div className="flex items-center gap-4">
          <ProductFilters />
          <GradientLink text="Nueva venta" icon={Plus} url="/sales/new" />
        </div>
      </div>
      <SalesTable />
    </>
  );
};
