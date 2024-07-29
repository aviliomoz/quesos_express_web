import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../components/ProductForm";

export const ProductPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles del producto" : "Crear nuevo producto"}
        </h3>
        <Link to={"/products"} className="flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4" />
          Volver
        </Link>
      </div>
      <ProductForm />
    </>
  );
};
