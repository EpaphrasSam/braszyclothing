"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  Input,
  Spinner,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { addEmailToNewsletter } from "@/services/emailServices";
import useCartStore from "@/store/cart";
import {
  countriesWithCurrency,
  getCurrencyByCountry,
} from "@/helpers/currencyConverter";
import { useStore } from "@/store/useStore";
import { getUserLocation, getExchangeRates } from "@/services/otherApiServices";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setCurrency = useCartStore((state) => state.setCurrency);
  const setExchangeRates = useCartStore((state) => state.setExchangeRates);
  const setCountry = useCartStore((state) => state.setCountry);
  const currency = useStore(useCartStore, (state) => state.currency);
  const country = useStore(useCartStore, (state) => state.country);

  const userLocationFetcher = useCallback(async () => {
    if (country && currency) return null;
    const userCountry = await getUserLocation();
    return userCountry;
  }, [country, currency]);

  const exchangeRatesFetcher = useCallback(async () => {
    const rates = await getExchangeRates();
    return rates;
  }, []);

  const { data: userCountry, error: userCountryError } = useSWR(
    "userLocation",
    userLocationFetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const { data: exchangeRates, error: exchangeRatesError } = useSWR(
    "exchangeRates",
    exchangeRatesFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000, // Refresh every hour
    }
  );

  React.useEffect(() => {
    if (userCountry && !country && !currency) {
      const { currency: detectedCurrency } = getCurrencyByCountry(userCountry);
      setCountry(userCountry);
      setCurrency(detectedCurrency);
    }
    if (exchangeRates) {
      setExchangeRates(exchangeRates);
    }
  }, [
    userCountry,
    exchangeRates,
    country,
    currency,
    setCountry,
    setCurrency,
    setExchangeRates,
  ]);

  const countries = Object.entries(countriesWithCurrency)
    .flatMap(([currency, { countries }]) =>
      countries.map((country) => ({
        label: country.name,
        value: `${country.code}-${currency}`,
        countryCode: country.code,
        currency: currency,
      }))
    )
    .sort((a, b) => a.label.localeCompare(b.label));

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      const response = await addEmailToNewsletter(data.email);
      if (response.error) throw new Error(response.error);
      if (response.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage > 20 ? "Something went wrong" : errorMessage);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleCountryChange = (value: string) => {
    if (!value) return;
    const [selectedCountry, selectedCurrency] = value.split("-");
    setCurrency(selectedCurrency);
    setCountry(selectedCountry);
    window.location.reload();
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mx-auto w-full">
      <div className="container mx-auto px-4 md:block flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-8 text-center">
          <div className="mt-4">
            <Autocomplete
              label="Country"
              selectedKey={
                country && currency ? `${country}-${currency}` : undefined
              }
              onSelectionChange={(value) =>
                handleCountryChange(value as string)
              }
              radius="none"
              className="max-w-xs"
            >
              {countries.map((country) => (
                <AutocompleteItem key={country.value} value={country.value}>
                  {country.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-400 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-and-returns"
                  className="hover:text-gray-400 hover:underline"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-400 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-services"
                  className="hover:text-gray-400 hover:underline"
                >
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <Link
                href="https://www.facebook.com/profile.php?id=61558993027033"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://instagram.com/braszyclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://twitter.com/braszy957"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <RiTwitterXLine size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="flex flex-col justify-center items-center">
            <p className="mb-2">Subscribe to our email to receive discount</p>
            <div id="footer-subscribe">
              <Input
                type="email"
                label="Email"
                className="text-black mb-4 w-[350px]"
                variant="faded"
                radius="none"
                isInvalid={!!errors.email}
                value={watch("email")}
                errorMessage={errors.email?.message as string}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                endContent={
                  isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    <FaArrowRightLong
                      size={20}
                      color="black"
                      className="cursor-pointer hover:opacity-50 hover:scale-125 transition-all"
                      onClick={handleSubmit(onSubmit)}
                    />
                  )
                }
              />
            </div>
          </div>

          <p>
            &copy; {new Date().getFullYear()} Braszy Clothing. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
