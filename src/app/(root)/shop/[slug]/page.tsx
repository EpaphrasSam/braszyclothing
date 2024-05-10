import Shop from "@/components/pages/shop/Shop";
import { getAllProductsByCategory } from "@/services/sanityServices";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string };
}) {
  const { AllProducts, error } = await getAllProductsByCategory(
    params.slug,
    { apparel: searchParams?.apparel },
    "a-z"
  );

  return (
    <div className="sm:m-10 m-5">
      <Shop
        allProducts={AllProducts}
        slug={params.slug}
        apparel={searchParams?.apparel}
      />
    </div>
  );
}
