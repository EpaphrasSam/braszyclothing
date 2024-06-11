"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarLinks } from "@/lib/constants/routes";
import { Drawer } from "@mui/material";
import { MdPersonOutline } from "react-icons/md";
import { Divider } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { IoCloseOutline } from "react-icons/io5";

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: any;
}

const AdminDrawer = ({ isOpen, onClose }: AdminDrawerProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: "370px",
        },
      }}
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      className="relative"
    >
      <>
        <div className="absolute top-4 right-4">
          <IoCloseOutline
            onClick={onClose}
            size={30}
            className="cursor-pointer hover:opacity-75"
          />
        </div>
        <div className="flex w-full flex-1 flex-col gap-3 p-6">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <MdPersonOutline size={60} className="mx-auto text-gray-800" />
            </div>
            <h2 className="font-semibold text-lg mt-2">Admin</h2>
            <Divider className="my-2" />
            <p className="text-gray-600">{session?.user.email!}</p>
            <Divider className="my-2" />
          </div>
          {adminSidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                key={link.label}
                href={link.route}
                target={link.external ? "_blank" : "_self"}
                className={`relative flex justify-start gap-2 rounded-lg p-4  ${
                  isActive && "bg-blue-500"
                } ${!isActive && "hover:opacity-50"} `}
              >
                <div className="flex items-center gap-4">
                  {link.icon &&
                    React.cloneElement(link.icon, {
                      style: {
                        color: isActive ? "#ffffff" : "#0A0A0A",
                        fontSize: "20px",
                      },
                    })}

                  <p
                    className={`${
                      !isActive ? "text-[#0A0A0A]" : "text-[#ffffff]"
                    } `}
                  >
                    {link.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    </Drawer>
  );
};

export default AdminDrawer;
