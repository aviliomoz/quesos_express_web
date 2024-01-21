"use client";

import { PathGroup, getPaths } from "@/utils/paths";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RestaurantWidget } from "./restaurant-widget";

export function Navigation() {
  const pathname = usePathname();
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const [paths, setPaths] = useState<PathGroup[]>([]);

  useEffect(() => {
    setPaths(getPaths(restaurant_id));
  }, [restaurant_id]);

  return (
    <nav>
      {restaurant_id && <RestaurantWidget id={restaurant_id} />}
      {paths.map((group) => {
        return (
          <div key={group.title} className="mt-4">
            <h4 className="text-xs font-medium text-opacity-40 text-black mb-2">
              {group.title}
            </h4>
            {group.paths.map((path) => {
              const active = pathname.startsWith(path.url);

              return (
                <Link
                  key={path.name}
                  href={path.url}
                  className={`flex items-center gap-2 rounded-md px-3 py-1 text-sm ${
                    active ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-zinc-800"
                  }`}
                >
                  <path.icon
                    className={`w-4 ${
                      active ? "stroke-white" : "stroke-zinc-600"
                    }`}
                  />
                  <span>{path.name}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
