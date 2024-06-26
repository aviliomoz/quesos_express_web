import { ListFilter } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};

export const FilterWidget = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);

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
    <div ref={widgetRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-md px-3 py-1 text-sm flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
      >
        <ListFilter className="w-4" />
        <p>Filtros</p>
      </button>
      {isOpen && (
        <div className="absolute bg-white border rounded-md shadow-sm p-4 right-0 mt-2 w-max text-sm">
          {children}
        </div>
      )}
    </div>
  );
};
