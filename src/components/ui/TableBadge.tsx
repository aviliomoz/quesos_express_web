import { SaleStatus, Status } from "../../types";

type Props = {
  status: Status | SaleStatus | boolean;
  children: string;
};

export const TableBadge = ({ status, children }: Props) => {
  return (
    <td className="">
      <p
        className={`text-center text-sm rounded-md py-0.5 ${
          status === "active" || status === true || status === "completed"
            ? "text-green-500"
            : status === "pending"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {children}
      </p>
    </td>
  );
};
