import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductType } from "@/types/SanityTypes";

export interface PaymentIntentType {
  amount: number;
  clientSecret: string | null;
  fee: number;
  netAmount: number;
}

export interface ShippingDetails {
  email: string;
  contact: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state?: string;
  city: string;
  code: string;
}

export interface CartState {
  cartItems: ProductType[];
  paymentIntent: PaymentIntentType | null;
  shippingDetails: ShippingDetails | null;
  discount: number;
  setPaymentIntent: (paymentIntent: PaymentIntentType | null) => void;
  setShippingDetails: (details: ShippingDetails) => void;
  setDiscount: (discount: number) => void;
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  totalAmount: () => number;
  netAmount: () => number;
  resetCart: () => void;
  resetAmount: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      paymentIntent: null,
      shippingDetails: null,
      discount: 0,
      setPaymentIntent: (paymentIntent) => set({ paymentIntent }),
      setShippingDetails: (details) => set({ shippingDetails: details }),
      setDiscount: (discount) => set({ discount }),
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
      totalAmount: () =>
        get().cartItems.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
          0
        ),
      netAmount: () => {
        const totalAmount = get().totalAmount();
        const discount = get().discount;
        const fee = get().paymentIntent?.fee || 0;
        return totalAmount + fee - discount;
      },
      resetAmount: () => set({ paymentIntent: null, discount: 0 }),
      resetCart: () =>
        set({
          paymentIntent: null,
          discount: 0,
          cartItems: [],
          shippingDetails: null,
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
