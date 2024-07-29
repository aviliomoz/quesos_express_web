type Props = {
  titles: string[];
  children: React.ReactNode;
};

export const Table = ({ titles, children }: Props) => {
  return (
    <table className="w-full min-w-[500px]">
      <thead className="bg-gray-100 text-gray-500 text-sm h-8">
        <tr>
          {titles.map((title, i) => (
            <th
              className={`font-medium ${i === 0 && "rounded-l-md"} ${
                i + 1 === titles.length && "rounded-r-md"
              }`}
              key={i}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
