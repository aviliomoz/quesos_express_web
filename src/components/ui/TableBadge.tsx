import { Status } from "../../types";

type Props = {
  status: Status;
  children: string;
};

export const TableBadge = ({ status, children }: Props) => {
  return (
    <td className="">
      <p
        className={`text-center text-sm rounded-md py-0.5 ${
          status === "active" ? "text-green-500" : "text-red-500"
        }`}
      >
        {children}
      </p>
    </td>
  );
};
