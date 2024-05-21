"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import ProfileDisplay from "./ProfileDisplay";
import { MdLogout } from "react-icons/md"; //

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: any;
};

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
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
      >
        <div className="flex flex-col h-full">
          <ProfileDisplay />
          <div className="mt-auto p-4">
            <button
              // onClick={/* Add your logout function here */}
              className="flex items-center w-full px-4 py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-700"
            >
              <MdLogout size={24} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
