"use client";

import useCartStore from "@/store/cart";
import { Button, Divider, RadioGroup, Radio } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";

const ShippingForms = () => {
  const router = useRouter();
  const setShippingDetails = useCartStore((state) => state.setShippingDetails);
  const shippingDetails = useCartStore((state) => state.shippingDetails);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    if (shippingDetails && shippingDetails.shippingMethod) {
      setSelectedMethod(shippingDetails.shippingMethod);
    }
  }, [shippingDetails]);

  const onSubmit = () => {
    if (!selectedMethod || !shippingDetails) {
      if (!selectedMethod) {
        toast.error("Please select a shipping method");
      }
      return;
    }

    const updatedShippingDetails = {
      ...shippingDetails,
      shippingMethod: selectedMethod,
    };

    setShippingDetails(updatedShippingDetails);
    router.push("/checkouts/payment");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6">
        <RadioGroup
          label="Select shipping method"
          size="lg"
          value={selectedMethod}
          onValueChange={setSelectedMethod}
        >
          <Radio className="my-1" value="UPS">
            UPS
          </Radio>
          <Radio className="my-1" value="DHL">
            DHL
          </Radio>
        </RadioGroup>
      </div>
      <Divider className="my-4" />

      <div className="flex justify-between ">
        <Link
          href={"/checkouts/information"}
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
