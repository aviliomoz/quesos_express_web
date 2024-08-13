import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Product } from "../types";
import { useEffect, useState } from "react";
import { handleErrorMessage } from "../utils/errors";
import { GradientLink } from "../components/ui/GradientLink";
import { KardexTable } from "../components/products/KardexTable";
import { GoBackButton } from "../components/ui/GoBackButton";

export const KardexPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const getProduct = async () => {
    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Product>>(`/products/${id}`);

      const {
        data: {
          data: { stock },
        },
      } = await axiosAPI.get<APIResponse<{ stock: number }>>(
        `/products/stock/${id}`
      );

      setProduct({ ...data, stock: stock });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">
          Kardex: <span className="font-normal">{product?.name}</span>
        </h3>
        <GoBackButton />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="border rounded-md px-4 py-1">
            <p className="font-medium">
              Stock inicial:{" "}
              <span className="font-normal">{product?.initialStock}</span>
            </p>
          </div>
          <div className="border rounded-md px-4 py-1">
            <p className="font-medium">
              Stock actual:{" "}
              <span className="font-normal">{product?.stock}</span>
            </p>
          </div>
        </div>
        <GradientLink
          url={`/products/${id}/movements/new`}
          text="Nuevo movimiento"
          icon={Plus}
        />
      </div>
      <KardexTable />
    </>
  );
};
