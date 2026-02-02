import Product from "@/components/pages/products/Product";
import { getProduct } from "@/services/sanityServices";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { product, error } = await getProduct(slug);
  return (
    <div className="bg-white sm:m-10 m-5 ">
      <Product product={product!} />
    </div>
  );
}
