import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sale } from "../types";
import { handleErrorMessage } from "../utils/errors";
import { Loading } from "./ui/Loading";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { TableBadge } from "./ui/TableBadge";
import { TableOptions } from "./ui/TableOptions";
import { Table } from "./ui/Table";

export const SalesTable = () => {
  const [searchParams] = useSearchParams();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSales = async () => {
    setLoading(true);

    try {
      // Datos de ejemplo
      const exampleSales: Sale[] = [
        {
          id: "1",
          customer_id: "Arnold Macuri",
          orderDate: "2024-07-01T12:00:00Z",
          deliveryDate: "2024-07-02T12:00:00Z",
          paymentDate: "2024-07-03T12:00:00Z",
          delivered: true,
          paid: true,
          total: 100.00,
          user_id: "user123",
          status: true
        },
        {
          id: "2",
          customer_id: "Alvaro Ortiz",
          orderDate: "2024-06-25T12:00:00Z",
          deliveryDate: "2024-06-26T12:00:00Z",
          paymentDate: "2024-06-27T12:00:00Z",
          delivered: true,
          paid: false,
          total: 150.50,
          user_id: "user124",
          status: true
        },
        {
          id: "3",
          customer_id: "Pier Rojas",
          orderDate: "2024-06-20T12:00:00Z",
          deliveryDate: "2024-06-21T12:00:00Z",
          paymentDate: "2024-06-22T12:00:00Z",
          delivered: false,
          paid: false,
          total: 200.75,
          user_id: "user125",
          status: false
        }
      ];

      const search = searchParams.get("search") || "";

      setSales(
        exampleSales.filter((sale) =>
          sale.customer_id.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSales();
  }, [searchParams]);

  if (loading)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <Table
      titles={[
        "Fecha",
        "Cliente",
        "Entregado",
        "Pagado",
        "Total",
        "Estado",
        "Opciones",
      ]}
    >
      {sales.map((sale) => (
        <TableRow key={sale.id}>
          <TableData>{new Date(sale.orderDate).toLocaleDateString()}</TableData>
          <TableData alignment="left">{sale.customer_id}</TableData>
          <TableBadge status={sale.delivered}>
            {sale.delivered ? "Sí" : "No"}
          </TableBadge>
          <TableBadge status={sale.paid}>{sale.paid ? "Sí" : "No"}</TableBadge>
          <TableData>{`S/ ${sale.total.toFixed(2)}`}</TableData>
          <TableBadge status={sale.status}>
            {sale.status ? "Vendida" : "Anulada"}
          </TableBadge>
          <TableOptions>
            <p>Aquí van las opciones</p>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
