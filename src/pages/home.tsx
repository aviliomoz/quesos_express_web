import { useEffect, useState } from "react";
import { fetchWithToken } from "../functions/fetch";

export const HomePage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    fetchWithToken("http://localhost:5000/api/restaurants", { method: "GET" })
      .then((res) => res?.json())
      .then(setRestaurants);
  }, []);

  if (restaurants.length === 0) return <></>

  return (
    <ul>
      {restaurants.map((restaurant) => {
        return <li key={restaurant.id}>{restaurant.name}</li>;
      })}
    </ul>
  );
};
