type Props = {
  alignment?: "left" | "center" | "right";
  children: string | JSX.Element;
  indentation?: 0 | 1 | 2 | 3 | 4;
};

export const TableData = ({
  children,
  alignment = "center",
  indentation = 0,
}: Props) => {
  return (
    <td className={`text-${alignment} text-sm pl-${indentation.toString()}`}>
      {children}
    </td>
  );
};
