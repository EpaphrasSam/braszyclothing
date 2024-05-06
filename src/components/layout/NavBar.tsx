"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarLinks, NavLinkTypes } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { FaBars, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navHandler = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowNav({ ...showNav, [anchor]: open });
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
                  href={{
                    pathname: `${link.route}${child.route}`,
                  }}
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
      <Link href={link.route}>
        <NavbarMenuItem
          className={`${
            isActive && "bg-gray-300"
          } p-4 rounded-lg hover:opacity-75`}
        >
          {link.name}
        </NavbarMenuItem>
      </Link>
    );
  };

  return (
    <>
      <Navbar isBordered position="sticky" onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          icon={(isOpen) =>
            !isOpen ? <FaBars size={20} /> : <MdOutlineClose size={32} />
          }
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {/* <NavbarContent justify="center"> */}
        <NavbarBrand>
          <Image src="/logo.jpg" alt="logo" width={50} height={50} />
        </NavbarBrand>
        {/* </NavbarContent> */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {NavbarLinks.map(renderLink)}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="flex gap-2 items-center">
            <IoSearchOutline
              size={24}
              className="cursor-pointer hover:opacity-75"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <CiShoppingCart
              size={28}
              className="cursor-pointer hover:opacity-75"
              onClick={navHandler("leftNav", true)}
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>{NavbarLinks.map(menuLink)}</NavbarMenu>
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
    </>
  );
};

export default NavBar;
