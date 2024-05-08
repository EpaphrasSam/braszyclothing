export type NavLinkTypes = {
  name: string;
  route: string;
  children?: NavLinkTypes[];
};

export const NavbarLinks: NavLinkTypes[] = [
  {
    name: "Shop",
    route: "/shop",
    children: [
      {
        name: "Men",
        route: "/men",
      },
      {
        name: "Women",
        route: "/women",
      },
    ],
  },
  {
    name: "Gifts",
    route: "/gift",
  },
  {
    name: "New Releases",
    route: "/new-releases",
  },
];
