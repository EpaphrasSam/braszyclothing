import React from "react";
import { Button, Input } from "@nextui-org/react";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import Image from "next/image";

function Payment() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex max-w-5xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Left Panel for Payment Process */}
        <div className="w-2/3 p-8 bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <div className="flex space-x-4 my-4">
              {/* Div with Credit Card icon */}
              <div className="flex items-center space-x-2 p-2 border border-black rounded-full shadow-sm bg-white">
                <FaCreditCard size={24} />
                <span>Credit Card</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <form className="space-y-4 my-4">
              <Input
                variant="bordered"
                type="text"
                name="Name on Card"
                fullWidth
                required
                labelPlacement="outside"
                size="lg"
                label="Name on Card"
                radius="none"
              />
              <Input
                variant="bordered"
                type="number"
                name="Card Number"
                fullWidth
                required
                labelPlacement="outside"
                size="lg"
                label="Card Number"
                radius="none"
              />
              <div className="flex space-x-4">
                <Input
                  variant="bordered"
                  type="number"
                  name="Expiration Date"
                  width="50%"
                  labelPlacement="outside"
                  size="lg"
                  label="Expiration Date"
                  radius="none"
                />
                <Input
                  variant="bordered"
                  type="number"
                  name="CVC"
                  width="50%"
                  labelPlacement="outside"
                  size="lg"
                  label="CVC"
                  radius="none"
                />
              </div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 text-sm sm:text-base font-medium rounded-md text-white bg-black hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm Payment
              </Button>
            </form>
          </div>
        </div>

        {/* Right Panel for Product Information */}
        <div className="w-1/3 bg-gray-50 p-8 text-white flex flex-col justify-between">
          <Image
            src="/images/img17.png"
            alt="Nivea Lotion"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
