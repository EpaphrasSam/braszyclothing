import Product from "@/components/pages/products/Product";
import { menProducts } from "@/lib/constants/products";
import { getProduct } from "@/services/sanityServices";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { product, error } = await getProduct(params.slug);
  return (
    <div className="bg-white sm:m-10 m-5 ">
      <Product product={product!} />
    </div>
  );
}
