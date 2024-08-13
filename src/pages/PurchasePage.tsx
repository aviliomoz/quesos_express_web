import { useParams } from "react-router-dom";
import { GoBackButton } from "../components/ui/GoBackButton";
import { PurchaseForm } from "../components/purchases/PurchaseForm";

export const PurchasePage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles de la compra" : "Registrar nueva compra"}
        </h3>
        <GoBackButton />
      </div>
      <PurchaseForm />
    </>
  );
};
