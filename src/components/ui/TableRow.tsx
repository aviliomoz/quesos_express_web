type Props = {
  children: React.ReactNode;
};

export const TableRow = ({ children }: Props) => {
  return <tr className="hover:bg-gray-50 h-12 border-b border-gray-100">{children}</tr>;
};
