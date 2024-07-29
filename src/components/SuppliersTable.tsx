import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Supplier } from "../types";
import { handleErrorMessage } from "../utils/errors";
import { Loading } from "./ui/Loading";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { TableBadge } from "./ui/TableBadge";
import { TableOptions } from "./ui/TableOptions";
import { Table } from "./ui/Table";

export const SuppliersTable = () => {
  const [searchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSuppliers = async () => {
    setLoading(true);

    try {
      // Datos de ejemplo
      const exampleSuppliers: Supplier[] = [
        {
          id: "1",
          ruc: "12345678901",
          name: "Don Queso",
          phone: "987654321",
          status: true,
        },
        {
          id: "2",
          ruc: "10987654321",
          name: "La granja",
          phone: "123456789",
          status: true,
        },
        {
          id: "3",
          ruc: "10293847561",
          name: "Cabañita SAC",
          phone: "567891234",
          status: false,
        },
      ];

      const search = searchParams.get("search") || "";

      setSuppliers(
        exampleSuppliers.filter((supplier) =>
          supplier.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, [searchParams]);

  if (loading)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <Table titles={["RUC", "Nombre", "Teléfono", "Estado", "Opciones"]}>
      {suppliers.map((supplier) => (
        <TableRow key={supplier.id}>
          <TableData>{supplier.ruc}</TableData>
          <TableData>{supplier.name}</TableData>
          <TableData>{supplier.phone}</TableData>
          <TableBadge status={supplier.status}>
            {supplier.status ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <p>Aquí van las opciones</p>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
