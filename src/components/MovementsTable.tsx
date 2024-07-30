import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Movement } from "../types";
import { handleErrorMessage } from "../utils/errors";
import { Loading } from "./ui/Loading";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";
import { TableBadge } from "./ui/TableBadge";
import { TableOptions } from "./ui/TableOptions";
import { Table } from "./ui/Table";
import { TableOptionsLink } from "./ui/TableOptionsLink";
import { PenBox } from "lucide-react";

export const MovementsTable = () => {
  const [searchParams] = useSearchParams();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMovements = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page");
    const status = searchParams.get("status");

    let query = `/movements?search=${search}`;

    if (page) {
      query += `&page=${page}`;
    }
    if (status) {
      query += `&status=${status}`;
    }

    try {
      const { data } = await axiosAPI.get<APIResponse<Movement[]>>(query);

      if (!data.ok) throw new Error("Error al obtener los movimientos");

      setMovements(data.data);
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovements();
  }, [searchParams]);

  if (loading)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <Table titles={["Tipo", "Fecha", "Descripción", "Estado", "Opciones"]}>
      {movements.map((movement) => (
        <TableRow key={movement.id}>
          <TableData alignment="left" indentation={4}>
            <Link to={`/movements/${movement.id}`}>{movement.type}</Link>
          </TableData>
          <TableData>{new Date(movement.date).toLocaleDateString()}</TableData>
          <TableData>{movement.description}</TableData>
          <TableBadge status={movement.status}>
            {movement.status === "active" ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink icon={PenBox} url={`/movements/${movement.id}`}>
              Editar
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
