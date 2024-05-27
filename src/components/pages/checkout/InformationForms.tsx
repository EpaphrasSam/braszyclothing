"use client";

import React, { useEffect, useMemo } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlinePhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { validateShippingDetails } from "@/helpers/validators";
import useCartStore, { ShippingDetails } from "@/store/cart";
import { useSession } from "next-auth/react";
import ShippingAddressForm from "../shipping-address/ShippingAddressForm";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { useStore } from "@/store/useStore";
import { ShippingAddress } from "@prisma/client";

const initialState = {
  shippingDetails: {
    email: "",
    contact: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "United States",
    code: "",
  },
};

type InformationFormsProps = {
  addresses: ShippingDetails[];
};

const InformationForms = ({ addresses }: InformationFormsProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const setShippingDetails = useCartStore((state) => state.setShippingDetails);
  const shippingDetails = useStore(
    useCartStore,
    (state) => state.shippingDetails
  );

  const formDefaultValues = useMemo(() => {
    const sessionDefaults = session
      ? {
          email: session.user.email || "",
          contact: session.user.contact || "",
        }
      : {};

    return {
      ...initialState.shippingDetails,
      ...shippingDetails,
      ...sessionDefaults,
    };
  }, [session, shippingDetails]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const validationErrors = validateShippingDetails(data);
    if (validationErrors) {
      Object.keys(validationErrors).forEach((field) => {
        setError(field, {
          type: "manual",
          message: validationErrors[field as keyof typeof validationErrors],
        });
      });
      return;
    }

    let shippingData: ShippingDetails = data as ShippingDetails;

    // if (data.country === "United Kingdom") {
    //   delete shippingData.state;
    // }

    setShippingDetails(shippingData);
    router.push("/checkouts/shipping");
  };

  return (
    <div className="px-5 pb-4">
      <div className="flex h-full flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl text-gray-500 font-medium">Contact</div>
          {!session && (
            <Link
              href="/login?redirect=/checkouts/information"
              className="text-sm font-medium underline underline-offset-2 hover:opacity-75"
            >
              Log in
            </Link>
          )}
        </div>

        <div className="flex sm:gap-3 sm:flex-row flex-col">
          <Input
            isReadOnly={!!session}
            variant="bordered"
            radius="sm"
            label="Email"
            size="lg"
            value={watch("email")}
            labelPlacement="outside"
            startContent={<CiMail size={24} />}
            placeholder="Enter your email"
            className="text-black text-lg py-3"
            errorMessage={errors.email?.message as string}
            isInvalid={!!errors.email}
            {...register("email")}
          />
          <Input
            isReadOnly={!!session}
            variant="bordered"
            radius="sm"
            label="Contact"
            size="lg"
            type="number"
            value={watch("contact")}
            labelPlacement="outside"
            startContent={<MdOutlinePhone size={24} />}
            placeholder="Enter your contact"
            className="text-black text-lg py-3"
            description="We'll use this to contact you during delivery"
            errorMessage={errors.contact?.message as string}
            isInvalid={!!errors.contact}
            {...register("contact")}
          />
        </div>
        <Divider className="my-6" />
        <ShippingAddressForm
          addresses={addresses}
          setDetails={setValue}
          session={session}
          Errors={errors}
          clearErrors={clearErrors}
          formDefaultValues={formDefaultValues}
        />
        <Divider className="my-4" />

        <div className="flex justify-between">
          <Link
            href={"/cart"}
            className="flex gap-2 items-center cursor-pointer hover:opacity-75 hover:underline underline-offset-4"
          >
            <IoChevronBack size={20} />
            <p>Return to Cart</p>
          </Link>
          <Button
            type="submit"
            radius="none"
            className="rounded-md text-base font-medium"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue to Shipping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationForms;
