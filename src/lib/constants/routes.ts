export type NavLinkTypes = {
  name: string;
  route: string;
  children?: NavLinkTypes[];
};

export const NavbarLinks: NavLinkTypes[] = [
  // {
  //   name: "Shop",
  //   route: "/shop",
  //   children: [
  //     {
  //       name: "Men",
  //       route: "/men",
  //     },
  //     {
  //       name: "Women",
  //       route: "/women",
  //     },
  //   ],
  // },
  {
    name: "Men",
    route: "/shop/men",
  },
  {
    name: "Women",
    route: "/shop/women",
  },
  {
    name: "Unisex",
    route: "/shop/unisex",
  },
  {
    name: "Gifts",
    route: "/gift",
  },
  {
    name: "Contact",
    route: "/contact",
  },
  {
    name: "About",
    route: "/about",
  },
  // {
  //   name: "New Releases",
  //   route: "/new-releases",
  // },
];
