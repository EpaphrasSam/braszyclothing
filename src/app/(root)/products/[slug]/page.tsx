import Product from "@/components/pages/products/Product";
import { getProduct } from "@/services/sanityServices";

export const revalidate = 0;

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
