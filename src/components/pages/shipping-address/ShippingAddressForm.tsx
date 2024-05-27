"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { ShippingDetails } from "@/store/cart";
import { countries, provinces, states } from "@/lib/constants/countries";
import { Session } from "next-auth";
import { validateShippingDetails } from "@/helpers/validators";
import { saveShippingAddress } from "@/services/cartServices";
import toast from "react-hot-toast";

interface ShippingAddressFormProps {
  addresses: ShippingDetails[];
  session: Session | null;
  setDetails?: any;
  Errors?: any;
  clearErrors?: any;
  formDefaultValues?: ShippingDetails;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  addresses,
  setDetails,
  Errors,
  session,
  clearErrors,
  formDefaultValues,
}: ShippingAddressFormProps) => {
  const [selected, setSelected] = useState<ShippingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<ShippingDetails>({
    defaultValues: formDefaultValues,
  });

  const country = watch("country");

  const compareAddresses = useCallback(
    ({ email, contact, ...rest }: ShippingDetails, addr: ShippingDetails) => {
      return Object.keys(rest).every(
        (key) =>
          rest[key as keyof typeof rest] === addr[key as keyof typeof addr]
      );
    },
    []
  );

  useEffect(() => {
    if (session && addresses.length > 0) {
      if (!formDefaultValues) {
        setSelected(addresses[0]);
        reset(addresses[0]);
      } else {
        const matchedAddress = addresses.find((addr) =>
          compareAddresses(formDefaultValues, addr)
        );
        if (matchedAddress) {
          setSelected(matchedAddress);
          reset(matchedAddress);
        } else {
          setSelected(null);
          reset(formDefaultValues);
        }
      }
    } else {
      if (formDefaultValues) {
        setSelected(null);
        reset(formDefaultValues);
      } else {
        setSelected(null);
        reset({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          country: "United States",
          code: "",
        });
      }
    }
  }, [addresses, session, formDefaultValues]);

  const handleAddressChange = (value: string) => {
    if (value === "add_new") {
      reset({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        country: "United States",
        code: "",
      });
      setSelected(null);
    } else {
      const index = parseInt(value, 10);
      const selectedAddress = addresses[index];
      setSelected(selectedAddress);

      if (setDetails) {
        (
          Object.keys(selectedAddress).filter((key) =>
            isNaN(Number(key))
          ) as Array<keyof Partial<ShippingDetails>>
        ).forEach((key) => {
          setDetails(key, selectedAddress[key]);
        });
      }

      reset(selectedAddress);
    }
    if (clearErrors) {
      clearErrors();
    }
  };

  const handleCountryChange = (value: string) => {
    if (setDetails) {
      setDetails("country", value);
    }
    setValue("country", value);
    setValue("state", "");
  };

  const handleFormSubmit = async (data: ShippingDetails) => {
    const validationErrors = validateShippingDetails(data);
    if (validationErrors) {
      Object.keys(validationErrors).forEach((field: any) => {
        setError(field, {
          type: "manual",
          message: validationErrors[field as keyof typeof validationErrors],
        });
      });
      return;
    }

    setIsLoading(true);

    const { message, error } = await saveShippingAddress(
      data,
      session?.user?.id as string
    );

    if (error) {
      toast.error(error);
    } else if (message) {
      toast.success(message);
    }

    setIsLoading(false);
  };

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

  return (
    <div>
      <div className="shadow-3xl rounded-lg">
        <div className="text-2xl text-gray-500 font-medium mb-8">
          Shipping address
        </div>
        {session && (
          <>
            <Select
              aria-label="Shipping Details"
              labelPlacement="outside"
              variant="bordered"
              className="pb-4 pt-2"
              classNames={{ value: "text-black" }}
              size="lg"
              radius="sm"
              disallowEmptySelection
              value={selected?.id || "add_new"}
              onChange={(e) => handleAddressChange(e.target.value)}
              selectedKeys={
                selected
                  ? [
                      addresses
                        .findIndex((a) => a.id === selected.id)
                        .toString(),
                    ]
                  : ["add_new"]
              }
            >
              {[
                ...addresses.map((address, index) => (
                  <SelectItem key={index.toString()} value={index.toString()}>
                    {`${address.firstName} ${address.lastName} - ${address.address}, ${address.country}, ${address.code}`}
                  </SelectItem>
                )),
                <SelectItem key="add_new" value="new">
                  Add New Address
                </SelectItem>,
              ]}
            </Select>
            <Divider className="mb-8" />
          </>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex sm:flex-row flex-col gap-4 items-center">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  type="text"
                  fullWidth
                  required
                  size="lg"
                  radius="sm"
                  label="First Name"
                  placeholder="First Name"
                  labelPlacement="outside"
                  errorMessage={
                    (Errors?.firstName?.message as string) ||
                    (errors?.firstName?.message as string)
                  }
                  isInvalid={!!Errors?.firstName || !!errors?.firstName}
                  onChange={(e) => {
                    field.onChange(e);
                    if (setDetails && clearErrors) {
                      setDetails("firstName", e.target.value);
                      clearErrors("firstName");
                    }
                  }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  type="text"
                  fullWidth
                  required
                  size="lg"
                  radius="sm"
                  label="Last Name"
                  placeholder="Last Name"
                  labelPlacement="outside"
                  errorMessage={
                    (Errors?.lastName?.message as string) ||
                    (errors?.lastName?.message as string)
                  }
                  isInvalid={!!Errors?.lastName || !!errors?.lastName}
                  onChange={(e) => {
                    field.onChange(e);
                    if (setDetails && clearErrors) {
                      setDetails("lastName", e.target.value);
                      clearErrors("lastName");
                    }
                  }}
                />
              )}
            />
          </div>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                type="text"
                fullWidth
                required
                size="lg"
                radius="sm"
                label="Address"
                placeholder="Address"
                labelPlacement="outside"
                errorMessage={
                  (Errors?.address?.message as string) ||
                  (errors?.address?.message as string)
                }
                isInvalid={!!Errors?.address || !!errors?.address}
                onChange={(e) => {
                  field.onChange(e);
                  if (setDetails && clearErrors) {
                    setDetails("address", e.target.value);
                    clearErrors("address");
                  }
                }}
              />
            )}
          />
          <div className="flex sm:flex-row flex-col gap-4 items-center">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  variant="bordered"
                  label="Country"
                  radius="sm"
                  size="lg"
                  selectedKeys={[watch("country")]}
                  labelPlacement="outside"
                  placeholder="Select your country"
                  className="text-black text-lg"
                  classNames={{ value: "text-black" }}
                  onChange={(event) => {
                    handleCountryChange(event.target.value);
                    if (clearErrors) {
                      clearErrors("country");
                    }
                  }}
                  errorMessage={
                    (Errors?.country?.message as string) ||
                    (errors?.country?.message as string)
                  }
                  isInvalid={!!Errors?.country || !!errors.country}
                >
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {country !== "United Kingdom" && (
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={watch("state") || ""}
                    variant="bordered"
                    label={country === "Canada" ? "Province" : "State"}
                    radius="sm"
                    size="lg"
                    selectedKeys={[watch("state") || ""]}
                    labelPlacement="outside"
                    placeholder={
                      country === "Canada"
                        ? "Select your province"
                        : "Select your state"
                    }
                    className="text-black text-lg"
                    classNames={{ value: "text-black" }}
                    onChange={(event) => {
                      field.onChange(event);
                      if (setDetails && clearErrors) {
                        setDetails("state", event.target.value);
                        clearErrors("state");
                      }
                    }}
                    errorMessage={
                      (Errors?.state?.message as string) ||
                      (errors?.state?.message as string)
                    }
                    isInvalid={Errors ? !!Errors.state : !!errors.state}
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
              />
            )}
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  type="text"
                  fullWidth
                  required
                  size="lg"
                  radius="sm"
                  label="City"
                  placeholder="City"
                  labelPlacement="outside"
                  errorMessage={
                    (Errors?.city?.message as string) ||
                    (errors?.city?.message as string)
                  }
                  isInvalid={!!Errors?.city || !!errors?.city}
                  onChange={(e) => {
                    field.onChange(e);
                    if (setDetails && clearErrors) {
                      setDetails("city", e.target.value);
                      clearErrors("city");
                    }
                  }}
                />
              )}
            />
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  type="text"
                  fullWidth
                  required
                  size="lg"
                  radius="sm"
                  label="Zip Code"
                  placeholder="Zip Code"
                  labelPlacement="outside"
                  errorMessage={
                    (Errors?.code?.message as string) ||
                    (errors?.code?.message as string)
                  }
                  isInvalid={!!Errors?.code || !!errors?.code}
                  onChange={(e) => {
                    field.onChange(e);
                    if (setDetails && clearErrors) {
                      setDetails("code", e.target.value);
                      clearErrors("code");
                    }
                  }}
                />
              )}
            />
          </div>
          {session && (
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-black w-full sm:w-[50%] text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                isLoading={isLoading}
              >
                Save Address
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
