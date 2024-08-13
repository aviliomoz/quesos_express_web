import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APIResponse, Supplier } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { Loading } from "../ui/Loading";
import { TableRow } from "../ui/TableRow";
import { TableData } from "../ui/TableData";
import { TableBadge } from "../ui/TableBadge";
import { TableOptions } from "../ui/TableOptions";
import { Table } from "../ui/Table";
import { axiosAPI } from "../../libs/axios";
import { TableOptionsLink } from "../ui/TableOptionsLink";
import { Edit } from "lucide-react";

export const SuppliersTable = () => {
  const [searchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSuppliers = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";

    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Supplier[]>>(
        `/suppliers?search=${search}`
      );

      setSuppliers(data);
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
            {supplier.status === "active" ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink url={`/suppliers/${supplier.id}`} icon={Edit}>
              Editar
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
