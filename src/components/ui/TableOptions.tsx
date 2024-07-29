import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const TableOptions = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const widgetRef = useRef<HTMLTableCellElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      widgetRef.current &&
      !widgetRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <td className="text-center relative" ref={widgetRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Ellipsis className="w-6 stroke-gray-400 hover:stroke-gray-800" />
      </button>
      {isOpen && (
        <div className="absolute border rounded-md text-sm bg-white z-10 p-2">
          {children}
        </div>
      )}
    </td>
  );
};
