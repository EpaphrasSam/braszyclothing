"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";

type SideDrawerProps = {
  isOpen: boolean;
  onClose: any;
};

const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            width: "350px",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        SideDrawer
      </Drawer>
    </>
  );
};

export default SideDrawer;
