import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APIResponse, Sale } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { Loading } from "../ui/Loading";
import { TableRow } from "../ui/TableRow";
import { TableData } from "../ui/TableData";
import { TableBadge } from "../ui/TableBadge";
import { TableOptions } from "../ui/TableOptions";
import { Table } from "../ui/Table";
import { axiosAPI } from "../../libs/axios";
import { SaleTotalData } from "./SaleTotalData";
import { TableOptionsLink } from "../ui/TableOptionsLink";
import { Edit } from "lucide-react";
import { format } from "date-fns";

export const SalesTable = () => {
  const [searchParams] = useSearchParams();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSales = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";

    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Sale[]>>(`/sales?search=${search}`);

      setSales(data);
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
          <TableData>{format(sale.date, "dd/MM/yyyy")}</TableData>
          <TableData>{sale.customer.name}</TableData>
          <TableBadge status={sale.delivered}>
            {sale.delivered ? "Sí" : "No"}
          </TableBadge>
          <TableBadge status={sale.paid}>{sale.paid ? "Sí" : "No"}</TableBadge>
          <SaleTotalData id={sale.id} />
          <TableBadge status={sale.status}>
            {sale.status === "pending"
              ? "Pendiente"
              : sale.status === "completed"
              ? "Completada"
              : "Anulada"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink icon={Edit} url={`/sales/${sale.id}`}>
              Editar
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
