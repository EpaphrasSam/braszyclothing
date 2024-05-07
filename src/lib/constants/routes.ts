export type NavLinkTypes = {
  name: string;
  route: string;
  children?: NavLinkTypes[];
};

export const NavbarLinks: NavLinkTypes[] = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Men",
    route: "categories/men",
  },
  {
    name: "Women",
    route: "categories/women",
  },
  // {
  //   name: "Children",
  //   route: "categories/children",
  // },
  // {
  //   name: "Categories",
  //   route: "/categories",
  //   children: [
  //     {
  //       name: "Men",
  //       route: "/men",
  //     },
  //     {
  //       name: "Women",
  //       route: "/women",
  //     },
  //     {
  //       name: "Children",
  //       route: "/children",
  //     },
  //   ],
  // },
  {
    name: "Gift Cards",
    route: "/gift",
  },
  {
    name: "New Releases",
    route: "/new-releases",
  },
  {
    name: "Cart",
    route: "/cart",
  },
];
