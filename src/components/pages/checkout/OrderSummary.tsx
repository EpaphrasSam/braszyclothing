"use client";

import useCartStore from "@/store/cart";
import { useStore } from "@/store/useStore";
import { Badge, Button, Divider, Input, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { validatePromotionCode } from "@/services/stripeServices";

const OrderSummary = () => {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const paymentIntent = useStore(useCartStore, (state) => state.paymentIntent);
  const discount = useStore(useCartStore, (state) => state.discount);
  const setDiscount = useCartStore((state) => state.setDiscount);
  const shippingFee = useCartStore((state) => state.shippingFee);
  const netAmount = useCartStore((state) => state.netAmount);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const setPaymentIntent = useCartStore((state) => state.setPaymentIntent);
  const displayPrice = useCartStore((state) => state.displayPrice);
  const [isCouponVisible, setIsCouponVisible] = useState(false);
  const appliedCoupons = useStore(
    useCartStore,
    (state) => state.appliedCoupons
  );
  const setAppliedCoupons = useCartStore((state) => state.setAppliedCoupons);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promoCode: "",
    },
  });

  const onSubmit = async (data: { promoCode: string }) => {
    try {
      setIsLoading(true);
      const promoCode = await validatePromotionCode(data.promoCode);
      if ("error" in promoCode) throw new Error(promoCode.error);
      if (appliedCoupons?.includes(promoCode.code)) {
        setError("promoCode", { message: "Coupon already applied" });
        return;
      }
      if (promoCode.valid) {
        let discountAmount = 0;
        if (promoCode.amount_off) {
          discountAmount = promoCode.amount_off / 100;
        } else if (promoCode.percent_off) {
          discountAmount = (totalAmount() * promoCode.percent_off) / 100;
        }
        setAppliedCoupons([...appliedCoupons!, promoCode.code]);
        setDiscount(discountAmount);
        setPaymentIntent(null);
        reset();
      } else {
        setError("promoCode", { message: "Expired promo code" });
      }
    } catch (error: any) {
      setError("promoCode", { message: "Invalid promo code" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isCouponVisible) {
      reset();
    }
  }, [isCouponVisible]);

  if (!cartItems) {
    return (
      <div className="bg-white h-screen flex flex-col p-4 pt-8 rounded-md shadow-md">
        <div className="text-lg font-bold">
          <Skeleton className="rounded-lg">
            <div className="h-6 w-40 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <Divider className="my-4" />
        <div className="scrollbar-thin scrollbar-thumb-gray-500 my-2 overflow-y-auto flex-grow">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between mb-4 mt-2">
              <div className="flex">
                <div className="mr-4">
                  <Skeleton className="rounded-lg">
                    <div className="h-12 w-20 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
                <div>
                  <Skeleton className="rounded-lg">
                    <div className="h-4 w-32 rounded-lg bg-default-300 mb-2"></div>
                  </Skeleton>
                  <Skeleton className="rounded-lg">
                    <div className="h-4 w-16 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </div>
              <Skeleton className="rounded-lg">
                <div className="h-4 w-12 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Divider className="my-4" />
          <div className="mb-4 flex justify-between">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-32 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-6 w-6 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between mb-2">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-4 w-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex justify-between mb-2">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-4 w-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex justify-between mb-2">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-4 w-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex justify-between mb-4">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-4 w-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <Skeleton className="rounded-lg">
              <div className="h-4 w-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-4 w-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col p-4 pt-8 rounded-md shadow-md">
      <div className="text-lg font-bold">
        Order Summary ({cartItems.length})
      </div>
      <Divider className="my-4" />
      <div className="scrollbar-thin scrollbar-thumb-gray-500 my-2  overflow-y-auto flex-grow">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-4 mt-2">
            <div className="flex">
              <div className="mr-4">
                <Badge content={item.quantity} size="lg" color="primary">
                  <Image
                    src={
                      item.mediaUrls.find((media) => media.type === "image")
                        ?.url || item.mediaUrls[0].url
                    }
                    alt={item.name || "Product Image"}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover object-center rounded-md"
                  />
                </Badge>
              </div>
              <div>
                <h3 className="text-sm text-gray-700 font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold">
                  {displayPrice(item.price)}
                </p>
                <p className="text-sm mt-1 text-gray-500 font-semibold">
                  Size: <span className="text-gray-800">{item.size}</span>
                </p>
                <p className="text-sm text-gray-500 font-semibold capitalize">
                  Color: <span className="text-gray-800">{item.color}</span>
                </p>
              </div>
            </div>
            <div className="md:col-span-1">
              <span className="text-gray-500 font-semibold">
                {displayPrice(item.price * item.quantity!)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Divider className="my-4" />
        <div className="mb-4 flex justify-between">
          <div className="text-base font-medium mb-1">Promo Code</div>
          {!isCouponVisible ? (
            <FiPlus
              size={24}
              className="cursor-pointer transition ease-in-out duration-300 hover:scale-110 hover:opacity-75"
              onClick={() => setIsCouponVisible(true)}
            />
          ) : (
            <FiMinus
              size={24}
              className="cursor-pointer transition ease-in-out duration-300 hover:scale-110 hover:opacity-75"
              onClick={() => setIsCouponVisible(false)}
            />
          )}
        </div>
        <AnimatePresence>
          {isCouponVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-2 w-full"
            >
              <Input
                placeholder="Enter code"
                radius="sm"
                color="primary"
                variant="bordered"
                value={watch("promoCode")}
                isInvalid={!!errors.promoCode}
                errorMessage={errors.promoCode?.message as string}
                {...register("promoCode", {
                  required: "Coupon is required",
                })}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                color="primary"
                radius="none"
                className="rounded-md"
                isLoading={isLoading}
              >
                Apply
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Divider className="my-4" />
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>
          {displayPrice(totalAmount())}
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Shipping</span>
          <span className="font-bold">{displayPrice(shippingFee!)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Discount</span>
          <span className="font-bold">{displayPrice(discount!)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Estimated Tax</span>
          {displayPrice(paymentIntent?.fee || 0)}
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Estimated Total</span>
          {displayPrice(netAmount())}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
