"use client";

import React, { useEffect } from "react";
import { Drawer } from "@mui/material";
import ProfileDisplay from "../pages/profile/ProfileDisplay";
import ProfileLogin from "../pages/profile/ProfileLogin";
import { IoCloseOutline } from "react-icons/io5";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: any;
  session: Session | null;
};

const ProfileDrawer = ({ isOpen, onClose, session }: ProfileDrawerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            width: "350px",
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
        className="relative"
      >
        <div className="absolute top-4 right-4">
          <IoCloseOutline
            onClick={onClose}
            size={30}
            className="cursor-pointer hover:opacity-75"
          />
        </div>
        {session ? (
          <ProfileDisplay onClose={onClose} />
        ) : (
          <ProfileLogin onClose={onClose} />
        )}
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
