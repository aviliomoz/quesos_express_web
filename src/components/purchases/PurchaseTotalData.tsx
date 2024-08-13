import { useEffect, useState } from "react";
import { axiosAPI } from "../../libs/axios";
import { APIResponse } from "../../types";
import { LoaderCircle } from "lucide-react";

type Props = {
  id: string;
};

export const PurchaseTotalData = ({ id }: Props) => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getTotal = async () => {
    const {
      data: {
        data: { total },
      },
    } = await axiosAPI.get<APIResponse<{ total: number }>>(
      `/purchases/total/${id}`
    );

    setTotal(total);
  };

  useEffect(() => {
    getTotal().finally(() => setLoading(false));
  }, []);

  return (
    <td className={`text-center text-sm flex justify-center items-center h-12`}>
      {loading ? (
        <LoaderCircle className="stroke-gray-400 animate-spin w-4" />
      ) : (
        <p>S/ {total.toFixed(2)}</p>
      )}
    </td>
  );
};
