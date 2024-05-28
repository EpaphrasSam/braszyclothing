import {
  Order,
  OrderItem,
  PaymentIntent,
  ShippingAddress,
} from "@prisma/client";

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
