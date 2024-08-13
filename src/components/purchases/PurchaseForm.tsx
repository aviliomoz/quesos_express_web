import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosAPI } from "../../libs/axios";
import {
  APIResponse,
  Product,
  Purchase,
  PurchaseDetail,
  Supplier,
} from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { FormSelect } from "../ui/FormSelect";
import toast from "react-hot-toast";
import { FormDateInput } from "../ui/FormDateInput";
import { Table } from "../ui/Table";
import { TableRow } from "../ui/TableRow";
import { TableData } from "../ui/TableData";
import { Trash } from "lucide-react";
import { FormInput } from "../ui/FormInput";

export const PurchaseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [date, setDate] = useState<string>(new Date().toISOString());
  const [details, setDetails] = useState<PurchaseDetail[]>([]);
  const [status, setStatus] = useState<string>("active");

  const [productSearch, setProductSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const [supplier, setSupplier] = useState<Supplier>();
  const [supplierSearch, setSupplierSearch] = useState<string>("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      const {
        data: { data: purchase },
      } = await axiosAPI.post<APIResponse<Purchase>>("/purchases", {
        date: new Date(date).toISOString(),
        supplierId: supplier?.id,
        status,
      });

      await axiosAPI.post<APIResponse<PurchaseDetail[]>>(
        `/purchases/details/${purchase.id}`,
        details.map((detail) => ({
          productId: detail.product.id,
          amount: detail.amount,
          price: detail.price,
          discount: detail.discount,
        }))
      );

      toast.success("Compra registrada correctamente");
      navigate("/purchases");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const {
        data: { data: purchase },
      } = await axiosAPI.put<APIResponse<Purchase>>(`/purchases/${id}`, {
        date: new Date(date).toISOString(),
        supplierId: supplier?.id,
        status,
      });

      await axiosAPI.put<APIResponse<PurchaseDetail[]>>(
        `/purchases/details/${purchase.id}`,
        details.map((detail) => ({
          productId: detail.product.id,
          amount: detail.amount,
          price: detail.price,
          discount: detail.discount,
        }))
      );
      toast.success("Compra actualizada correctamente");
      navigate("/purchases");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const loadData = async () => {
    const {
      data: { data },
    } = await axiosAPI<APIResponse<Purchase>>(`/purchases/${id}`);

    const {
      data: { data: supplier },
    } = await axiosAPI.get<APIResponse<Supplier>>(
      `/suppliers/${data.supplier.id}`
    );

    const {
      data: { data: details },
    } = await axiosAPI.get<APIResponse<PurchaseDetail[]>>(
      `/purchases/details/${data.id}`
    );

    setDate(data.date);
    setStatus(data.status);
    setSupplier(supplier);
    setSupplierSearch(supplier.name);
    setDetails(details);
  };

  const updateDetailAmount = (detailId: string, amount: number) => {
    setDetails(
      details.map((detail) =>
        detail.id === detailId ? { ...detail, amount } : detail
      )
    );
  };

  const updateDetailPrice = (detailId: string, price: number) => {
    setDetails(
      details.map((detail) =>
        detail.id === detailId ? { ...detail, price } : detail
      )
    );
  };

  const updateDetailDiscount = (detailId: string, discount: number) => {
    setDetails(
      details.map((detail) =>
        detail.id === detailId ? { ...detail, discount } : detail
      )
    );
  };

  const deleteDetail = (detailId: string) => {
    setDetails(details.filter((detail) => detail.id !== detailId));
  };

  const searchProducts = async (e: ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);

    if (e.target.value === "") {
      setProducts([]);
      return;
    }

    const {
      data: { data },
    } = await axiosAPI.get<APIResponse<Product[]>>(
      `/products?search=${e.target.value}&limit=5`
    );

    setProducts(data);
  };

  const selectProduct = (product: Product) => {
    setProductSearch("");
    setProducts([]);
    setDetails([
      ...details,
      {
        amount: 1,
        discount: 0,
        price: 0,
        purchaseId: id || "",
        id: Math.random().toFixed(10),
        product: { id: product.id, name: product.name, status: product.status },
      },
    ]);
  };

  const searchSuppliers = async (e: ChangeEvent<HTMLInputElement>) => {
    setSupplierSearch(e.target.value);

    if (e.target.value === "") {
      setSuppliers([]);
      return;
    }

    const {
      data: { data },
    } = await axiosAPI.get<APIResponse<Supplier[]>>(
      `/suppliers?search=${e.target.value}&limit=5`
    );

    setSuppliers(data);
  };

  const selectSupplier = (supplier: Supplier) => {
    setSupplierSearch(supplier.name);
    setSuppliers([]);
    setSupplier(supplier);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="gap-6 grid grid-cols-12">
      <div className="col-span-4">
        <FormDateInput
          change={(e) => setDate(e.target.value)}
          label="Fecha"
          name="date"
          value={date}
        />
        {/* <FormSelect ></FormSelect> */}
        {id && (
          <FormSelect
            change={(e) => setStatus(e.target.value)}
            label="Estado"
            name="status"
            value={status}
          >
            <option value={"active"}>Activa</option>
            <option value={"inactive"}>Inactiva</option>
          </FormSelect>
        )}
        <FormInput
          type="text"
          label="Proveedor"
          name="supplier"
          value={supplierSearch}
          change={searchSuppliers}
        >
          {suppliers.length > 0 && (
            <ul>
              {suppliers.map((supplier) => (
                <button
                  onClick={() => selectSupplier(supplier)}
                  key={supplier.id}
                >
                  {supplier.name}
                </button>
              ))}
            </ul>
          )}
        </FormInput>
        <button
          className="bg-dark-gradient text-white py-1.5 rounded-md mt-4 text-sm w-full"
          type="submit"
        >
          {loading ? "Cargando..." : id ? "Guardar" : "Crear"}
        </button>
      </div>

      <div className="col-span-8">
        <label className="relative text-sm flex items-center gap-3 mb-4">
          <span>Agregar producto:</span>
          <input
            type="text"
            placeholder="Buscar..."
            className="outline-none border rounded-md px-3 py-1 w-96"
            value={productSearch}
            onChange={searchProducts}
          />
          {products.length > 0 && (
            <ul className="absolute bg-white border shadow-sm rounded-md p-2 top-full mt-2 flex flex-col gap-1 w-72 left-36 items-start">
              {products.map((product) => (
                <button
                  onClick={() => selectProduct(product)}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100 w-full text-left rounded-md"
                >
                  {product.name}
                </button>
              ))}
            </ul>
          )}
        </label>
        <Table
          titles={[
            "Producto",
            "Cantidad",
            "Precio",
            "Descuento",
            "Total",
            "Opciones",
          ]}
        >
          {details.map((detail) => (
            <TableRow key={detail.id}>
              <TableData alignment="left">{detail.product.name}</TableData>
              <TableData>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={detail.amount}
                  className="w-16 text-center outline-none bg-transparent"
                  onChange={(e) =>
                    updateDetailAmount(detail.id, parseFloat(e.target.value))
                  }
                />
              </TableData>
              <TableData>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={detail.price.toFixed(2)}
                  className="w-16 text-center outline-none bg-transparent"
                  onChange={(e) =>
                    updateDetailPrice(detail.id, parseFloat(e.target.value))
                  }
                />
              </TableData>
              <TableData>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={detail.discount.toFixed(2)}
                  className="w-16 text-center outline-none bg-transparent"
                  onChange={(e) =>
                    updateDetailDiscount(detail.id, parseFloat(e.target.value))
                  }
                />
              </TableData>
              <TableData>
                {(detail.amount * detail.price - detail.discount).toFixed(2)}
              </TableData>
              <TableData>
                <button onClick={() => deleteDetail(detail.id)}>
                  <Trash className="w-4 stroke-gray-300 hover:stroke-gray-700" />
                </button>
              </TableData>
            </TableRow>
          ))}
        </Table>
        {details.length > 0 && (
          <div className="flex w-full justify-end mt-4">
            <p className="font-semibold">
              Total: S/{" "}
              <span>
                {details.reduce(
                  (total, current) =>
                    total + (current.amount * current.price - current.discount),
                  0
                )}
              </span>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
