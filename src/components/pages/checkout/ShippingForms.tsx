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
  const totalAmount = useCartStore((state) => state.totalAmount);
  const setShippingDetails = useCartStore((state) => state.setShippingDetails);
  const setShippingFee = useCartStore((state) => state.setShippingFee);
  const displayPrice = useCartStore((state) => state.displayPrice);
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

    if (selectedMethod === "standard") {
      setShippingFee(totalAmount() >= 100 ? 0 : 10.5);
    }

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
          <div className="flex justify-between items-center my-1">
            <Radio
              description={
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Delivery within 3-14 business days.</p>
                  <p className="text-xs">
                    Total items below {displayPrice(100)} has a flat rate of{" "}
                    {displayPrice(10.5)}
                  </p>
                </div>
              }
              value="standard"
            >
              Standard Shipping
            </Radio>
            {totalAmount() >= 100 ? (
              <p className="text-lg text-gray-500">Free</p>
            ) : (
              <p className="text-lg text-gray-500">{displayPrice(10.5)}</p>
            )}
          </div>
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
