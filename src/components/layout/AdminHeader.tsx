"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar, NavbarContent } from "@heroui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import AdminDrawer from "../pages/admin/AdminDrawer";

const AdminHeader = () => {
  const [showNav, setShowNav] = useState({
    leftNav: false,
  });

  const navHandler = (anchor: any, open: any) => (event: any) => {
    setShowNav({ ...showNav, [anchor]: open });
    return;
  };
  return (
    <>
      <Navbar maxWidth="full" isBlurred isBordered position="static">
        <NavbarContent justify="start">
          <Link
            href="/"
            className="flex max-sm:text-sm items-center gap-3 font-semibold hover:scale-105 transition ease-in-out duration-300"
          >
            <IoReturnDownBack className="text-2xl" />
            <span className="hidden sm:block">Go Back</span>
          </Link>
        </NavbarContent>
        <NavbarContent justify="center">
          <div className="transition ease-in-out duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
              className="w-auto h-auto "
            />
          </div>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="font-semibold max-sm:text-sm text-gray-500"
        >
          <RxHamburgerMenu
            size={24}
            className="cursor-pointer hover:opacity-50"
            onClick={navHandler("leftNav", true)}
          />
        </NavbarContent>
      </Navbar>
      <AdminDrawer
        isOpen={showNav["leftNav"]}
        onClose={navHandler("leftNav", false)}
      />
    </>
  );
};

export default AdminHeader;
