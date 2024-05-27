"use client";

import { useStore } from "@/store/useStore";
import useCartStore from "@/store/cart";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Divider,
} from "@nextui-org/react";

const CartDrawer = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);

  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    totalAmount,
    updateItemColor,
    updateItemSize,
  } = useCartStore((state) => ({
    removeFromCart: state.removeFromCart,
    incrementQuantity: state.incrementQuantity,
    decrementQuantity: state.decrementQuantity,
    totalAmount: state.totalAmount,
    updateItemColor: state.updateItemColor,
    updateItemSize: state.updateItemSize,
  }));

  const handleCheckout = () => {
    router.push(`/checkouts/information`);
  };

  // useEffect(() => {
  //   onClose();
  // }, [pathname]);

  return (
    <>
      {cartItems && cartItems.length === 0 ? (
        <div className="p-5 h-full flex justify-center items-center">
          <div className="flex items-center justify-center flex-col gap-y-6">
            <div className="text-xl text-gray-600 tracking-wider font-semibold">
              YOUR CART IS EMPTY
            </div>
            <Button
              onClick={onClose}
              color="primary"
              radius="none"
              className="w-[200px]"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-5 h-full flex flex-col">
          <div className="flex mb-8 justify-between items-center">
            <p className="text-base text-gray-600 font-semibold">YOUR CART</p>
            <IoCloseOutline
              size={30}
              className="cursor-pointer hover:opacity-75"
              onClick={onClose}
              color="gray"
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600 font-semibold">PRODUCT</p>
            <p className="text-xs text-gray-600 font-semibold">TOTAL</p>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-500  overflow-y-auto flex-grow">
            {cartItems &&
              cartItems.map((item, index) => (
                <>
                  <div key={item.id}>
                    <div className="flex w-full relative">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover object-center rounded-sm cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                        onClick={() => router.push(`/products/${item.slug}`)}
                      />

                      <div className="flex flex-col ml-4 w-40">
                        <div className="text-sm text-gray-700 font-semibold w-32">
                          {item.name}
                        </div>
                        <div className="w-32 ">
                          <span className="text-sm font-semibold text-gray-500">
                            ${item.price}
                          </span>
                          {item.oldPrice && (
                            <span className="ml-1 line-through text-xs">
                              ${item.oldPrice}
                            </span>
                          )}
                          <div className="flex gap-4 mt-2">
                            <Dropdown>
                              <DropdownTrigger>
                                <div className="capitalize text-base text-gray-500 flex items-center cursor-pointer hover:opacity-75 transition ease-in-out duration-300 scale-105">
                                  Size
                                  <IoIosArrowDown color="gray" />
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
                                <div className="capitalize text-base text-gray-500 flex items-center cursor-pointer hover:opacity-75 transition ease-in-out duration-300 scale-105">
                                  Color
                                  <IoIosArrowDown color="gray" />
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
                        <div className="flex gap-3 mt-2 items-center justify-center my-2">
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
                            size={30}
                            className="cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
                            onClick={() => removeFromCart(item.id)}
                            color="red"
                          />
                        </div>
                      </div>
                      <span className="absolute top-0 right-0 text-gray-500 font-semibold">
                        ${(item.price * item.quantity!).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {!cartItems?.length ||
                    (index !== cartItems.length - 1 && (
                      <Divider className="my-1" />
                    ))}
                </>
              ))}
          </div>
          <Divider className="my-4" />
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
      )}
    </>
  );
};

export default CartDrawer;
