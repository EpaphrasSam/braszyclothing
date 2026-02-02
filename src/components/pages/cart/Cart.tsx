"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/cart";
import {
  Button,
  Divider,
  Spinner,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { convertCurrency, formatCurrency } from "@/helpers/currencyConverter";

const Cart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const cartItems = useStore(useCartStore, (state) => state.cartItems);

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    totalAmount,
    resetCart,
    updateItemColor,
    updateItemSize,
  } = useCartStore((state) => ({
    removeFromCart: state.removeFromCart,
    incrementQuantity: state.incrementQuantity,
    decrementQuantity: state.decrementQuantity,
    totalAmount: state.totalAmount,
    resetCart: state.resetCart,
    updateItemColor: state.updateItemColor,
    updateItemSize: state.updateItemSize,
  }));

  useEffect(() => {
    if (success) {
      toast.success("Payment has been made successfully", {
        id: success,
        duration: 5000,
      });
      router.push("/cart");
      resetCart();
    }

    if (error) {
      toast.error("Payment failed", {
        id: error,
        duration: 5000,
      });
      router.push("/cart");
    }
  }, [success, router, error]);

  const pages = Math.ceil(cartItems ? cartItems?.length / rowsPerPage : 0);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return cartItems?.slice(start, end);
  }, [page, cartItems]);

  const handleCheckout = () => {
    router.push(`/checkouts/information`);
  };

  const { currency, exchangeRates } = useCartStore((state) => ({
    currency: state.currency,
    exchangeRates: state.exchangeRates,
  }));

  const displayPrice = (price: number) => {
    if (!exchangeRates) return `CAD ${price.toFixed(2)}`;
    const convertedPrice = convertCurrency(
      price,
      "CAD",
      currency,
      exchangeRates
    );
    return formatCurrency(convertedPrice, currency);
  };

  if (!cartItems)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="py-5 sm:px-5 px-3  h-full">
      {cartItems && cartItems.length === 0 ? (
        <div className="h-screen flex justify-center items-center">
          <div className="flex items-center justify-center flex-col gap-y-6">
            <div className="text-xl text-gray-600 tracking-wider font-semibold">
              YOUR CART IS EMPTY
            </div>
            <Button
              onClick={() => router.push("/")}
              color="primary"
              radius="none"
              size="lg"
              className="w-[200px]"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex mb-12 mt-6 justify-between items-center">
            <p className="text-base text-gray-600 font-semibold">YOUR CART</p>
            <p
              onClick={() => router.push("/")}
              className="underline underline-offset-4 transition ease-in-out duration-300 cursor-pointer hover:scale-110"
            >
              Continue Shopping
            </p>
          </div>

          <Table
            aria-label="Your Cart"
            bottomContent={
              pages > 1 && (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn className="max-md:hidden">Quantity</TableColumn>
              <TableColumn>Total</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex w-full relative">
                      <Image
                        src={
                          item.mediaUrls?.find(
                            (media) => media.type === "image"
                          )?.url ??
                          item.mediaUrls?.[0]?.url ??
                          ""
                        }
                        alt={item.name || "Product Image"}
                        width={80}
                        height={80}
                        className="w-24 h-24 object-cover object-center rounded-sm"
                        onClick={() => router.push(`/products/${item.slug}`)}
                      />

                      <div className="flex flex-col ml-1 w-40">
                        <div className="flex flex-col ml-2 w-40">
                          <div className="text-sm text-gray-700 font-semibold w-32">
                            {item.name}
                          </div>
                          <div className="w-32 ">
                            <span className="text-sm font-semibold text-gray-500">
                              {displayPrice(item.price)}
                            </span>
                            {item.oldPrice && (
                              <span className="ml-1 line-through text-xs">
                                ${item.oldPrice}
                              </span>
                            )}
                            <div className="flex gap-4 mt-1">
                              <Dropdown>
                                <DropdownTrigger>
                                  <div className="capitalize flex items-center cursor-pointer hover:opacity-75 transition ease-in-out duration-300 scale-105">
                                    Size
                                    {/* <IoIosArrowDown color="gray" /> */}
                                    {": "}
                                  </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Sizes"
                                  variant="flat"
                                  disallowEmptySelection
                                  selectionMode="single"
                                  selectedKeys={[item.size]}
                                  onSelectionChange={(key: any) =>
                                    updateItemSize(item.id, key.currentKey)
                                  }
                                >
                                  {item.sizes.map((size) => (
                                    <DropdownItem
                                      className="capitalize"
                                      key={size}
                                    >
                                      {size}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </Dropdown>
                              <div className="text-gray-600 font-semibold">
                                {item.size}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dropdown>
                                <DropdownTrigger>
                                  <div className="capitalize flex items-center cursor-pointer hover:opacity-75 transition ease-in-out duration-300 scale-105">
                                    Color
                                    {/* <IoIosArrowDown color="gray" /> */}
                                    {": "}
                                  </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Colors"
                                  variant="flat"
                                  disallowEmptySelection
                                  selectionMode="single"
                                  selectedKeys={[item.color]}
                                  onSelectionChange={(key: any) =>
                                    updateItemColor(item.id, key.currentKey)
                                  }
                                >
                                  {item.colors.map((color) => (
                                    <DropdownItem
                                      className="capitalize"
                                      key={color}
                                    >
                                      {color}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </Dropdown>
                              <div className="text-gray-600 font-semibold capitalize">
                                {item.color}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:hidden flex-grow flex gap-1 mt-2 items-center justify-center my-2">
                          <div className="border-1 border-gray-400 border-solid grid grid-cols-3 items-center gap-7 p-3 px-4 sm:px-2">
                            <FiMinus
                              onClick={() => decrementQuantity(item.id)}
                              className="cursor-pointer hover:scale-105"
                            />
                            <span className="text-gray-500">
                              {item.quantity}
                            </span>
                            <FiPlus
                              onClick={() => incrementQuantity(item.id)}
                              className="mr-2 cursor-pointer hover:scale-110 hover:opacity-75 transition ease-in-out duration-300"
                            />
                          </div>
                          <MdDeleteOutline
                            size={24}
                            className="cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                            onClick={() => removeFromCart(item.id)}
                            color="red"
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-md:hidden">
                    <div className="flex gap-3 items-center">
                      <div className="border-1 border-gray-400 border-solid grid grid-cols-3 items-center gap-7 p-3 px-4">
                        <FiMinus
                          onClick={() => decrementQuantity(item.id)}
                          className="cursor-pointer hover:scale-105"
                        />
                        <span className="text-gray-500">{item.quantity}</span>
                        <FiPlus
                          onClick={() => incrementQuantity(item.id)}
                          className="mr-2 cursor-pointer hover:scale-110 hover:opacity-75 transition ease-in-out duration-300"
                        />
                      </div>
                      <MdDeleteOutline
                        size={24}
                        className="cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                        onClick={() => removeFromCart(item.id)}
                        color="red"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="flex items-start">
                    <span className="text-gray-500 font-semibold">
                      {displayPrice(item.price * item.quantity!)}
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Divider className="my-4" />

          <div className="w-full tracking-wide flex justify-end">
            <div>
              <div className="my-2 flex justify-between">
                <p className="text-lg text-gray-600 font-semibold">Total</p>
                <p className="text-lg text-gray-600 font-semibold">
                  {displayPrice(totalAmount())}
                </p>
              </div>
              <p className="mb-4 text-[13px] text-gray-400">
                Taxes, shipping and discounts calculated at checkout
              </p>
              <Button
                className="text-lg bg-black text-white rounded-sm"
                fullWidth
                radius="none"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
