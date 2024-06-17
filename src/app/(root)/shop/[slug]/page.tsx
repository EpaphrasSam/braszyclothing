import Shop from "@/components/pages/shop/Shop";
import { getAllProductsByCategory } from "@/services/sanityServices";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Braszy Clothing",
  description:
    "Explore a wide range of products at Braszy Clothing's online store.",
  keywords: "shop, clothing, fashion, online store",
  alternates: {
    canonical: "https://www.braszyclothing.com/shop",
  },
};

export const revalidate = 0;

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
      <div className="sm:mx-10 my-10 mx-2">
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
