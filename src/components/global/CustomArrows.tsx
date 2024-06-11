import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-10">
    <FaLongArrowAltLeft
      size={24}
      onClick={onClick}
      className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
    />
  </div>
);

export const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10">
    <FaLongArrowAltRight
      size={24}
      onClick={onClick}
      className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
    />
  </div>
);
