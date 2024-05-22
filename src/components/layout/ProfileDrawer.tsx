"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import ProfileDisplay from "../pages/profile/ProfileDisplay";
import { MdLogout } from "react-icons/md"; //
import ProfileLogin from "../pages/profile/ProfileLogin";
import { IoCloseOutline } from "react-icons/io5";

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: any;
};

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
  const isLoggedIn = true;
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
        {isLoggedIn ? <ProfileDisplay /> : <ProfileLogin />}
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
