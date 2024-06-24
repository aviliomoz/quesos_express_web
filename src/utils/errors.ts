import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message: string = error.response?.data.error;
    return toast.error(message);
  } else if (error instanceof Error) {
    return toast.error(error.message);
  } else {
    return toast.error("Ha ocurrido un error");
  }
};
