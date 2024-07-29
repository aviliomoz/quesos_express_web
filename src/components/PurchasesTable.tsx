import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Purchase } from "../types";
import { handleErrorMessage } from "../utils/errors";
import { Loading } from "./ui/Loading";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { TableBadge } from "./ui/TableBadge";
import { TableOptions } from "./ui/TableOptions";
import { Table } from "./ui/Table";

export const PurchasesTable = () => {
  const [searchParams] = useSearchParams();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPurchases = async () => {
    setLoading(true);

    try {
      // Datos de ejemplo
      const examplePurchases: Purchase[] = [
        {
          id: "1",
          timestamp: "2024-07-01T12:00:00Z",
          user_id: "user123",
          supplier_id: "Don Queso",
          total: 500.00,
          status: true
        },
        {
          id: "2",
          timestamp: "2024-06-25T12:00:00Z",
          user_id: "user124",
          supplier_id: "La granja",
          total: 750.50,
          status: true
        },
        {
          id: "3",
          timestamp: "2024-06-20T12:00:00Z",
          user_id: "user125",
          supplier_id: "Cabañita SAC",
          total: 300.75,
          status: false
        }
      ];

      const search = searchParams.get("search") || "";

      setPurchases(
        examplePurchases.filter((purchase) =>
          purchase.user_id.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPurchases();
  }, [searchParams]);

  if (loading)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <Table titles={["Fecha", "Proveedor", "Total", "Estado", "Opciones"]}>
      {purchases.map((purchase) => (
        <TableRow key={purchase.id}>
          <TableData>{new Date(purchase.timestamp).toLocaleDateString()}</TableData>
          <TableData>{purchase.supplier_id}</TableData>
          <TableData>{`S/ ${purchase.total.toFixed(2)}`}</TableData>
          <TableBadge status={purchase.status}>
            {purchase.status ? "Realizada" : "Anulada"}
          </TableBadge>
          <TableOptions>
            <p>Aquí van las opciones</p>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};

