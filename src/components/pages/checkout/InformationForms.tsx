"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlinePhone } from "react-icons/md";
import { countries, provinces, states } from "@/lib/constants/countries";
import useSWR from "swr";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateShippingDetails } from "@/helpers/validators";
import useCartStore, { ShippingDetails } from "@/store/cart";

const defaultShippingDetails: ShippingDetails = {
  email: "",
  contact: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  country: "",
  code: "",
};

const InformationForms = () => {
  const router = useRouter();
  const setShippingDetails = useCartStore((state) => state.setShippingDetails);
  const shippingDetails = useCartStore((state) => state.shippingDetails);
  const [manualChange, setManualChange] = useState(false);

  const formDefaultValues = useMemo(
    () =>
      shippingDetails && Object.keys(shippingDetails).length > 0
        ? shippingDetails
        : defaultShippingDetails,
    [shippingDetails]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: formDefaultValues,
  });

  const country = watch("country");

  // const fetcher = async () => {
  //   try {
  //     const response = await axios.post("/api/universal-tutorial/states", {
  //       country: country,
  //     });

  //     return response.data;
  //   } catch (error: any) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // };

  // const {
  //   data: states,
  //   error,
  //   isLoading,
  // } = useSWR(
  //   country && country !== "United Kingdom"
  //     ? ["/api/universal-tutorial/states", country]
  //     : null,
  //   fetcher
  // );

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues]);

  useEffect(() => {
    setValue("state", "");
  }, [manualChange]);

  const getStateOrProvinceOptions = () => {
    switch (country) {
      case "United States":
        return states;
      case "Canada":
        return provinces;
      case "United Kingdom":
        return [];
      default:
        return [];
    }
  };

  const handleCountryChange = (e: any) => {
    setValue("country", e.target.value);
    setManualChange(!manualChange);
  };

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

    if (data.country === "United Kingdom") {
      delete shippingData.state;
    }

    setShippingDetails(shippingData);
    router.push("/checkouts/shipping");
  };

  return (
    <div className="px-5 pb-4 ">
      <div className="flex h-full flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div className="text-2xl text-gray-500 font-medium">Contact</div>
            <div className="text-sm font-medium underline underline-offset-2 hover:opacity-75">
              Log in
            </div>
          </div>

          <div className="flex sm:gap-3 sm:flex-row flex-col">
            <Input
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
              description="We'll will use this to contact you during delivery"
              errorMessage={errors.contact?.message as string}
              isInvalid={!!errors.contact}
              {...register("contact")}
            />
          </div>
          <Divider className="my-6" />
          <div className="text-2xl text-gray-500 font-medium">
            Shipping Address
          </div>
          <div className="flex sm:gap-3 sm:flex-row flex-col">
            <Input
              variant="bordered"
              radius="sm"
              label="First Name"
              size="lg"
              labelPlacement="outside"
              value={watch("firstName")}
              placeholder="Enter your first name"
              className="text-black text-lg py-3"
              errorMessage={errors.firstName?.message as string}
              isInvalid={!!errors.firstName}
              {...register("firstName")}
            />
            <Input
              variant="bordered"
              radius="sm"
              label="Last Name"
              value={watch("lastName")}
              size="lg"
              labelPlacement="outside"
              placeholder="Enter your last name"
              className="text-black text-lg py-3"
              errorMessage={errors.lastName?.message as string}
              isInvalid={!!errors.lastName}
              {...register("lastName")}
            />
          </div>

          <div>
            <Input
              variant="bordered"
              radius="sm"
              label="Address"
              value={watch("address")}
              size="lg"
              labelPlacement="outside"
              placeholder="Enter your address"
              className="text-black text-lg py-3"
              errorMessage={errors.address?.message as string}
              isInvalid={!!errors.address}
              {...register("address")}
            />
          </div>
          <div className="flex sm:gap-3 sm:flex-row flex-col py-3 items-center">
            <Select
              variant="bordered"
              label="Country"
              radius="sm"
              size="lg"
              value={country}
              selectedKeys={[watch("country")]}
              labelPlacement="outside"
              placeholder="Select your country"
              className="text-black text-lg py-3"
              disallowEmptySelection
              {...register("country")}
              classNames={{ value: "text-black" }}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <SelectItem
                  className="text-black"
                  key={country.name}
                  value={country.name}
                >
                  {country.name}
                </SelectItem>
              ))}
            </Select>
            {country !== "United Kingdom" && (
              <Select
                variant="bordered"
                label={country === "Canada" ? "Province" : "State"}
                radius="sm"
                size="lg"
                value={watch("state")}
                selectedKeys={[watch("state")]}
                labelPlacement="outside"
                placeholder={
                  country === "Canada"
                    ? "Select your province"
                    : "Select your state"
                }
                className="text-black text-lg py-3"
                errorMessage={errors.state?.message as string}
                isInvalid={!!errors.state}
                classNames={{ value: "text-black" }}
                {...register("state")}
              >
                {getStateOrProvinceOptions().map((location) => (
                  <SelectItem
                    key={location.state_name}
                    value={location.state_name}
                  >
                    {location.state_name}
                  </SelectItem>
                ))}
              </Select>
            )}
            <Input
              label="City"
              placeholder="Enter your city"
              radius="sm"
              value={watch("city")}
              labelPlacement="outside"
              className="text-black text-lg py-3"
              size="lg"
              variant="bordered"
              errorMessage={errors.city?.message as string}
              isInvalid={!!errors.city}
              {...register("city")}
            />
            <Input
              label="Postal Code"
              placeholder="Enter your postal code"
              radius="sm"
              labelPlacement="outside"
              value={watch("code")}
              className="text-black text-lg py-3"
              size="lg"
              variant="bordered"
              errorMessage={errors.code?.message as string}
              isInvalid={!!errors.code}
              {...register("code")}
            />
          </div>
          <Divider className="my-4" />

          <div className="flex justify-between ">
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
            >
              Continue to Shipping
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationForms;
