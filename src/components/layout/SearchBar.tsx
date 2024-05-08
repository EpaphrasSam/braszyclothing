"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

type SearchBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
            className="fixed border-b border-gray-400 border-solid top-0 left-0 right-0 z-40 w-full bg-white h-16 flex items-center justify-center px-10 gap-2"
          >
            <Input
              isClearable
              variant="bordered"
              radius="full"
              className="sm:w-[600px] w-full"
              startContent={<IoSearchOutline size={20} />}
              placeholder="Search..."
              classNames={{
                label: "text-black text-[12px]",
              }}
            />
            <IoCloseOutline
              size={28}
              onClick={onClose}
              className="cursor-pointer hover:opacity-75 flex"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
