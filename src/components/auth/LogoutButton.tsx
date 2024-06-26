import { LogOut } from "lucide-react";
import { useState } from "react";
import { axiosAPI } from "../../libs/axios";
import { AuthResponseType } from "../../types";
import { handleErrorMessage } from "../../utils/errors";

export const LogoutButton = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axiosAPI.get<AuthResponseType>("/auth/logout");

      location.assign("/");
    } catch (error) {
      return handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="flex gap-3 items-center rounded-md px-3 py-1.5 hover:bg-red-100 text-sm"
    >
      <LogOut className="w-4 rotate-180" />
      <p>{loading ? "Cerrando sesión" : "Cerrar sesión"}</p>
    </button>
  );
};
