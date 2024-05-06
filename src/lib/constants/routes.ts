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
    name: "Collections",
    route: "/collections",
  },
  {
    name: "Clothing",
    route: "/clothing",
    children: [
      {
        name: "T-Shirts",
        route: "/t-shirt",
      },
      {
        name: "Hoodies",
        route: "/hoodie",
      },
      {
        name: "Tracksuits",
        route: "/tracksuit",
      },
    ],
  },
  {
    name: "Footwear",
    route: "/footwear",
    children: [
      {
        name: "Sneakers",
        route: "/sneakers",
      },
      {
        name: "Boots",
        route: "/boots",
      },
    ],
  },
  {
    name: "Contact",
    route: "/contact",
  },
];
