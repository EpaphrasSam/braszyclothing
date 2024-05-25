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
} from "@nextui-org/react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Cart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const color = "blue";

  // const paymentIntent = searchParams.get("payment_intent");
  // const redirectStatus = searchParams.get("redirect_status");
  const success = searchParams.get("success");

  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    totalAmount,
    resetCart,
  } = useCartStore((state) => ({
    removeFromCart: state.removeFromCart,
    incrementQuantity: state.incrementQuantity,
    decrementQuantity: state.decrementQuantity,
    totalAmount: state.totalAmount,
    resetCart: state.resetCart,
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
  }, [success, router]);

  const pages = Math.ceil(cartItems ? cartItems?.length / rowsPerPage : 0);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return cartItems?.slice(start, end);
  }, [page, cartItems]);

  const handleCheckout = () => {
    router.push(`/checkouts/information`);
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
                        src={item.imageUrls[0]}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover object-center rounded-sm"
                      />

                      <div className="flex flex-col sm:ml-4 ml-2 w-40">
                        <div className="text-sm text-gray-700 font-semibold">
                          {item.name}
                          <span
                            className="block rounded-full w-4 h-4" // Increased size for better visibility
                            style={{ backgroundColor: color.toLowerCase() }}
                          ></span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-500">
                            ${item.price}
                          </span>
                          {item.oldPrice && (
                            <span className="ml-1 line-through text-xs">
                              ${item.oldPrice}
                            </span>
                          )}
                        </div>
                        <div className="md:hidden flex-grow flex gap-1 mt-8 items-center justify-center my-2">
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
                      ${(item.price * item.quantity!).toFixed(2)}
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
                  ${totalAmount().toFixed(2)}
                </p>
              </div>
              <p className="mb-4 text-[13px] text-gray-400">
                Taxes, shipping and discounts calculated at checkout
              </p>
              <Button
                className="text-lg rounded-sm"
                fullWidth
                color="secondary"
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
