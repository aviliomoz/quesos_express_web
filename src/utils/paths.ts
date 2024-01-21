import {
  Blend,
  Blocks,
  BookMarked,
  Calculator,
  Carrot,
  Grid2X2,
  LucideIcon,
  Salad,
  Settings,
  Store,
} from "lucide-react";

type Path = {
  url: string;
  name: string;
  icon: LucideIcon;
};

export type PathGroup = {
  title: string;
  paths: Path[];
};

export const getPaths = (restaurant_id?: string): PathGroup[] => {
  if (restaurant_id)
    return [
      {
        title: "MENU",
        paths: [
          {
            name: "Home",
            url: `/dashboard/restaurants/${restaurant_id}/home`,
            icon: Store,
          },
        ],
      },
      {
        title: "ITEMS",
        paths: [
          {
            name: "Supplies",
            url: `/dashboard/restaurants/${restaurant_id}/supplies`,
            icon: Carrot,
          },
          {
            name: "Products",
            url: `/dashboard/restaurants/${restaurant_id}/products`,
            icon: Salad,
          },
          {
            name: "Subproducts",
            url: `/dashboard/restaurants/${restaurant_id}/subproducts`,
            icon: Blocks,
          },
          {
            name: "Combos",
            url: `/dashboard/restaurants/${restaurant_id}/combos`,
            icon: Blend,
          },
        ],
      },
      {
        title: "TOOLS",
        paths: [
          {
            name: "Matrix",
            url: `/dashboard/restaurants/${restaurant_id}/tools/matrix`,
            icon: Grid2X2,
          },
          {
            name: "Calculator",
            url: `/dashboard/restaurants/${restaurant_id}/tools/calculator`,
            icon: Calculator,
          },
          {
            name: "Recipe book",
            url: `/dashboard/restaurants/${restaurant_id}/tools/recipe-book`,
            icon: BookMarked,
          },
        ],
      },
    ];

  return [
    {
      title: "MENU",
      paths: [
        { name: "Restaurants", url: "/dashboard/restaurants", icon: Store },
      ],
    },
  ];
};
