import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "./ui/FormInput";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Movement } from "../types";
import { handleErrorMessage } from "../utils/errors";
import toast from "react-hot-toast";
import { FormSelect } from "./ui/FormSelect";
import { FormDateInput } from "./ui/FormDateInput";
import { useAuth } from "../contexts/AuthContext";

export const MovementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [type, setType] = useState<string>("entry");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await Promise.all([
        axiosAPI.post<APIResponse<Movement>>("/movements", {
          type,
          date,
          description,
          status,
          userId: user?.id,
        }),
      ]);
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
      await Promise.all([
        axiosAPI.put<APIResponse<Movement>>(`/movements/${id}`, {
          type,
          date,
          description,
          status,
          userId: user?.id,
        }),
      ]);
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

    setType(data.type);
    setDate(data.date);
    setDescription(data.description || "");
    setStatus(data.status);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
      <FormSelect
        change={(e) => setType(e.target.value)}
        label="Tipo"
        name="type"
        value={type}
      >
        <option value={"entry"}>Entrada</option>
        <option value={"output"}>Salida</option>
      </FormSelect>

      <FormDateInput
        change={(e) => setDate(new Date(e.target.value))}
        label="Fecha"
        name="date"
        value={date}
      />
      <FormInput
        change={(e) => setDescription(e.target.value)}
        label="Descripción"
        name="description"
        type="text"
        value={description}
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
