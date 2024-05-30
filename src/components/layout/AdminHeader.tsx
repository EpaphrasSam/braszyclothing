"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { IoReturnDownBack } from "react-icons/io5";

const AdminHeader = (props: any) => {
  return (
    <Navbar maxWidth="full" isBlurred isBordered position="static">
      <NavbarContent justify="start">
        <Link
          href="/"
          className="flex max-sm:text-sm items-center gap-3 font-semibold hover:scale-105 transition ease-in-out duration-300"
        >
          <IoReturnDownBack className="text-2xl" />
          Go to Website
        </Link>
      </NavbarContent>
      <NavbarContent justify="center">
        <div className="transition ease-in-out duration-300 hover:scale-105">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-12 h-12 "
          />
        </div>
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="font-semibold max-sm:text-sm text-gray-500"
      >
        Admin
      </NavbarContent>{" "}
    </Navbar>
  );
};

export default AdminHeader;
