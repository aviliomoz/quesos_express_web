import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { axiosAPI } from "../libs/axios";
import { APIResponse, Product } from "../types";
import { useEffect, useState } from "react";
import { handleErrorMessage } from "../utils/errors";
import { GradientLink } from "../components/ui/GradientLink";

export const KardexPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const getProduct = async () => {
    try {
      const {
        data: { data },
      } = await axiosAPI.get<APIResponse<Product>>(`/products/${id}`);

      setProduct(data);
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
        <Link to={"/products"} className="flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4" />
          Volver
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="border rounded-md px-4 py-1">
            <p className="font-medium">
              Stock de apertura: <span className="font-normal">0</span>
            </p>
          </div>
          <div className="border rounded-md px-4 py-1">
            <p className="font-medium">
              Stock actual: <span className="font-normal">0</span>
            </p>
          </div>
        </div>
        <GradientLink
          url="/products/movements/new"
          text="Nuevo movimiento"
          icon={Plus}
        />
      </div>
    </>
  );
};
