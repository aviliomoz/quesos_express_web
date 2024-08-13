type Props = {
  alignment?: "left" | "center";
  children: string | JSX.Element;
};

export const TableData = ({ children, alignment = "center" }: Props) => {
  return (
    <td
      className={`text-${alignment} text-sm ${alignment === "left" && "pl-4"} truncate max-w-40`}
    >
      {children}
    </td>
  );
};
