import { RestaurantCard } from "@/components/restaurant-card";
import { getUserRestaurantIds } from "@/functions/restaurants";
import Link from "next/link";

export default async function RestaurantsPage() {
  const restaurants = await getUserRestaurantIds();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Restaurants</h3>
        <div className="flex items-center gap-4">
          {/* Widgets | Filters */}
          <Link
            href="/dashboard/restaurants/new"
            className="bg-orange-500 text-white text-sm px-4 py-1 rounded-md hover:bg-orange-400 border border-orange-200 transition-all"
          >
            New restaurant
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.id} id={restaurant.restaurant_id} />
          );
        })}
      </div>
    </>
  );
}
