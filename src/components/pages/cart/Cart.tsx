"use client";

import { useStore } from "@/store/useStore";
import useCartStore, { CartState } from "@/store/cart";

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

  const dummyItem = { id: "4", name: "Orange", price: 1.29, quantity: 1 };

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={() => addToCart(dummyItem)}>Add Orange to Cart</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </div>
    </div>
  );
};

export default Cart;
