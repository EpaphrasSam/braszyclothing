import {
  Order,
  OrderItem,
  PaymentIntent,
  ShippingAddress,
} from "@prisma/client";

type MergedProduct = {
  id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
  color: string;
  size: string;
  quantity: number;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

export interface OrderWithProductDetails extends Order {
  items: (OrderItem & { product: Product })[];
  shippingAddress: ShippingAddress;
  paymentIntent: PaymentIntent | null;
}

export interface Orders {
  id: string;
  shippingAddress: ShippingAddress;
  products: MergedProduct[];
  paymentIntent: PaymentIntent | null;
  shippingMethod: string;
  shippingStatus: string;
  userId?: string;
  userName?: string;
  isUser?: boolean;
  guestId?: string;
  guestEmail?: string;
  isGuest?: boolean;
  createdAt: Date;
  orderID: string;
}
