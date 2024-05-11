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
            width: "370px",
            // borderTopLeftRadius: "10px",
            // borderBottomLeftRadius: "10px",
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        <Cart onClose={onClose} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
