"use client";

import { useStore } from "@/store/useStore";
import useCartStore, { CartState } from "@/store/cart";

const Cart = () => {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);

  const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCartStore((state) => ({
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
    }));

  const dummyItem = {
    id: "4",
    name: "Orange",
    price: 1.29,
    quantity: 1,
    imageUrls: [""],
    category: "",
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={() => addToCart(dummyItem)}>Add Orange to Cart</button>
      <ul>
        {cartItems &&
          cartItems.map((item) => (
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
        {cartItems &&
          cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
      </div>
    </div>
  );
};

export default Cart;
