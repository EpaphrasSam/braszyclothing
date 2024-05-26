"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { ShippingDetails } from "@/store/cart";
import { countries, provinces, states } from "@/lib/constants/countries";
import { Session } from "next-auth";

interface ShippingAddressFormProps {
  addresses: ShippingDetails[];
  setDetails: any;
  errors: any;
  session: Session | null;
  clearErrors: any;
  formDefaultValues: ShippingDetails;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  addresses,
  setDetails,
  errors,
  session,
  clearErrors,
  formDefaultValues,
}: ShippingAddressFormProps) => {
  const [selected, setSelected] = useState<ShippingDetails | null>(null);
  const { control, watch, handleSubmit, setValue, reset } =
    useForm<ShippingDetails>({
      defaultValues: formDefaultValues,
    });

  const country = watch("country");

  const compareAddresses = useCallback(
    ({ email, contact, ...rest }: ShippingDetails, addr: ShippingDetails) => {
      console.log(addr, rest);
      return Object.keys(rest).every(
        (key) =>
          rest[key as keyof typeof rest] === addr[key as keyof typeof addr]
      );
    },
    []
  );

  useEffect(() => {
    if (session && addresses.length > 0) {
      const matchedAddress = addresses.find((addr) =>
        compareAddresses(formDefaultValues, addr)
      );
      if (matchedAddress) {
        console.log(matchedAddress);
        setSelected(matchedAddress);
        reset(matchedAddress);
      } else {
        setSelected(null);
        reset(formDefaultValues);
      }
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

      (
        Object.keys(selectedAddress).filter((key) =>
          isNaN(Number(key))
        ) as Array<keyof Partial<ShippingDetails>>
      ).forEach((key) => {
        setDetails(key, selectedAddress[key]);
      });

      reset(selectedAddress);
    }
  };

  const handleCountryChange = (value: string) => {
    setDetails("country", value);
    setValue("country", value);
    setValue("state", "");
  };

  const handleFormSubmit = (data: ShippingDetails) => {
    console.log(data);
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
          <div className="flex space-x-4">
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
                  errorMessage={errors.firstName?.message as string}
                  isInvalid={!!errors.firstName}
                  onChange={(e) => {
                    field.onChange(e);
                    setDetails("firstName", e.target.value);
                    clearErrors("firstName");
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
                  errorMessage={errors.lastName?.message as string}
                  isInvalid={!!errors.lastName}
                  onChange={(e) => {
                    field.onChange(e);
                    setDetails("lastName", e.target.value);
                    clearErrors("lastName");
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
                errorMessage={errors.address?.message as string}
                isInvalid={!!errors.address}
                onChange={(e) => {
                  field.onChange(e);
                  setDetails("address", e.target.value);
                  clearErrors("address");
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
                    clearErrors("country");
                  }}
                  errorMessage={errors.country?.message as string}
                  isInvalid={!!errors.country}
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
                    variant="bordered"
                    label={country === "Canada" ? "Province" : "State"}
                    radius="sm"
                    size="lg"
                    selectedKeys={[watch("state")!]}
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
                      setDetails("state", event.target.value);
                      clearErrors("state");
                    }}
                    errorMessage={errors.state?.message as string}
                    isInvalid={!!errors.state}
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
                  errorMessage={errors.city?.message as string}
                  isInvalid={!!errors.city}
                  onChange={(e) => {
                    field.onChange(e);
                    setDetails("city", e.target.value);
                    clearErrors("city");
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
                  errorMessage={errors.code?.message as string}
                  isInvalid={!!errors.code}
                  onChange={(e) => {
                    field.onChange(e);
                    setDetails("code", e.target.value);
                    clearErrors("code");
                  }}
                />
              )}
            />
          </div>
          {session && (
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-black text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
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
