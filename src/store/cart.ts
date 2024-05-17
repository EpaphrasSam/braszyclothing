import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductType } from "@/types/SanityTypes";

export interface CartState {
  cartItems: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  totalAmount: (items: ProductType[]) => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
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
            .filter((item) => item.quantity! > 0),
        })),
      totalAmount: (items: ProductType[]) =>
        items.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
