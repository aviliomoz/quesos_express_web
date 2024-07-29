import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { productSchema } from "../schemas/product";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "./ui/FormInput";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Product } from "../types";
import { handleErrorMessage } from "../utils/errors";
import toast from "react-hot-toast";
import { FormStatusSelect } from "./ui/FormStatusSelect";

const initialFormData = {
  name: "",
  price: 0,
  initial_stock: 0,
  status: "active",
};

export const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, setData, handleChange } = useForm(
    initialFormData,
    productSchema
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await axiosAPI.post<APIResponse<Product>>("/products", data);
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
      await axiosAPI.put<APIResponse<Product>>(`/products/${id}`, data);
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

    setData({
      name: data.name,
      price: data.price,
      initial_stock: data.initial_stock,
      status: data.status,
    });
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
      <FormInput
        change={handleChange}
        label="Nombre"
        name="name"
        type="text"
        value={data.name}
      />
      <FormInput
        change={handleChange}
        label="Precio"
        name="price"
        type="number"
        value={data.price}
      />
      <FormInput
        change={handleChange}
        label="Stock inicial"
        name="initial_stock"
        type="number"
        value={data.initial_stock}
      />
      <FormStatusSelect
        change={handleChange}
        label="Estado"
        name="status"
        value={data.status}
      />
      <button
        className="bg-dark-gradient text-white py-1.5 rounded-md mt-4 text-sm"
        type="submit"
      >
        {loading ? "Cargando..." : id ? "Guardar" : "Crear"}
      </button>
    </form>
  );
};
