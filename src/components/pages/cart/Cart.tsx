"use client";

import { useStore } from "@/store/useStore";
import useCartStore, { CartState } from "@/store/cart";
import DeleteIcon from '@mui/icons-material/Delete'; 

const Cart = () => {
  const cartStore = useStore<CartState, CartState>(
    useCartStore,
    (state) => state
  );
  if (!cartStore) return null;

  const {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = cartStore;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <ul className="list-none p-0">
        {cartItems.map((item) => (
          <li key={item.id} className=" rounded-lg p-2 mb-2 flex items-start">
            <div className="w-24 h-24 bg-gray-200 border border-black rounded-md mr-4"></div> {/* This div represents the picture placeholder */}
            <div className="flex-grow">
              <strong className="block font-semibold">{item.name}</strong>
              <span className="block">Price: ${item.price.toFixed(2)} x {item.quantity}</span>
              <div className="mt-2 flex">
                <button onClick={() => incrementQuantity(item.id)} className="mr-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  +
                </button>
                <button onClick={() => decrementQuantity(item.id)} className="mr-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  -
                </button>
                <button onClick={() => removeFromCart(item.id)} className=" hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                  <DeleteIcon className="text-black"/>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="font-bold">
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ).toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
