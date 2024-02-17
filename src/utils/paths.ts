import {
  Blend,
  Blocks,
  BookMarked,
  Calculator,
  Carrot,
  CreditCard,
  Grid2X2,
  LucideIcon,
  Salad,
  Settings,
  Store,
  Users,
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
            url: `/restaurants/${restaurant_id}`,
            icon: Store,
          },
          {
            name: "Supplies",
            url: `/restaurants/${restaurant_id}/supplies`,
            icon: Carrot,
          },
          {
            name: "Products",
            url: `/restaurants/${restaurant_id}/products`,
            icon: Salad,
          },
          {
            name: "Subproducts",
            url: `/restaurants/${restaurant_id}/subproducts`,
            icon: Blocks,
          },
          {
            name: "Combos",
            url: `/restaurants/${restaurant_id}/combos`,
            icon: Blend,
          },
        ],
      },
      {
        title: "TOOLS",
        paths: [
          {
            name: "Matrix",
            url: `/restaurants/${restaurant_id}/tools/matrix`,
            icon: Grid2X2,
          },
          {
            name: "Calculator",
            url: `/restaurants/${restaurant_id}/tools/calculator`,
            icon: Calculator,
          },
          {
            name: "Recipe book",
            url: `/restaurants/${restaurant_id}/tools/recipe-book`,
            icon: BookMarked,
          },
        ],
      },
      {
        title: "OPTIONS",
        paths: [
          {
            name: "Team",
            url: `/restaurants/${restaurant_id}/team`,
            icon: Users,
          },
          {
            name: "Payments",
            url: `/restaurants/${restaurant_id}/payments`,
            icon: CreditCard,
          },
          {
            name: "Settings",
            url: `/restaurants/${restaurant_id}/settings/restaurant`,
            icon: Settings,
          },
        ],
      },
    ];

  return [
    {
      title: "MENU",
      paths: [
        { name: "Restaurants", url: "/home", icon: Store },
      ],
    },
    {
      title: "OPTIONS",
      paths: [
        {
          name: "Settings",
          url: `/settings/user`,
          icon: Settings,
        },
      ],
    },
  ];
};
