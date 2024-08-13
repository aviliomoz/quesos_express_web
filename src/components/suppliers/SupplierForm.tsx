import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { FormInput } from "../ui/FormInput";
import { axiosAPI } from "../../libs/axios";
import { APIResponse, Supplier } from "../../types";
import { handleErrorMessage } from "../../utils/errors";
import { FormSelect } from "../ui/FormSelect";
import toast from "react-hot-toast";

export const SupplierForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [ruc, setRuc] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await axiosAPI.post<APIResponse<Supplier>>("/suppliers", {
        name,
        ruc,
        phone,
        status,
      });
      toast.success("Proveedor creado correctamente");
      navigate("/suppliers");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await axiosAPI.put<APIResponse<Supplier>>(`/suppliers/${id}`, {
        name,
        ruc,
        phone,
        status,
      });
      toast.success("Proveedor actualizado correctamente");
      navigate("/suppliers");
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
    } = await axiosAPI<APIResponse<Supplier>>(`/suppliers/${id}`);

    console.log(data)

    setName(data.name);
    setRuc(data.ruc);
    setPhone(data.phone);
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
        change={(e) => setRuc(e.target.value)}
        label="RUC"
        name="ruc"
        type="text"
        value={ruc}
      />
      <FormInput
        change={(e) => setPhone(e.target.value)}
        label="Teléfono"
        name="phone"
        type="text"
        value={phone}
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
