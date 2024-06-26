import { X } from "lucide-react";

type Props = {
  close: () => void;
  children: React.ReactNode;
};

export function Modal({ close, children }: Props) {
  return (
    <div
      onClick={close}
      className="z-50 fixed top-0 left-0 w-screen h-screen bg-gray-200 bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-6 bg-white rounded-md shadow-sm relative w-full max-w-80`}
      >
        <button onClick={close} className="absolute top-4 right-4">
          <X className="w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
