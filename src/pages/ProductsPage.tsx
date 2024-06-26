import { ProductFilters } from "../components/ProductFilters";
import { SearchBar } from "../components/SearchBar";
import { GradientLink } from "../components/ui/GradientLink";
import { Plus } from "lucide-react";

export const ProductsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <SearchBar placeholder="Buscar producto..." />
        <div className="flex items-center gap-4">
          <ProductFilters />
          <GradientLink text="Nuevo producto" icon={Plus} url="/products/new" />
        </div>
        {/* Filtros
            Boton crear */}
      </div>
      <table></table>
    </>
  );
};
