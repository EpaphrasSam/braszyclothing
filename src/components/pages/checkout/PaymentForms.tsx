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
  Skeleton,
} from "@nextui-org/react";
import useCartStore from "@/store/cart";
import { useStore } from "@/store/useStore";
import useSWR from "swr";
import { createPaymentIntent } from "@/services/stripeServices";
import toast from "react-hot-toast";

const CardForms = ({ amount }: { amount: number | undefined }) => {
  const stripe = useStripe();
  const elements = useElements();
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
    localStorage.removeItem("clientSecret");
    setIsProcessing(false);
  };
  return (
    <>
      <form className="sm:w-[60%] w-full" onSubmit={confirmPayment}>
        <div className="flex justify-center pb-4">
          {/* <Chip color="default" startContent="💳">
            Only Card Payments are allowed
          </Chip> */}
        </div>
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
              Pay ${amount!}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

const PaymentForms = () => {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const { data, error, isLoading } = useSWR(
    cartItems ? `/api/create-payment-intent` : null,
    async () => {
      const storedClientSecret = localStorage.getItem("clientSecret");
      if (storedClientSecret) {
        return {
          clientSecret: storedClientSecret,
          amount: totalAmount(cartItems!),
        };
      } else {
        const result = await createPaymentIntent(totalAmount(cartItems!));
        localStorage.setItem("clientSecret", result?.clientSecret!);
        return result;
      }
    }
  );

  const { clientSecret, amount } = data || {};

  if (!clientSecret || !cartItems) {
    return (
      <>
        <Card className="sm:w-[60%] w-full h-[400px] space-y-5 p-4" radius="lg">
          {/* <div className="flex justify-center">
            <Skeleton className="w-52 h-8 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div> */}
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
  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe" } }}
      >
        <CardForms amount={amount} />
      </Elements>
    </>
  );
};

export default PaymentForms;
