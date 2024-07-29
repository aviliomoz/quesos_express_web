import { ProductFilters } from "../components/ProductFilters";
import { PurchasesTable } from "../components/PurchasesTable";
import { SearchBar } from "../components/SearchBar";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const PurchasesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Buscar proveedor..." />
        <div className="flex items-center gap-4">
          <ProductFilters />
          <GradientLink text="Nueva compra" icon={Plus} url="/purchases/new" />
        </div>
      </div>
      <PurchasesTable />
    </>
  );
};
