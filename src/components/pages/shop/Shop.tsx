"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { menProducts, womenProducts } from "@/lib/constants/products";
import CardItems from "@/components/global/CardItems";

type ShopProps = {
  slug: string;
  filter?: string;
};

const Shop = ({ slug, filter }: ShopProps) => {
  const router = useRouter();
  const [products, setProducts] = useState(
    slug === "men" ? menProducts : womenProducts
  );

  useEffect(() => {
    if (slug) {
      const path = `/shop/${slug}` + (filter ? `?filter=${filter}` : "");
      router.push(path);
    }
  }, [slug, router, filter]);

  return (
    <div className="m-10">
      <div className="flex gap-6 mb-4 justify-end items-center">
        <div className="flex items-center gap-2 cursor-pointer transition ease-in-out hover:scale-105 hover:opacity-50">
          <IoFilterOutline size={20} />
          <p>Filter</p>
        </div>
        <div className="flex gap-4 items-center">
          <p>Sort By:</p>
          <Select
            variant="bordered"
            radius="none"
            selectedKeys={[1]}
            className="w-[150px] "
            classNames={{ base: "rounded-none" }}
          >
            <SelectItem key={1}>Prices</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex flex-row items-center sm:justify-between justify-center flex-wrap">
        {products.map((product) => (
          <div
            key={product.id}
            //   className="w-1/5 p-2"
          >
            <CardItems product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
