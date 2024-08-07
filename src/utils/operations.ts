export const getOperationName = (
  type: "entry" | "output" | "sale" | "purchase"
) => {
  if (type === "entry") return "Movimiento de entrada";
  if (type === "output") return "Movimiento de salida";
  if (type === "sale") return "Salida por venta";
  if (type === "purchase") return "Entrada por compra";

  return "Operación no identificada";
};
