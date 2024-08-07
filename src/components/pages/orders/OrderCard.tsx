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
import { MdCancel, MdInfo } from "react-icons/md";
import Image from "next/image";
import OrderDetails from "./OrderDetails";
import CustomModal from "@/components/global/CustomModal";
import { cancelOrder } from "@/services/orderServices";
import toast from "react-hot-toast";
import useCartStore from "@/store/cart";

interface OrderCardProps {
  order: OrderWithProductDetails;
}

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Shipping":
      return "primary";
    case "Completed":
      return "success";
    case "Canceled":
      return "danger";
    default:
      return "default";
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const displayPrice = useCartStore((state) => state.displayPrice);

  const handleCancelOrder = async () => {
    setIsLoading(true);
    try {
      const response = await cancelOrder(order.id);
      if (response.error) throw new Error(response.error);
      toast.success("Order canceled");
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      toast.error(
        errorMessage.length > 20 ? "Something went wrong" : errorMessage
      );
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

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
                variant="flat"
                color={getOrderStatusColor(order?.shippingStatus)}
                className={`${getOrderStatusColor(order?.shippingStatus)} text-gray-700 text-sm font-bold`}
              >
                {order?.shippingStatus}
              </Chip>
              <Chip color="success" className="capitalize">
                {order?.shippingMethod}
              </Chip>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full overflow-x-auto scrollbar-thin">
            <div className="text-sm text-gray-500">Destination</div>
            <div className="font-semibold text-lg">
              {order?.shippingAddress.address}
              {" - "}
              {`${order?.shippingAddress.city}, ${order?.shippingAddress.country}`}
            </div>
          </div>
        </CardHeader>
        <Divider className="mb-4" />
        <CardBody className="h-full overflow-y-auto flex-grow scrollbar-thin">
          <div className="flex flex-wrap gap-4 justify-between w-full">
            {order?.items.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name || "Product Image"}
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
                    {displayPrice(item.product.price)}{" "}
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
              {displayPrice(order?.paymentIntent?.netAmount!)}{" "}
              <span className="text-gray-500">({order?.items.length}) </span>
            </span>
          </div>
          <div className="flex flex-row gap-2">
            {order?.shippingStatus === "Pending" && (
              <Button
                startContent={<MdCancel size={20} />}
                color="danger"
                radius="full"
                className="w-full max-w-28"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="">Cancel</span>
              </Button>
            )}
            <Button
              onClick={() => setIsOpen(true)}
              radius="full"
              className="bg-black text-white w-full max-w-28"
              startContent={<MdInfo size={20} />}
            >
              <span className="">Details</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {isOpen && (
        <OrderDetails
          order={order}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelOrder}
        message="Are you sure you want to cancel this order?"
        label="Cancel Order"
        confirmLabel="Confirm"
        color="danger"
        isLoading={isLoading}
      />
    </>
  );
};

export default OrderCard;
