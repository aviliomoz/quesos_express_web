import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { movementSchema } from "../schemas/movement";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "./ui/FormInput";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Movement } from "../types";
import { handleErrorMessage } from "../utils/errors";
import toast from "react-hot-toast";
import { FormStatusSelect } from "./ui/FormStatusSelect";
import { FormDateInput } from "./ui/FormDateInput";

const initialFormData = {
  type: "",
  date: new Date().toISOString(),
  description: "",
  status: "active",
};

export const MovementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, setData, handleChange } = useForm(
    initialFormData,
    movementSchema
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await axiosAPI.post<APIResponse<Movement>>("/movements", data);
      toast.success("Movimiento creado correctamente");
      navigate("/movements");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await axiosAPI.put<APIResponse<Movement>>(`/movements/${id}`, data);
      toast.success("Movimiento actualizado correctamente");
      navigate("/movements");
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
    } = await axiosAPI<APIResponse<Movement>>(`/movements/${id}`);

    setData({
      type: data.type,
      date: new Date(data.date).toISOString(),
      description: data.description,
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
        label="Tipo"
        name="type"
        type="text"
        value={data.type}
      />
      <FormDateInput
        change={handleChange}
        label="Fecha"
        name="date"
        value={data.date}
      />
      <FormInput
        change={handleChange}
        label="Descripción"
        name="description"
        type="text"
        value={data.description}
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
