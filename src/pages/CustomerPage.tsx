import { useParams } from "react-router-dom";
import { GoBackButton } from "../components/ui/GoBackButton";
import { CustomerForm } from "../components/customers/CustomerForm";

export const CustomerPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          {id ? "Detalles del proveedor" : "Crear nuevo proveedor"}
        </h3>
        <GoBackButton />
      </div>
      <CustomerForm />
    </>
  );
};
