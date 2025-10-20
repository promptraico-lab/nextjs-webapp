import { LayoutGrid, DollarSign, User } from "lucide-react";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/pricing",
          label: "Pricing",
          icon: DollarSign,
          submenus: [],
        },
      ],
    },
  ];
}
