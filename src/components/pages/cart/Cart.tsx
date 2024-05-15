"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/cart";
import { IoCloseOutline } from "react-icons/io5";
import { Button, Divider, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);

  const { removeFromCart, incrementQuantity, decrementQuantity } = useCartStore(
    (state) => ({
      removeFromCart: state.removeFromCart,
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
    })
  );

  const handleCheckout = () => {
    const id = 1;
    router.push(`/checkouts/${id}/information`);
  };

  if (!cartItems)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="p-5 h-full">
      {cartItems && cartItems.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex items-center justify-center flex-col gap-y-6">
            <div className="text-xl text-gray-600 tracking-wider font-semibold">
              YOUR CART IS EMPTY
            </div>
            <Button
              onClick={() => router.push("/")}
              color="primary"
              radius="none"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="text-xs text-gray-600 font-semibold">Product</div>
            <div className="max-md:hidden text-xs text-gray-600 font-semibold">
              Quantity
            </div>
            <div className="text-xs text-gray-600 font-semibold">Total</div>
            <Divider className="col-span-2 md:col-span-3 my-4" />
            {cartItems &&
              cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div>
                    <div className="flex w-full relative">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover object-center rounded-sm"
                      />
                      <div className="flex flex-col ml-4 w-40">
                        <div className="text-sm text-gray-700 font-semibold">
                          {item.name}
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
                        <div className="md:hidden flex gap-3 mt-8 items-center justify-center my-2">
                          <div className="border-1 border-gray-400 border-solid grid grid-cols-3 items-center gap-7 p-3 px-4">
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
                  </div>
                  <div className="col-span-1 max-md:hidden">
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
                  </div>
                  <div className="md:col-span-1">
                    <span className="text-gray-500 font-semibold">
                      ${(item.price * item.quantity!).toFixed(2)}
                    </span>
                  </div>
                </React.Fragment>
              ))}
          </div>

          <Divider className="my-4" />

          <div className="w-full tracking-wide flex justify-end">
            <div>
              <div className="my-2 flex justify-between">
                <p className="text-lg text-gray-600 font-semibold">Total</p>
                <p className="text-lg text-gray-600 font-semibold">
                  $
                  {cartItems &&
                    cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity!,
                        0
                      )
                      .toFixed(2)}
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
