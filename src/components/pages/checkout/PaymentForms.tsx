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
  Divider,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import useCartStore, { CartState, ShippingDetails } from "@/store/cart";
import { useStore } from "@/store/useStore";
import {
  createPaymentIntent,
  savePaymentMethod,
  getPaymentMethod,
  updatePaymentMethod,
} from "@/services/stripeServices";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import CustomModal from "@/components/global/CustomModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { createOrder } from "@/services/cartServices";
import { ProductType } from "@/types/SanityTypes";

const CardForms = ({
  netAmount,
  session,
  shippingDetails,
  clientSecret,
  cartItems,
}: {
  netAmount: number;
  session: Session | null;
  shippingDetails: ShippingDetails;
  clientSecret: string;
  cartItems: (ProductType & {
    color: string;
    size: string;
  })[];
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [paymentElementError, setPaymentElementError] = useState(false);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const { email } = session?.user || {};

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      if (!elements || !email) return;
      try {
        setLoadingPaymentMethods(true);
        const result = await getPaymentMethod(email);

        if (result && result.success && result.paymentMethods) {
          setPaymentMethods(result.paymentMethods);
        }
      } catch (error) {
        toast.error("Failed in fetching payment methods");
      } finally {
        setLoadingPaymentMethods(false);
      }
    };

    fetchPaymentMethod();
  }, [email, elements]);

  const [isPaymentElementComplete, setIsPaymentElementComplete] =
    useState(false);

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
    const isNewCardSelected = selectedPaymentMethod === "new";
    const isPaymentMethodSelected = !!selectedPaymentMethod;
    const hasEmail = email && email.trim() !== "";

    return (
      !stripe ||
      !elements ||
      isProcessing ||
      paymentElementError ||
      !hasEmail ||
      (isNewCardSelected && !isPaymentElementComplete) ||
      (!isNewCardSelected && !isPaymentMethodSelected)
    );
  }, [
    stripe,
    elements,
    isProcessing,
    paymentElementError,
    isPaymentElementComplete,
    selectedPaymentMethod,
    email,
  ]);

  const confirmPayment = async (e: any) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async () => {
    if (!stripe || !elements) {
      return;
    }
    setShowConfirmationModal(false);
    setIsProcessing(true);

    const billingDetails = {
      email: shippingDetails.email,
      phone: shippingDetails.contact,
      name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
      address: {
        line1: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state!,
        postal_code: shippingDetails.code,
      },
    };

    try {
      let paymentIntentResult: any;

      if (selectedPaymentMethod === "new" || !email) {
        paymentIntentResult = await stripe.confirmPayment({
          elements,
          confirmParams: {
            payment_method_data: {
              billing_details: billingDetails,
            },
            receipt_email: shippingDetails.email,
            return_url: "http://localhost:3000/cart?success=true",
          },
          redirect: "if_required",
        });
      } else {
        try {
          await updatePaymentMethod(selectedPaymentMethod, billingDetails);
        } catch (error) {
          console.error(error);
          setIsProcessing(false);
          return;
        }

        paymentIntentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: selectedPaymentMethod,
          receipt_email: shippingDetails.email,
          return_url: "http://localhost:3000/cart?success=true",
        });
      }

      if (paymentIntentResult.error) {
        toast.error(paymentIntentResult.error.message);
        setIsProcessing(false);
        return;
      }

      const paymentIntent = paymentIntentResult.paymentIntent;
      if (paymentIntent && email) {
        const res = await createOrder(
          cartItems,
          shippingDetails,
          paymentIntent.id,
          netAmount,
          session
        );

        if (res.success) {
          toast.success("Order placed successfully");
        } else {
          toast.error(res.error!!);
          setIsProcessing(false);
          return;
        }

        const paymentMethod = paymentIntent.payment_method;
        const result = await savePaymentMethod(paymentMethod, email);

        if (result.success) {
          if (result.message === "Payment method saved") {
            toast.success(result.message);
          }
        } else {
          toast.error(result.error!!);
          setIsProcessing(false);
          return;
        }

        router.replace("/cart?success=true");
      } else {
        router.replace("/cart?success=true");
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred while processing your payment."
      );
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setIsProcessing(false);
  };

  return (
    <>
      {!email && (
        <form className="sm:w-[60%] w-full flex-grow" onSubmit={confirmPayment}>
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
                className="rounded-md text-base font-semibold w-full"
                disabled={isDisabled}
                isLoading={isProcessing}
              >
                Pay ${netAmount.toFixed(2)}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
      {email && (
        <form className="sm:w-[60%] w-full flex-grow" onSubmit={confirmPayment}>
          <RadioGroup
            className="my-6"
            aria-label="Payment Methods"
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            {loadingPaymentMethods && <Spinner />}
            {paymentMethods.map((paymentMethod) => (
              <Card radius="sm" key={paymentMethod.id}>
                <CardBody>
                  <Radio key={paymentMethod.id} value={paymentMethod.id}>
                    {paymentMethod.card && (
                      <div className="flex justify-between items-center gap-4 capitalize">
                        <div className="flex flex-col">
                          <span className="text-gray-700 text-xs font-semibold">
                            {paymentMethod.card.brand}
                          </span>
                          <span className="text-gray-700 text-base font-semibold">
                            **** **** **** {paymentMethod.card.last4}
                          </span>
                        </div>

                        <span className="text-gray-500 text-sm">
                          {`${paymentMethod.card.exp_month}/${(paymentMethod.card.exp_year % 100).toString().padStart(2, "0")}`}
                        </span>
                      </div>
                    )}
                  </Radio>
                </CardBody>
              </Card>
            ))}
            <Radio className="m-1" value="new">
              Enter new card details
            </Radio>
          </RadioGroup>
          <Card
            isDisabled={selectedPaymentMethod !== "new"}
            radius="none"
            className="rounded-md mb-4"
          >
            <CardBody className="p-4">
              <PaymentElement />
            </CardBody>
          </Card>
          <div className="flex justify-center ">
            <Button
              type="submit"
              color={isDisabled ? "default" : "primary"}
              radius="none"
              size="md"
              className="rounded-md  text-base font-semibold w-full sm:w-[50%]"
              disabled={isDisabled}
              isLoading={isProcessing}
            >
              Pay ${netAmount.toFixed(2)}
            </Button>
          </div>
        </form>
      )}
      {showConfirmationModal && (
        <CustomModal
          isOpen={showConfirmationModal}
          onClose={handleCancel}
          confirmLabel="Confirm"
          onConfirm={handleConfirmation}
          label="Confirm Payment"
          message="Are you sure you want to proceed with this payment?"
          alertMessage={
            email
              ? undefined
              : "You are currently checking out as a guest, your information won't be saved"
          }
        />
      )}
    </>
  );
};

const PaymentForms = () => {
  const { data: session } = useSession();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const paymentIntent = useCartStore((state) => state.paymentIntent);
  const netAmount = useCartStore((state) => state.netAmount);
  const setPaymentIntent = useCartStore((state) => state.setPaymentIntent);
  const shippingDetails = useCartStore((state) => state.shippingDetails);

  useEffect(() => {
    const fetchData = async () => {
      if (!paymentIntent?.clientSecret && cartItems && shippingDetails) {
        const result = await createPaymentIntent(
          netAmount(),
          shippingDetails,
          session?.user?.email!
        );
        if (result) {
          setPaymentIntent(result);
        }
      }
    };

    fetchData();
  }, [paymentIntent, cartItems, netAmount, shippingDetails]);

  if (!paymentIntent?.clientSecret || !cartItems) {
    return (
      <div className="flex justify-center items-center py-4">
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
      </div>
    );
  }

  const { clientSecret } = paymentIntent;

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe" } }}
      >
        <CardForms
          netAmount={netAmount()}
          session={session!!}
          shippingDetails={shippingDetails!}
          clientSecret={clientSecret}
          cartItems={cartItems}
        />
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
