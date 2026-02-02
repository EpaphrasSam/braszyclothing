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
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const { AllProducts, totalPages, error } = await getAllProductsByCategory(
    slug,
    resolvedSearchParams?.apparel ? { apparel: resolvedSearchParams.apparel } : {},
    "a-z",
    resolvedSearchParams?.page ? Number(resolvedSearchParams.page) : 1,
    10
  );

  return (
    <Suspense>
      <div className="sm:mx-10 my-10 mx-2">
        <Shop
          allProducts={AllProducts}
          slug={slug}
          search={resolvedSearchParams}
          total={totalPages!}
        />
      </div>
    </Suspense>
  );
}
