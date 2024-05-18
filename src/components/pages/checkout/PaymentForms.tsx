"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import useCartStore from "@/store/cart";
import { useStore } from "@/store/useStore";
import { createPaymentIntent } from "@/services/stripeServices";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

const CardForms = ({ netAmount }: { netAmount: number | undefined }) => {
  const stripe = useStripe();
  const elements = useElements();
  const resetAmount = useCartStore((state) => state.resetAmount);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isPaymentElementComplete, setIsPaymentElementComplete] =
    useState(false);
  const [paymentElementError, setPaymentElementError] = useState(false);

  useEffect(() => {
    if (!elements) return;

    const paymentElement: any = elements.getElement(PaymentElement);

    const handleChange = (event: any) => {
      setIsPaymentElementComplete(event.complete);
      setPaymentElementError(!!event.error);
    };

    if (paymentElement) {
      paymentElement.on("change", handleChange);
    }

    return () => {
      if (paymentElement) {
        paymentElement.off("change", handleChange);
      }
    };
  }, [elements]);

  const isDisabled = useMemo(() => {
    return (
      !stripe ||
      !elements ||
      isProcessing ||
      !isPaymentElementComplete ||
      paymentElementError
    );
  }, [
    stripe,
    elements,
    isProcessing,
    isPaymentElementComplete,
    paymentElementError,
  ]);

  const confirmPayment = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error }: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkouts/payment",
      },
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
    resetAmount();
    setIsProcessing(false);
  };

  return (
    <>
      <form
        className="sm:w-[60%] w-full p-2 flex-grow"
        onSubmit={confirmPayment}
      >
        <Card radius="none" className="rounded-md">
          <CardBody className="p-4">
            <PaymentElement />
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              color={isDisabled ? "default" : "primary"}
              radius="none"
              size="md"
              className="rounded-md text-base font-semibold"
              disabled={isDisabled}
              isLoading={isProcessing}
            >
              Pay ${netAmount}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

const PaymentForms = () => {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const discount = useStore(useCartStore, (state) => state.discount);
  // const paymentIntent = useStore(useCartStore, (state) => state.paymentIntent);
  const paymentIntent = useCartStore((state) => state.paymentIntent);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const setPaymentIntent = useCartStore((state) => state.setPaymentIntent);

  useEffect(() => {
    const fetchData = async () => {
      if (!paymentIntent?.clientSecret && cartItems) {
        const result = await createPaymentIntent(totalAmount());
        if (result) {
          setPaymentIntent(result);
        }
      }
    };

    fetchData();
  }, [paymentIntent, cartItems, totalAmount]);

  if (!paymentIntent?.clientSecret || !cartItems) {
    return (
      <>
        <Card className="sm:w-[60%] w-full h-[400px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-[300px] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3 flex justify-end">
            <Skeleton className="w-2/5 h-12 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </>
    );
  }

  const { netAmount, clientSecret } = paymentIntent;

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe" } }}
      >
        <CardForms netAmount={netAmount} />
      </Elements>
      <Divider className="my-4" />
      <div className="w-full">
        <Link
          href={"/checkouts/shipping"}
          className="flex gap-2 items-center cursor-pointer hover:opacity-75 hover:underline underline-offset-4"
        >
          <IoChevronBack size={20} />
          <p>Return to Shipping</p>
        </Link>
      </div>
    </div>
  );
};

export default PaymentForms;
