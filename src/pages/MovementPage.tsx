import { useParams } from "react-router-dom";
import { MovementForm } from "../components/MovementForm";
import { GoBackButton } from "../components/ui/GoBackButton";

export const MovementPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles del movimiento" : "Crear nuevo movimiento"}
        </h3>
        <GoBackButton />
      </div>
      <MovementForm />
    </>
  );
};
