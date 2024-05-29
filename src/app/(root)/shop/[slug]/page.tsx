import Shop from "@/components/pages/shop/Shop";
import { getAllProductsByCategory } from "@/services/sanityServices";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string };
}) {
  const { AllProducts, totalPages, error } = await getAllProductsByCategory(
    params.slug,
    searchParams?.apparel ? { apparel: searchParams?.apparel } : {},
    "a-z",
    searchParams?.page ? Number(searchParams.page) : 1,
    10
  );

  return (
    <Suspense>
      <div className="sm:m-10 m-5">
        <Shop
          allProducts={AllProducts}
          slug={params.slug}
          search={searchParams}
          total={totalPages!}
        />
      </div>
    </Suspense>
  );
}
