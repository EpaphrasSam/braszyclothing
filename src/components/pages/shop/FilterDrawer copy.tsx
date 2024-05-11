"use client";

import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { Drawer } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import {
  Button,
  Divider,
  Accordion,
  AccordionItem,
  Spinner,
  Checkbox,
  CheckboxGroup,
  Input,
} from "@nextui-org/react";
import { getUniqueApparelsAndPrices } from "@/services/sanityServices";
import useSWR from "swr";

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: any;
  filters: any;
  setFilters: React.Dispatch<SetStateAction<{}>>;
  slug: string;
};

const initialError = { fromError: null, toError: null };

const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  slug,
  setFilters,
}: FilterDrawerProps) => {
  const [tempFilters, setTempFilters] = useState<any>({});
  const [error, setError] = useState<{
    fromError: string | null;
    toError: string | null;
  }>(initialError);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const fetcher = async () => {
    const { apparel, highestPrice, error } =
      await getUniqueApparelsAndPrices(slug);

    if (error) {
      throw error;
    }

    return { apparel, highestPrice };
  };

  const {
    data,
    error: Error,
    isLoading,
  } = useSWR(`/api/products?slug=${slug}/&filters=${filters}`, fetcher);

  const handlePriceChange = (value: string, index: number) => {
    const newPrice = [...(tempFilters.price || [null, null])];

    newPrice[index] = value ? value : null;

    if (newPrice.every((val) => val === null)) {
      const { price, ...rest } = tempFilters;
      setTempFilters(rest);
    } else {
      setTempFilters({
        ...tempFilters,
        price: newPrice,
      });
    }
  };

  const handleInStockChange = (newValue: string[]) => {
    if (newValue.length === 0) {
      const { inStock, ...rest } = tempFilters;
      setTempFilters(rest);
    } else {
      setTempFilters({
        ...tempFilters,
        inStock: newValue.length > 1 ? newValue : newValue[0],
      });
    }
  };

  const handleApparelChange = (newValue: string[]) => {
    if (newValue.length === 0) {
      const { apparel, ...rest } = tempFilters;
      setTempFilters(rest);
    } else {
      setTempFilters({
        ...tempFilters,
        apparel: newValue,
      });
    }
  };

  const validation = useMemo(() => {
    if (!tempFilters.price) return;

    const fromValue = tempFilters.price ? tempFilters.price[0] : null;
    const toValue = tempFilters.price ? tempFilters.price[1] : null;

    let fromError = null;
    let toError = null;

    if (!fromValue && toValue) {
      fromError = "This field is required";
    } else if (Number(fromValue) >= Number(toValue)) {
      fromError = "Price should not be higher/equal";
    }

    if (!toValue && fromValue) {
      toError = "This field is required";
    } else if (data?.highestPrice && Number(toValue) > data.highestPrice) {
      toError = `Price should not be higher than $${data.highestPrice}`;
    }

    return { fromError, toError };
  }, [tempFilters.price, data?.highestPrice]);

  useEffect(() => {
    if (validation !== undefined) {
      setError(validation);
    } else {
      setError(initialError);
    }
  }, [validation]);

  console.log(tempFilters);

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            width: "370px",
          },
        }}
        anchor="left"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between">
            <div className="w-0"></div>
            <div className="flex justify-center items-center">
              <span className="mr-2 text-xl font-semibold">Filter</span>
            </div>
            <div className="flex justify-end">
              <IoCloseOutline
                size={28}
                className="cursor-pointer hover:opacity-75 "
                onClick={onClose}
              />
            </div>
          </div>
          <Divider className="my-4" />
          {isLoading ? (
            <div className="h-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 scrollbar-hide scrollbar-thumb-gray-500  overflow-y-scroll flex-grow">
              <Accordion variant="light" selectionMode="multiple">
                <AccordionItem title="Product Type" key="productType">
                  <CheckboxGroup
                    className="px-5 py-3"
                    aria-label="Select Apparel"
                    value={
                      Array.isArray(tempFilters.apparel)
                        ? tempFilters.apparel
                        : [tempFilters.apparel]
                    }
                    onValueChange={handleApparelChange}
                  >
                    {data?.apparel?.map((apparel: any) => (
                      <Checkbox
                        className="mb-4"
                        radius="none"
                        size="md"
                        key={apparel.slug}
                        value={apparel.slug}
                      >
                        {apparel.title}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>
                <AccordionItem title="Price" key="price">
                  <div className="flex gap-5 justify-evenly px-5 py-3">
                    <Input
                      startContent="$"
                      variant="bordered"
                      radius="sm"
                      label="From"
                      type="number"
                      value={tempFilters.price ? tempFilters.price[0] : ""}
                      onChange={(e) => handlePriceChange(e.target.value, 0)}
                      isInvalid={!!error.fromError}
                      errorMessage={error.fromError}
                    />
                    <Input
                      startContent="$"
                      variant="bordered"
                      radius="sm"
                      label="To"
                      type="number"
                      value={tempFilters.price ? tempFilters.price[1] : ""}
                      max={data?.highestPrice}
                      description={`Highest Price: $${data?.highestPrice}`}
                      isInvalid={!!error.toError}
                      errorMessage={error.toError}
                      onChange={(e) => handlePriceChange(e.target.value, 1)}
                    />
                  </div>
                </AccordionItem>
                <AccordionItem title="Stock" key="stock">
                  <CheckboxGroup
                    className="px-5 py-3"
                    aria-label="Select Stock"
                    value={
                      Array.isArray(tempFilters.inStock)
                        ? tempFilters.inStock
                        : [tempFilters.inStock]
                    }
                    onValueChange={handleInStockChange}
                  >
                    <Checkbox
                      key={"true"}
                      className="mb-4"
                      radius="none"
                      size="md"
                      value="true"
                    >
                      In Stock
                    </Checkbox>
                    <Checkbox
                      key={"false"}
                      className="mb-4"
                      radius="none"
                      size="md"
                      value="false"
                    >
                      Out of Stock
                    </Checkbox>
                  </CheckboxGroup>
                </AccordionItem>
                <AccordionItem title="Latest" key="latest">
                  <div className="px-5 py-3">
                    <Checkbox
                      className="mb-4"
                      radius="none"
                      size="md"
                      value={tempFilters?.newRelease}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTempFilters((prev: any) => ({
                            ...prev,
                            newRelease: e.target.checked,
                          }));
                        } else {
                          const { newRelease, ...rest } = tempFilters;
                          setTempFilters(rest);
                        }
                      }}
                    >
                      Latest
                    </Checkbox>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          <Divider className="my-4" />
          <div className="p-4 flex gap-4 justify-center">
            <button className="text-base underline underline-offset-4 transition ease-in-out duration-300 hover:scale-110 hover:opacity-75">
              Remove All
            </button>
            <Button
              radius="none"
              size="lg"
              className="bg-black text-white px-16"
            >
              Apply
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
