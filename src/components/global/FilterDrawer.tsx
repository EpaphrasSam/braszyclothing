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
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        FilterDrawer
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
