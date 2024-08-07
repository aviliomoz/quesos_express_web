import { useEffect, useState } from "react";
import { APIResponse, Kardex } from "../types";
import { useParams } from "react-router-dom";
import { handleErrorMessage } from "../utils/errors";
import { axiosAPI } from "../libs/axios";
import { Loading } from "./ui/Loading";
import { Table } from "./ui/Table";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { format } from "date-fns";
import { getOperationName } from "../utils/operations";

export const KardexTable = () => {
  const { id } = useParams();
  const [kardex, setKardex] = useState<Kardex>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getKardex = async () => {
    setLoading(true);

    try {
      const {
        data: { data: kardex },
      } = await axiosAPI.get<APIResponse<Kardex>>(`/products/kardex/${id}`);

      setKardex(kardex);
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKardex();
  }, []);

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
        "Tipo de operación",
        "Descripción",
        "Entrada",
        "Salida",
        "Stock",
      ]}
    >
      {kardex.map((record) => (
        <TableRow key={record.id}>
          <TableData>{format(record.date, "dd/MM/yyyy")}</TableData>
          <TableData>{getOperationName(record.type)}</TableData>
          <TableData>{record.description}</TableData>
          <TableData>
            {record.entry === 0 ? "-" : record.entry.toString()}
          </TableData>
          <TableData>
            {record.output === 0 ? "-" : record.output.toString()}
          </TableData>
          <TableData>{record.balance.toString()}</TableData>
        </TableRow>
      ))}
    </Table>
  );
};
