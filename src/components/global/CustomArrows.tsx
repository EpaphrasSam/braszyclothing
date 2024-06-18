import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
export const CustomLeftArrow = ({
  onClick,
  isInnerArrow,
}: {
  onClick?: () => void;
  isInnerArrow?: boolean;
}) => {
  if (isInnerArrow) {
    return (
      <div className="absolute top-16 left-1 transform -translate-y-1/2 cursor-pointer z-10">
        <MdArrowBackIosNew
          size={18}
          onClick={onClick}
          className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
        />
      </div>
    );
  } else {
    return (
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-10">
        <FaLongArrowAltLeft
          size={24}
          onClick={onClick}
          className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
        />
      </div>
    );
  }
};

export const CustomRightArrow = ({
  onClick,
  isInnerArrow,
}: {
  onClick?: () => void;
  isInnerArrow?: boolean;
}) => {
  if (isInnerArrow) {
    return (
      <div className="absolute top-16 right-1 transform -translate-y-1/2 cursor-pointer z-10">
        <MdArrowForwardIos
          size={18}
          onClick={onClick}
          className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
        />
      </div>
    );
  } else {
    return (
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10">
        <FaLongArrowAltRight
          size={24}
          onClick={onClick}
          className="text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
        />
      </div>
    );
  }
};
