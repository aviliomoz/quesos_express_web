import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APIResponse, Purchase } from "../../types";
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
import { format } from "date-fns";
import { PurchaseTotalData } from "./PurchaseTotalData";

export const PurchasesTable = () => {
  const [searchParams] = useSearchParams();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPurchases = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";

    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Purchase[]>>(
        `/purchases?search=${search}`
      );

      setPurchases(data);
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
          <TableData>
            {format(purchase.date, "dd/MM/yyyy")}
          </TableData>
          <TableData>{purchase.supplier.name}</TableData>
          <PurchaseTotalData id={purchase.id} />
          <TableBadge status={purchase.status}>
            {purchase.status === "active" ? "Activa" : "Inactiva"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink icon={Edit} url={`/purchases/${purchase.id}`}>
              Editar
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
