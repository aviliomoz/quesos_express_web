import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APIResponse, Customer } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { Loading } from "../ui/Loading";
import { TableRow } from "../ui/TableRow";
import { TableData } from "../ui/TableData";
import { TableBadge } from "../ui/TableBadge";
import { TableOptions } from "../ui/TableOptions";
import { Table } from "../ui/Table";
import { TableOptionsLink } from "../ui/TableOptionsLink";
import { Edit } from "lucide-react";
import { axiosAPI } from "../../libs/axios";

export const CustomersTable = () => {
  const [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCustomers = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";

    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Customer[]>>(
        `/customers?search=${search}`
      );

      setCustomers(data);
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
      titles={["DNI", "Nombre", "Teléfono", "Dirección", "Estado", "Opciones"]}
    >
      {customers.map((customer) => (
        <TableRow key={customer.id}>
          <TableData>{customer.dni}</TableData>
          <TableData>{customer.name}</TableData>
          <TableData>{customer.phone || " - "}</TableData>
          <TableData>{customer.address || " - "}</TableData>
          <TableBadge status={customer.status}>
            {customer.status === "active" ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink url={`/customers/${customer.id}`} icon={Edit}>
              Editar
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
