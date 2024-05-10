import ApparelsCard from "@/components/pages/home/ApparelsCard";
import Banner from "@/components/pages/home/Banner";
import LatestProducts from "@/components/pages/home/LatestProducts";
import {
  getApparels,
  getBanners,
  getLatestProducts,
} from "@/services/sanityServices";

// export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { banners, error: bannersError } = await getBanners();
  const { apparels, error: apparelsError } = await getApparels();
  const { latestProducts, error: latestProductsError } =
    await getLatestProducts();

  return (
    <>
      <div className="relative h-screen">
        <Banner banners={banners} />
      </div>
      <div className="m-10  text-3xl font-semibold">
        <ApparelsCard apparels={apparels} />
        <LatestProducts products={latestProducts} />
      </div>
    </>
  );
}
