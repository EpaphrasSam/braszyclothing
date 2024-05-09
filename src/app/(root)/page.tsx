import Banner from "@/components/pages/home/Banner";
import CategoryCard from "@/components/pages/home/CategoryCard";
import LatestProducts from "@/components/pages/home/LatestProducts";
import {
  getBanners,
  getCategory,
  getLatestProducts,
} from "@/services/sanityServices";

export default async function HomePage() {
  const { banners, error: bannersError } = await getBanners();
  const { categories, error: categoriesError } = await getCategory();
  const { latestProducts, error: latestProductsError } =
    await getLatestProducts();

  return (
    <>
      <div className="relative h-screen">
        <Banner banners={banners} />
      </div>
      <div className="m-10  text-3xl font-semibold">
        <CategoryCard categories={categories} />
        <LatestProducts products={latestProducts} />
      </div>
    </>
  );
}
