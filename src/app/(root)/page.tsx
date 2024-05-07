import Home from "@/components/pages/home/Home";
import ProductCard from "@/components/pages/home/ProductCard";
import { menProducts, womenProducts } from "@/lib/constants/products";

export default async function HomePage() {
  return (
    <>
      <Home />
      <div className="m-10  text-3xl font-semibold">
        <ProductCard products={menProducts} category="men's" />
        <ProductCard products={womenProducts} category="women's" />
      </div>
    </>
  );
}
