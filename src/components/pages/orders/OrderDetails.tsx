import { getPaymentMethodDetails } from "@/services/stripeServices";
import { OrderWithProductDetails } from "@/types/OrderTypes";
import {
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import useCartStore from "@/store/cart";

interface OrderDetailsProps {
  order: OrderWithProductDetails;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails = ({ order, isOpen, onClose }: OrderDetailsProps) => {
  const displayPrice = useCartStore((state) => state.displayPrice);
  const fetcher = async () => {
    if (!order.paymentIntent) return;
    const res = await getPaymentMethodDetails(
      order.paymentIntent?.paymentIntentId
    );

    if (res && "error" in res) throw new Error(res.error);

    return res;
  };
  const { data, error, isLoading } = useSWR(
    `/api/orders/${order.paymentIntent?.paymentIntentId}`,
    fetcher
  );

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      const response = await axios.post(
        `/api/invoice`,
        { orderId },
        {
          responseType: "blob",
          timeout: 60000,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to download invoice");
      }

      const orderID = response.headers["orderid"];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${orderID}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      if (error.message === "Network Error") {
        toast.error("Download blocked by browser extension");
      } else {
        toast.error("Failed to download invoice");
      }
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="sm"
      size="2xl"
      onOpenChange={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      className="flex flex-col"
      scrollBehavior="outside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          <div className="text-xl">Order details #{order.orderID}</div>
          <div className="flex items-center space-x-4 max-sm:my-4">
            <div className="font-normal text-sm text-gray-500">
              Order date:{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(order.createdAt))}
            </div>
            <Divider orientation="vertical" />
            <div className="flex gap-2 bg-white font-normal text-sm text-green-600">
              <CiDeliveryTruck size={20} color="green" />
              <span>Estimated delivery: 3 - 14 days</span>
            </div>
          </div>
        </ModalHeader>
        <Divider className="my-4" />
        <ModalBody className="overflow-y-auto scrollbar-thin flex-grow max-h-80">
          <div className="flex flex-col gap-2 w-full">
            {order?.items.map((item, index) => (
              <div key={item.id} className="flex justify-between ">
                <div className="flex gap-2">
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

                    <div className="mt-2 capitalize text-sm text-gray-600">
                      Color: <span className="text-black">{item.color}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Size: <span className="text-black">{item.size}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p>${item.product.price} </p>
                  <p className="text-[14px] justify-end flex text-gray-500">
                    x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <Divider className="my-4" />
        <ModalFooter className="w-full flex flex-col">
          <div className="sm:grid flex justify-between grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Payment Details</p>
              {isLoading ? (
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  {data?.type === "card" ? (
                    <>
                      <div>**** **** **** {data.last4}</div>
                      <Chip size="sm" radius="sm" color="primary">
                        {data.brand}
                      </Chip>
                    </>
                  ) : (
                    <div>{data?.name}</div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-lg">Delivery</div>
              <div className="text-xs my-2 font-semibold text-gray-500">
                Address
              </div>
              <div>
                {order?.shippingAddress?.firstName}{" "}
                {order?.shippingAddress?.lastName}
              </div>
              <div>{order?.shippingAddress?.address}</div>
              <div>
                {order?.shippingAddress?.state!}, {order?.shippingAddress?.city}
              </div>
              <div>
                {order?.shippingAddress?.country},{" "}
                {order?.shippingAddress?.code}
              </div>
              <div className="text-xs my-2 font-semibold text-gray-500">
                Delivery Method
              </div>
              <div className="capitalize">{order?.shippingMethod}</div>
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
                  <p>{displayPrice(order?.paymentIntent?.totalAmount!)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{displayPrice(order?.paymentIntent?.shippingFee!)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p>-{displayPrice(order?.paymentIntent?.discount!)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>{displayPrice(order?.paymentIntent?.fee!)}</p>
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
                  <p>{displayPrice(order?.paymentIntent?.netAmount!)}</p>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              color="primary"
              startContent={<FaFilePdf />}
              onClick={() => handleDownloadInvoice(order.orderID)}
            >
              Download Invoice
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetails;
