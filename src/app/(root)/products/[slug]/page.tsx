import Product from "@/components/pages/products/Product";
import { menProducts } from "@/lib/constants/products";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="bg-white sm:m-10 m-5 ">
      <Product product={menProducts[0]} />
    </div>
  );
}
