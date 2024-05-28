import ShippingAddressForm from "@/components/pages/shipping-address/ShippingAddressForm";
import { getShippingAddress } from "@/services/orderServices";
import { auth } from "@/utils/auth/auth";

export default async function ShippingAddress() {
  const session = await auth();
  const { addresses, error } = await getShippingAddress(session?.user.id!);
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-3xl rounded-lg p-8">
        <ShippingAddressForm session={session} addresses={addresses} />
      </div>
    </div>
  );
}
