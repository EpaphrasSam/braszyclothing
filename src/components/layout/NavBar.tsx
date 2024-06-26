"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/cart";
import ProfileDrawer from "./ProfileDrawer";
import { useSession } from "next-auth/react";
import { NavbarLinks, NavLinkTypes } from "@/lib/constants/routes";
import { cancelPaymentIntent } from "@/services/stripeServices";
import toast from "react-hot-toast";

const chevronVariants = {
  down: { rotate: 0 },
  up: { rotate: 360 },
};

const NavBar = () => {
  const pathname = usePathname();
  const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNav, setShowNav] = useState({
    leftNav: false,
  });
  const [showProfileNav, setShowProfileNav] = useState({
    leftNav: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const paymentIntent = useStore(useCartStore, (state) => state.paymentIntent);
  const resetAmount = useCartStore((state) => state.resetAmount);
  const resetShippingDetails = useCartStore(
    (state) => state.resetShippingDetails
  );

  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const cancelPayment = async () => {
      try {
        await cancelPaymentIntent(paymentIntent?.paymentIntentId!);
      } catch (error) {
        console.log(error);
      }
    };
    if (paymentIntent) {
      cancelPayment();
      resetAmount();
    }
    if (!session) {
      resetShippingDetails();
    }
  }, [session, paymentIntent]);

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setIsScrolled(y > 0);
    });
  }, [scrollY]);

  const brandVariants = {
    scrolled: {
      scale: 0.7,
      transition: { type: "tween", duration: 0.3 },
    },
    top: {
      scale: 1,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const navHandler = (anchor: any, open: any) => (event: any) => {
    setShowNav({ ...showNav, [anchor]: open });
    return;
  };

  const profileHandler = (anchor: any, open: any) => (event: any) => {
    setShowProfileNav({ ...showNav, [anchor]: open });
    return;
  };

  const handleDropdownToggle = (key: string) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const renderLink = (link: NavLinkTypes) => {
    const isActive =
      (pathname.includes(link.route) && link.route.length > 1) ||
      pathname === link.route;

    if (link.children && link.children.length > 0) {
      return (
        <Dropdown
          key={link.name}
          onOpenChange={() => handleDropdownToggle(link.name)}
          classNames={{
            content: "rounded-none min-w-[100px]",
          }}
        >
          <DropdownTrigger>
            <motion.div
              whileHover={{
                textDecoration: "underline",
              }}
              style={{
                textUnderlineOffset: `${isActive ? "0.6rem" : "0.5rem"}`,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="flex gap-2 items-center cursor-pointer"
            >
              <span
                className={`${
                  isActive
                    ? "font-medium underline underline-offset-[0.5rem]"
                    : "font-light"
                } text-base`}
              >
                {link.name}
              </span>
              <motion.div
                className="chevron-icon"
                variants={chevronVariants}
                initial="down"
                animate={dropdownStates[link.name] ? "up" : "down"}
              >
                {dropdownStates[link.name] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </motion.div>
            </motion.div>
          </DropdownTrigger>
          <DropdownMenu className="rounded-none">
            {link.children.map((child) => (
              <DropdownItem key={child.route}>
                <Link
                  key={child.name}
                  href={`${link.route}${child.route}`}
                  className="hover:underline underline-offset-4 hover:bg-transparent"
                >
                  {child.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <NavbarItem key={link.name}>
        <motion.div
          whileHover={{
            textDecoration: "underline",
          }}
          style={{
            textUnderlineOffset: `${isActive ? "0.6rem" : "0.5rem"}`,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Link
            key={link.name}
            href={link.route}
            className={`${
              isActive
                ? "font-medium underline underline-offset-[0.5rem]"
                : "font-light"
            }`}
            aria-current="page"
          >
            {link.name}
          </Link>
        </motion.div>
      </NavbarItem>
    );
  };

  const menuLink = (link: NavLinkTypes) => {
    const isActive =
      (pathname.includes(link.route) && link.route.length > 1) ||
      pathname === link.route;

    if (link.children && link.children.length > 0) {
      return (
        <NavbarMenuItem
          key={link.name}
          className={`${
            isActive && "bg-gray-300"
          }, p-4 justify-between flex items-center rounded-lg hover:opacity-75 cursor-pointer`}
        >
          <div>{link.name}</div>
          <FaArrowRight />
        </NavbarMenuItem>
      );
    }

    return (
      <Link key={link.name} href={link.route}>
        <NavbarMenuItem
          key={link.name}
          className={`${
            isActive && "bg-gray-300"
          } p-4 rounded-lg hover:opacity-75`}
        >
          {link.name}
        </NavbarMenuItem>
      </Link>
    );
  };

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer-subscribe");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        onClick={scrollToFooter}
        className={`${
          isSearchOpen && "hidden"
        } w-full  bg-black text-white py-2 px-1 text-center cursor-pointer`}
      >
        <span className="animate-pulse text-sm transition ease-in-out duration-1000 font-semibold ">
          A 10% discount promo is available for new customers
        </span>
      </div>
      <Navbar
        maxWidth="full"
        isBordered
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        classNames={{
          wrapper: "max-sm:px-2",
        }}
      >
        <NavbarMenuToggle
          icon={(isOpen) =>
            !isOpen ? <FaBars size={20} /> : <MdOutlineClose size={32} />
          }
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarContent justify="start" className="md:hidden" />

        <NavbarContent className="hidden md:flex gap-4" justify="start">
          {NavbarLinks.map(renderLink)}
        </NavbarContent>

        <NavbarContent justify="center" className="max-sm:mr-10">
          <NavbarItem>
            <Link href="/">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                animate={isScrolled ? "scrolled" : "top"}
                variants={brandVariants}
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={70}
                  height={70}
                  className="w-auto h-auto object-cover object-center"
                />
              </motion.div>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="flex gap-4 items-center">
            <IoSearchOutline
              size={24}
              className="transition-transform duration-300 cursor-pointer hover:scale-105"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <Badge
              isInvisible={!cartItems || cartItems.length === 0}
              content={
                cartItems && cartItems.length > 0 ? cartItems.length : null
              }
              color="primary"
            >
              <CiShoppingCart
                size={28}
                className="transition-transform duration-300 cursor-pointer hover:scale-105"
                onClick={navHandler("leftNav", true)}
              />
            </Badge>
            <Avatar
              size="sm"
              isBordered
              className="transition-transform duration-300 cursor-pointer hover:scale-105"
              onClick={profileHandler("leftNav", true)}
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="bg-white max-md:pt-10">
          {NavbarLinks.map(menuLink)}
        </NavbarMenu>
      </Navbar>
      {isSearchOpen && (
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
      <SideDrawer
        isOpen={showNav["leftNav"]}
        onClose={navHandler("leftNav", false)}
      />

      {status !== "loading" && (
        <ProfileDrawer
          isOpen={showProfileNav["leftNav"]}
          onClose={profileHandler("leftNav", false)}
          session={session}
        />
      )}
    </>
  );
};

export default NavBar;
