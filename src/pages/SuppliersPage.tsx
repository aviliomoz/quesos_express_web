import { ProductFilters } from "../components/products/ProductFilters";
import { SearchBar } from "../components/SearchBar";
import { SuppliersTable } from "../components/suppliers/SuppliersTable";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const SuppliersPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Buscar proveedor..." />
        <div className="flex items-center gap-4">
          <ProductFilters />
          <GradientLink
            text="Nuevo proveedor"
            icon={Plus}
            url="/suppliers/new"
          />
        </div>
      </div>
      <SuppliersTable />
    </>
  );
};
