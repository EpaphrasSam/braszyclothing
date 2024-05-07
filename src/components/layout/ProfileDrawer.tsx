"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";

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
            // borderTopLeftRadius: "10px",
            // borderBottomLeftRadius: "10px",
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        ProfileDrawer
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
