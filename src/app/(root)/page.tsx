import CategoryCard from "@/components/pages/home/CategoryCard";
import Home from "@/components/pages/home/Home";
import LatestProducts from "@/components/pages/home/LatestProducts";
import {
  categories,
  menProducts,
  womenCategories,
  womenProducts,
  menCategories,
} from "@/lib/constants/products";

export default async function HomePage() {
  return (
    <>
      <Home />
      <div className="m-10  text-3xl font-semibold">
        <CategoryCard categories={categories} apparels={womenCategories} />
        <LatestProducts products={menProducts} />
      </div>
    </>
  );
}
