import { getRestaurantById } from "@/functions/restaurants";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
};

export async function RestaurantCard({ id }: Props) {
  const restaurant = await getRestaurantById(id);

  return (
    <Link
      href={`/dashboard/restaurants/${id}/home`}
      className="hover:bg-gray-50 transition-all ease-in-out duration-200 rounded-md border border-gray-100 p-4 text-sm group"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{restaurant?.name}</h4>
        <ChevronRight className="w-4 stroke-gray-400 mr-1 group-hover:mr-0 transition-all ease-in-out duration-200 group-hover:stroke-gray-600" />
      </div>
    </Link>
  );
}
