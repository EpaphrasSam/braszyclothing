"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";
import CardItems from "@/components/global/CardItems";
import { ProductType } from "@/types/SanityTypes";

type ShopProps = {
  slug: string;
  filter?: string;
  allProducts: ProductType[];
};

const Shop = ({ slug, filter, allProducts }: ShopProps) => {
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      const path = `/shop/${slug}` + (filter ? `?filter=${filter}` : "");
      router.push(path);
    }
  }, [slug, router, filter]);

  return (
    <div>
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
      <div className="flex flex-row max-[670px]:justify-center gap-4 flex-wrap">
        {allProducts.map((product) => (
          <div key={product.id}>
            <CardItems product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
