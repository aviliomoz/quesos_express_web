import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MovementForm } from "../components/MovementForm";

export const MovementPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles del movimiento" : "Crear nuevo movimiento"}
        </h3>
        <Link to={"/products"} className="flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4" />
          Volver
        </Link>
      </div>
      <MovementForm />
    </>
  );
};
