import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaUserCog,
  FaUserFriends,
} from "react-icons/fa";
import { MdDashboard, MdShoppingCart, MdStore } from "react-icons/md";

export type NavLinkTypes = {
  name: string;
  route: string;
  children?: NavLinkTypes[];
};

export const NavbarLinks: NavLinkTypes[] = [
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
    name: "Contact",
    route: "/contact",
  },
  {
    name: "About",
    route: "/about",
  },
];

export const adminSidebarLinks = [
  {
    icon: <MdDashboard />,
    route: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    icon: <MdStore />,
    route: "/admin/products",
    label: "Products",
  },
  {
    icon: <MdShoppingCart />,
    route: "/admin/orders",
    label: "Orders",
  },
  {
    icon: <FaUserFriends />,
    route: "https://www.promotekit.com/dashboard/",
    label: "Affiliates",
    external: true,
  },
];

export const protectedRoutes = ["/admin", "/my-orders", "/edit-profile"];
export const publicRoutes = ["/login", "/signup", "/forgot-password"];

export const emailProtectedRoutes = ["/reset-password", "/otp-verification"];
