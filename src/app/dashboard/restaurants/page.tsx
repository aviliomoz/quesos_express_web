import { getRestaurants } from "@/functions/restaurants";

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants()

  return <h1>Restaurants Page {JSON.stringify(restaurants)}</h1>;
}
