import { useParams } from "react-router-dom";
import { GoBackButton } from "../components/ui/GoBackButton";
import { SaleForm } from "../components/sales/SaleForm";

export const SalePage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles de la venta" : "Registrar nueva venta"}
        </h3>
        <GoBackButton />
      </div>
      <SaleForm/>
    </>
  );
};
