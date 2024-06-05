import { ShippingDetails } from "@/store/cart";
import { ProductType } from "./SanityTypes";

export interface InvoiceProps {
  orderID: string;
  cartItems: (ProductType & { color: string; size: string })[];
  shippingDetails: ShippingDetails;
  totalAmount: number;
  discount: number;
  fee: number;
  shippingFee: number;
  netAmount: number;
}
