import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { initialCartItems } from "@/lib/constants/cartItems";
import { ProductCardType } from "@/types/ProductCardType";

export interface CartState {
  cartItems: ProductCardType[];
  addToCart: (item: ProductCardType) => void;
  removeFromCart: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: initialCartItems,
      addToCart: (item) =>
        set((state) => ({
          cartItems: state.cartItems.some((cartItem) => cartItem.id === item.id)
            ? state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
                  : cartItem
              )
            : [...state.cartItems, { ...item, quantity: 1 }],
        })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),
      incrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          ),
        })),
      decrementQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
