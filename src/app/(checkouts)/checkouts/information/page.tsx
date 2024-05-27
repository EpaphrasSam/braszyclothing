import InformationForms from "@/components/pages/checkout/InformationForms";
import { getShippingAddress } from "@/services/cartServices";
import { auth } from "@/utils/auth/auth";

export default async function CheckoutInformationPage() {
  const session = await auth();
  const { addresses, error } = await getShippingAddress(session?.user.id!);
  return (
    <div>
      <InformationForms addresses={addresses} />
    </div>
  );
}
