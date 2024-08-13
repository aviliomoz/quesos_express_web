import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "../ui/FormInput";
import { axiosAPI } from "../../libs/axios";
import { APIResponse, Product } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { FormSelect } from "../ui/FormSelect";
import toast from "react-hot-toast";

export const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [initialStock, setInitialStock] = useState<number>(0);
  const [status, setStatus] = useState<string>("active");

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await axiosAPI.post<APIResponse<Product>>("/products", {
        name,
        price,
        initialStock,
        status,
      });
      toast.success("Producto creado correctamente");
      navigate("/products");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await axiosAPI.put<APIResponse<Product>>(`/products/${id}`, {
        name,
        price,
        initialStock,
        status,
      });
      toast.success("Producto actualizado correctamente");
      navigate("/products");
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
    } = await axiosAPI<APIResponse<Product>>(`/products/${id}`);

    setName(data.name);
    setPrice(data.price);
    setInitialStock(data.initialStock);
    setStatus(data.status);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
      <FormInput
        change={(e) => setName(e.target.value)}
        label="Nombre"
        name="name"
        type="text"
        value={name}
      />
      <FormInput
        change={(e) => setPrice(parseFloat(e.target.value))}
        label="Precio"
        name="price"
        type="number"
        value={price}
      />
      <FormInput
        change={(e) => setInitialStock(parseFloat(e.target.value))}
        label="Stock inicial"
        name="initial_stock"
        type="number"
        value={initialStock}
      />
      {id && (
        <FormSelect
          change={(e) => setStatus(e.target.value)}
          label="Estado"
          name="status"
          value={status}
        >
          <option value={"active"}>Activo</option>
          <option value={"inactive"}>Inactivo</option>
        </FormSelect>
      )}
      <button
        className="bg-dark-gradient text-white py-1.5 rounded-md mt-4 text-sm"
        type="submit"
      >
        {loading ? "Cargando..." : id ? "Guardar" : "Crear"}
      </button>
    </form>
  );
};
