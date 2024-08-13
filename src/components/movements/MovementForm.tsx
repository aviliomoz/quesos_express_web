import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "../ui/FormInput";
import { axiosAPI } from "../../libs/axios";
import { APIResponse, Movement, Product } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import toast from "react-hot-toast";
import { FormSelect } from "../ui/FormSelect";
import { FormDateInput } from "../ui/FormDateInput";
import { Loading } from "../ui/Loading";

export const MovementForm = () => {
  const navigate = useNavigate();
  const { pid, mid } = useParams();

  const [type, setType] = useState<string>("entry");
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [product, setProduct] = useState<Product>();
  const [amount, setAmount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await axiosAPI.post<APIResponse<Movement>>("/movements", {
        type,
        date,
        description,
        status,
        productId: product?.id,
        amount,
      }),
        toast.success("Movimiento creado correctamente");
      navigate(-1);
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await axiosAPI.put<APIResponse<Movement>>(`/movements/${mid}`, {
        type,
        date,
        description,
        status,
        productId: product?.id,
        amount,
      }),
        toast.success("Movimiento actualizado correctamente");
      navigate(-1);
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mid) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const getProduct = async () => {
    const {
      data: { data: product },
    } = await axiosAPI.get<APIResponse<Product>>(`/products/${pid}`);

    setProduct(product);
  };

  const loadData = async () => {
    const {
      data: { data },
    } = await axiosAPI<APIResponse<Movement>>(`/movements/${mid}`);

    setType(data.type);
    setDate(data.date);
    setDescription(data.description || "");
    setStatus(data.status);
    setAmount(data.amount);
  };

  useEffect(() => {
    getProduct();
    if (mid) loadData();
    setLoading(false);
  }, [mid]);

  if (loading || !product)
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
      <FormDateInput
        change={(e) => setDate(e.target.value)}
        label="Fecha"
        name="date"
        value={date}
      />
      <FormInput
        change={(e) => setDescription(e.target.value)}
        label="Producto"
        name="product"
        type="text"
        value={product.name}
        disabled={true}
      />
      <FormSelect
        change={(e) => setType(e.target.value)}
        label="Tipo"
        name="type"
        value={type}
      >
        <option value={"entry"}>Entrada</option>
        <option value={"output"}>Salida</option>
      </FormSelect>

      <FormInput
        change={(e) => setAmount(parseFloat(e.target.value))}
        label="Cantidad"
        name="amount"
        type="number"
        value={amount}
      />

      <FormInput
        change={(e) => setDescription(e.target.value)}
        label="Descripción"
        name="description"
        type="text"
        value={description}
      />

      {mid && (
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
        {loading ? "Cargando..." : mid ? "Guardar" : "Crear"}
      </button>
    </form>
  );
};
