"use client";

import React, { SetStateAction, useEffect, useMemo, useReducer } from "react";
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
import { filterReducer } from "@/lib/reducers/filterReducer";

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: any;
  filters: any;
  setFilters: React.Dispatch<SetStateAction<{}>>;
  slug: string;
};

const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  slug,
  setFilters,
}: FilterDrawerProps) => {
  const [tempFilters, dispatch] = useReducer(filterReducer, {});

  useEffect(() => {
    dispatch({ type: "APPLY_ALL", payload: filters });
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
    dispatch({ type: "SET_PRICE", payload: newPrice });
  };

  const handleApparelChange = (newValue: string[]) => {
    dispatch({ type: "SET_APPAREL", payload: newValue });
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
      dispatch({ type: "SET_ERROR", payload: validation });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { fromError: null, toError: null },
      });
    }
  }, [validation]);

  const handleApply = () => {
    setFilters(tempFilters);
    onClose();
  };

  const handleRemove = () => {
    setFilters({});
    onClose();
  };

  const isDisabled = (): boolean => {
    return !!tempFilters.error;
  };

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
            <div className="flex flex-col gap-4 scrollbar-hide scrollbar-thumb-gray-500  overflow-y-auto flex-grow">
              <Accordion variant="light" selectionMode="multiple">
                <AccordionItem title="Product" key="product">
                  <CheckboxGroup
                    className="px-5 py-3"
                    aria-label="Select Apparel"
                    value={
                      Array.isArray(tempFilters.apparel)
                        ? tempFilters.apparel
                        : tempFilters.apparel
                          ? [tempFilters.apparel]
                          : []
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
                  <div className="px-5">
                    The highest price is ${data?.highestPrice}
                  </div>
                  <div className="flex gap-5 justify-evenly px-5 py-3">
                    <Input
                      startContent="$"
                      variant="bordered"
                      radius="sm"
                      label="From"
                      type="number"
                      value={
                        tempFilters.price && tempFilters.price[0] !== null
                          ? tempFilters.price[0]
                          : ""
                      }
                      onChange={(e) => handlePriceChange(e.target.value, 0)}
                      isInvalid={!!tempFilters.error?.fromError}
                      errorMessage={tempFilters.error?.fromError}
                    />
                    <Input
                      startContent="$"
                      variant="bordered"
                      radius="sm"
                      label="To"
                      type="number"
                      value={
                        tempFilters.price && tempFilters.price[1] !== null
                          ? tempFilters.price[1]
                          : ""
                      }
                      max={data?.highestPrice}
                      isInvalid={!!tempFilters.error?.toError}
                      errorMessage={tempFilters.error?.toError}
                      onChange={(e) => handlePriceChange(e.target.value, 1)}
                    />
                  </div>
                </AccordionItem>
                <AccordionItem title="Stock" key="stock">
                  <div
                    className="px-5 py-3 flex flex-col "
                    aria-label="Select Stock"
                  >
                    <Checkbox
                      className="mb-4"
                      radius="none"
                      size="md"
                      isSelected={tempFilters.inStock === "true"}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_INSTOCK",
                          payload: e.target.checked ? "true" : "",
                        })
                      }
                    >
                      In Stock
                    </Checkbox>
                    <Checkbox
                      className="mb-4"
                      radius="none"
                      size="md"
                      isSelected={tempFilters.inStock === "false"}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_INSTOCK",
                          payload: e.target.checked ? "false" : "",
                        })
                      }
                    >
                      Sold Out
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem title="Latest" key="latest">
                  <div className="px-5 py-3">
                    <Checkbox
                      className="mb-4"
                      radius="none"
                      size="md"
                      isSelected={tempFilters?.newRelease === true}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_NEWRELEASE",
                          payload: e.target.checked,
                        })
                      }
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
            <button
              className="text-base underline underline-offset-4 transition ease-in-out duration-300 hover:scale-110 hover:opacity-75"
              onClick={handleRemove}
            >
              Remove All
            </button>
            <Button
              radius="none"
              size="lg"
              className={
                isDisabled()
                  ? "bg-gray-600 text-white px-16"
                  : "bg-black text-white px-16"
              }
              isDisabled={isDisabled()}
              onClick={handleApply}
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
