import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosAPI } from "../../libs/axios";
import { APIResponse, Product } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { Loading } from "../ui/Loading";
import { TableRow } from "../ui/TableRow";
import { TableData } from "../ui/TableData";
import { TableBadge } from "../ui/TableBadge";
import { TableOptions } from "../ui/TableOptions";
import { Table } from "../ui/Table";
import { TableOptionsLink } from "../ui/TableOptionsLink";
import { ClipboardList, PenBox } from "lucide-react";
import { ProductStockData } from "./ProductStockData";

export const ProductsTable = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async () => {
    setLoading(true);
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page");
    const status = searchParams.get("status");

    let query = `/products?search=${search}`;

    if (page) {
      query += `&page=${page}`;
    }
    if (status) {
      query += `&status=${status}`;
    }

    try {
      const { data } = await axiosAPI.get<APIResponse<Product[]>>(query);

      if (!data.ok) throw new Error("Error al obtener los productos");

      setProducts(data.data);
    } catch (error) {
      toast.error(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  if (loading)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <Table
      titles={["Nombre del producto", "Precio", "Stock", "Estado", "Opciones"]}
    >
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableData alignment="left">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </TableData>
          <TableData>{`S/ ${product.price.toFixed(2)}`}</TableData>
          <ProductStockData id={product.id} />
          <TableBadge status={product.status}>
            {product.status === "active" ? "Activo" : "Inactivo"}
          </TableBadge>
          <TableOptions>
            <TableOptionsLink icon={PenBox} url={`/products/${product.id}`}>
              Editar
            </TableOptionsLink>
            <TableOptionsLink
              icon={ClipboardList}
              url={`/products/${product.id}/kardex`}
            >
              Ver kardex
            </TableOptionsLink>
          </TableOptions>
        </TableRow>
      ))}
    </Table>
  );
};
