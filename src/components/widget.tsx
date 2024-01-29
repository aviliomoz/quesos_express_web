"use client";

import { ChevronDown, Circle, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  title?: string;
  badge?: boolean;
  icon: LucideIcon;
  children: JSX.Element | JSX.Element[];
};

export function Widget(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const clickEvent = (event: MouseEvent) => setIsOpen(false);
    isOpen && document.addEventListener("click", clickEvent);

    return () => {
      document.removeEventListener("click", clickEvent);
    };
  }, [isOpen]);

  if (!props.title)
    return (
      <div className="relative text-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border shadow-sm rounded-md w-8 h-8 min-w-8 flex justify-center items-center relative"
        >
          <props.icon className="w-4 stroke-zinc-700" />
          {props.badge && (
            <Circle className="absolute -top-1 right-2 w-2 stroke-orange-500 fill-orange-500" />
          )}
        </button>
        <div
          className={`absolute top-full mt-2 right-0 p-4 border rounded-md bg-white min-w-max -translate-y-2 opacity-0 transition-all duration-200 ease-in-out invisible ${
            isOpen && "!visible !translate-y-0 opacity-100"
          }`}
        >
          {props.children}
        </div>
      </div>
    );

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-md px-2 py-1 shadow-sm flex items-center gap-2 justify-between text-sm cursor-pointer min-w-max"
      >
        <div className="w-6 h-6 flex justify-center items-center rounded-md bg-zinc-100">
          <props.icon className="w-3 stroke-zinc-700" />
        </div>
        <span>{props.title}</span>
        <ChevronDown
          className={`w-4 ml-2 ease-in-out transition-all ${
            isOpen && "rotate-180 "
          }`}
        />
      </button>
      <div
        className={`absolute border rounded-md p-2 top-full mt-2 right-0 bg-white min-w-max transition-all ease-in-out invisible -translate-y-2 opacity-0 duration-200 ${
          isOpen && "!visible !translate-y-0 !opacity-100"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
