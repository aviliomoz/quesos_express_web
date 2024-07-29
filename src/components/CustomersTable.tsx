import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Customer } from "../types";
import { handleErrorMessage } from "../utils/errors";
import { Loading } from "./ui/Loading";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { TableBadge } from "./ui/TableBadge";
import { TableOptions } from "./ui/TableOptions";
import { Table } from "./ui/Table";

export const CustomersTable = () => {
  const [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCustomers = async () => {
    setLoading(true);

    try {
      // Datos de ejemplo
      const exampleCustomers: Customer[] = [
        {
          id: "1",
          dni: "12345678",
          name: "Alvaro",
          lastname: "Ortiz",
          phone: "987654321",
          address: "Piura Av. 852",
          status: true,
        },
        {
          id: "2",
          dni: "87654321",
          name: "Arnold",
          lastname: "Macuri",
          phone: "123456789",
          address: "Lima Av. 45",
          status: true,
        },
        {
          id: "3",
          dni: "11223344",
          name: "Pier",
          lastname: "Rojas",
          phone: "",
          address: "",
          status: false,
        },
      ];

      const search = searchParams.get("search") || "";

      setCustomers(
        exampleCustomers.filter((customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
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
        "DNI",
        "Nombre",
        "Apellido",
        "Teléfono",
        "Dirección",
        "Estado",
        "Opciones",
      ]}
    >
      {customers.map((customer) => (
        <TableRow key={customer.id}>
          <TableData>{customer.dni}</TableData>
          <TableData>{customer.name}</TableData>
          <TableData>{customer.lastname}</TableData>
          <TableData>{customer.phone || " - "}</TableData>
          <TableData>{customer.address || " - "}</TableData>
          <TableBadge status={customer.status}>
            {customer.status ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <p>Aquí van las opciones</p>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
