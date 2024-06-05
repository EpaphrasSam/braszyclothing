"use server";

import { CiDeliveryTruck } from "react-icons/ci";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { InvoiceProps } from "@/types/InvoiceTypes";

export async function generateInvoiceHTML({
  orderID,
  cartItems,
  shippingDetails,
  totalAmount,
  discount,
  shippingFee,
  netAmount,
}: InvoiceProps) {
  const invoiceDate = new Date().toLocaleDateString();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-xl">Order details #{orderID}</div>
        <div className="flex items-center space-x-4 max-sm:my-4">
          <div className="font-normal text-sm text-gray-500">
            Order date: {invoiceDate}
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2 bg-white font-normal text-sm text-green-600">
            <CiDeliveryTruck size={20} color="green" />
            <span>Estimated delivery: June 10, 2024</span>
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="overflow-y-auto scrollbar-thin flex-grow max-h-80">
        <div className="flex flex-col gap-2 w-full">
          {cartItems.map((item, index) => (
            <div key={item.id} className="flex justify-between ">
              <div className="flex gap-2">
                <Image
                  src={item.imageUrls[0]}
                  alt={item.name}
                  width={80}
                  height={80}
                  className=" w-24 h-24 object-cover object-center rounded-sm"
                />

                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="text-base text-gray-800 font-semibold">
                      {item.name}
                    </div>
                  </div>

                  <div className="mt-2 capitalize text-sm text-gray-600">
                    Color: <span className="text-black">{item.color}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Size: <span className="text-black">{item.size}</span>
                  </div>
                </div>
              </div>
              <div>
                <p>${item.price} </p>
                <p className="text-[14px] justify-end flex text-gray-500">
                  x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider className="my-4" />
      <div className="w-full flex flex-col">
        <div className="sm:grid flex justify-between grid-cols-2">
          <div className="flex flex-col justify-end">
            <div>Delivery</div>
            <div className="text-xs my-2 font-semibold text-gray-500">
              Address
            </div>
            <div>
              {shippingDetails?.firstName} {shippingDetails?.lastName}
            </div>
            <div>{shippingDetails?.address}</div>
            <div>
              {shippingDetails?.state!}, {shippingDetails?.city}
            </div>
            <div>
              {shippingDetails?.country}, {shippingDetails?.code}
            </div>
            <div className="text-xs my-2 font-semibold text-gray-500">
              Delivery Method
            </div>
            <div>{shippingDetails?.shippingMethod}</div>
          </div>
        </div>
        <Divider className="my-1" />
        <div className="sm:grid grid-cols-2">
          <div className="max-sm:hidden" />
          <div className="flex flex-col">
            <div className="font-bold text-lg">Order Summary</div>
            <div className="text-base text-gray-600">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>${shippingFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>${discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>
                  $
                  {(netAmount - totalAmount + shippingFee - discount).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
            <div className="flex my-2 items-center gap-1 overflow-hidden">
              {Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="w-1 h-[2px] bg-gray-400" />
              ))}
            </div>
            <div className="flex justify-between">
              <p>Total:</p>
              <p className="text-base font-semibold">
                <p>${netAmount.toFixed(2)}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
