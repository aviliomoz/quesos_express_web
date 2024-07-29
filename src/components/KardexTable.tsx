import { useEffect, useState } from "react";
import { Table } from "./ui/Table";
import { Movement } from "../types";
import { TableRow } from "./ui/TableRow";
import { TableData } from "./ui/TableData";

export const KardexTable = () => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const getMovements = async () => {};

  useEffect(() => {
    getMovements();
  }, []);

  return (
    <Table
      titles={[
        "Fecha",
        "Producto",
        "Descripción",
        "Entradas",
        "Salidas",
        "Stock",
      ]}
    >
      {movements.map((movement) => (
        <TableRow key={movement.id}>
          <TableData>{movement.date.toISOString()}</TableData>
          <TableData>{movement.description}</TableData>
          <TableData>
            {movement.concept === "entry" || movement.concept === "purchase"
              ? movement.amount.toString()
              : "-"}
          </TableData>
          <TableData> 
            {movement.concept === "output" || movement.concept === "sale"
              ? movement.amount.toString()
              : "-"}
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};
