"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import CartDrawer from "../pages/cart/CartDrawer";

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
        <CartDrawer onClose={onClose} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
