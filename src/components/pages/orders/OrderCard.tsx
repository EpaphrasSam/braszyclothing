import { OrderWithProductDetails } from "@/types/OrderTypes";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import React, { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";
import { MdArrowRight } from "react-icons/md";
import Image from "next/image";
import OrderDetails from "./OrderDetails";

interface OrderCardProps {
  order: OrderWithProductDetails;
}

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200";
    case "On Delivery":
      return "bg-blue-200";
    case "Arrived":
      return "bg-green-200";
    case "Cancelled":
      return "bg-red-200";
    default:
      return "bg-gray-300";
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card className="max-w-[650px] w-full h-[350px] flex flex-col">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">OrderID</div>
              <div className="font-semibold text-lg">#{order?.orderID}</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Chip
                size="lg"
                className={`${getOrderStatusColor(order?.shippingStatus)} text-gray-700 text-sm font-bold`}
              >
                {order?.shippingStatus}
              </Chip>
              <Chip color="success" className="capitalize">
                {order?.shippingMethod}
              </Chip>
            </div>
          </div>
          <div className="flex justify-between w-full overflow-x-auto scrollbar-thin">
            <Chip
              className="bg-white border-1 border-solid border-gray-200 rounded-full p-4"
              startContent={<CiDeliveryTruck size={20} />}
            >
              York City, Canada
            </Chip>
            <div className="flex items-center">
              <GoDotFill size={18} />
              <div className="flex items-center gap-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="w-1 h-[2px] bg-gray-600" />
                ))}
              </div>
              <MdArrowRight size={24} />
            </div>
            <Chip
              className="bg-white border-1 border-solid border-gray-200 rounded-full p-4"
              startContent={<GrLocation size={20} />}
            >
              {`${order?.shippingAddress.city}, ${order?.shippingAddress.country}`}
            </Chip>
          </div>
        </CardHeader>
        <Divider className="mb-4" />
        <CardBody className="h-full overflow-y-auto flex-grow scrollbar-thin">
          <div className="flex flex-wrap gap-4 justify-between w-full">
            {order?.items.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className=" w-24 h-24 object-cover object-center rounded-sm"
                />

                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="text-base text-gray-800 font-semibold">
                      {item.product.name}
                    </div>
                  </div>
                  <div>
                    ${item.product.price}{" "}
                    <span className="text-[14px] text-gray-500">
                      x {item.quantity}
                    </span>
                  </div>
                  <div className="mt-2 capitalize text-sm text-gray-600">
                    Color: <span className="text-black">{item.color}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Size: <span className="text-black">{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <Divider className="mt-4" />
        <CardFooter className="flex justify-between p-4 py-6">
          <div className="text-gray-900 ">
            <span className="text-base font-semibold">
              ${order?.paymentIntent?.netAmount.toFixed(2)}{" "}
              <span className="text-gray-500">
                ({order?.items.length}{" "}
                {order?.items.length === 1 ? "item" : "items"})
              </span>
            </span>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            radius="full"
            className="bg-black text-white w-32"
          >
            Details
          </Button>
        </CardFooter>
      </Card>

      {isOpen && (
        <OrderDetails
          order={order}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default OrderCard;
