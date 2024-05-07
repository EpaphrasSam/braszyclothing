import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/CartItems";

export interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
}

const initialCartItems: CartItem[] = [
  { id: "1", name: "Apple", price: 0.99, quantity: 3 },
  { id: "2", name: "Banana", price: 0.79, quantity: 2 },
  { id: "3", name: "Carrot", price: 0.5, quantity: 5 },
];

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: initialCartItems,
      addToCart: (item) =>
        set((state) => ({
          cartItems: state.cartItems.some((cartItem) => cartItem.id === item.id)
            ? state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            : [...state.cartItems, item],
        })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),
      incrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          ),
        })),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;