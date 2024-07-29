import { CustomersTable } from "../components/CustomersTable";
import { ProductFilters } from "../components/ProductFilters";
import { SearchBar } from "../components/SearchBar";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const CustomersPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Buscar cliente..." />
        <div className="flex items-center gap-4">
          <ProductFilters />
          <GradientLink text="Nuevo cliente" icon={Plus} url="/customers/new" />
        </div>
      </div>
      <CustomersTable />
    </>
  );
};
