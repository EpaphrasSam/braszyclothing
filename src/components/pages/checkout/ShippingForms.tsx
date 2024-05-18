"use client";

import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBack } from "react-icons/io5";

const ShippingForms = () => {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/checkouts/payment");
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow"></div>
      <Divider className="my-4" />

      <div className="flex justify-between ">
        <Link
          href={"/checkout/information"}
          className="flex gap-2 items-center cursor-pointer hover:opacity-75 hover:underline underline-offset-4"
        >
          <IoChevronBack size={20} />
          <p>Return to Information</p>
        </Link>
        <Button
          type="submit"
          radius="none"
          className="rounded-md text-base font-medium"
          color="primary"
          onClick={onSubmit}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShippingForms;
