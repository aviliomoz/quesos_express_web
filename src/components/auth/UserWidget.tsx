import { CircleUserRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const UserWidget = () => {
  const { user } = useAuth();

  return (
    <button className="flex items-center gap-3 border rounded-md px-5 py-1.5">
      <CircleUserRound className="w-4" />
      <p className="text-sm">{user?.name}</p>
    </button>
  );
};
