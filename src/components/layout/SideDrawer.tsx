"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import Cart from "../pages/cart/Cart";

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
            width: "400px",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        <Cart />
      </Drawer>
    </>
  );
};

export default SideDrawer;
