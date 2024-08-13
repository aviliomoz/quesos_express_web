import { useParams } from "react-router-dom";
import { ProductForm } from "../components/products/ProductForm";
import { GoBackButton } from "../components/ui/GoBackButton";

export const ProductPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles del producto" : "Crear nuevo producto"}
        </h3>
        <GoBackButton />
      </div>
      <ProductForm />
    </>
  );
};
