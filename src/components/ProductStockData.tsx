import { useEffect, useState } from "react";
import { axiosAPI } from "../libs/axios";
import { APIResponse } from "../types";
import { LoaderCircle } from "lucide-react";

type Props = {
  id: string;
};

export const ProductStockData = ({ id }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getStock = async () => {
    const {
      data: {
        data: { stock },
      },
    } = await axiosAPI<APIResponse<{ stock: number }>>(`/products/stock/${id}`);

    setStock(stock);
  };

  useEffect(() => {
    getStock().finally(() => setLoading(false));
  }, []);

  return (
    <td className={`text-center text-sm flex justify-center items-center h-12`}>
      {loading ? (
        <LoaderCircle className="stroke-gray-400 animate-spin w-4" />
      ) : (
        stock
      )}
    </td>
  );
};
