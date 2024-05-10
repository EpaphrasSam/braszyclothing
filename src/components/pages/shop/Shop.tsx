"use client";

import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import CardItems from "@/components/global/CardItems";
import { ProductType } from "@/types/SanityTypes";
import { productsSortOptions } from "@/lib/constants/filters";
import { FaChevronDown } from "react-icons/fa";
import useSWR from "swr";
import { getAllProductsByCategory } from "@/services/sanityServices";
import SkeletonLoader from "../../global/SkeletonLoader";

type ShopProps = {
  slug: string;
  apparel?: string;
  allProducts: ProductType[];
};

const Shop = ({ slug, apparel, allProducts }: ShopProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortKey, setSortKey] = useState<any>(productsSortOptions[0].value);
  const [filters, setFilters] = useState({});
  console.log(searchParams);

  useEffect(() => {
    const initialFilters: {
      [key: string]: any;
    } = {};
    for (const [key, value] of searchParams.entries()) {
      initialFilters[key] = value;
    }
    setFilters(initialFilters);
  }, [searchParams]);

  useEffect(() => {
    if (slug) {
      const filterString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const path = `/shop/${slug}` + (filterString ? `?${filterString}` : "");
      router.push(path, undefined);
    }
  }, [slug, router, filters]);

  const fetcher = async () => {
    const { AllProducts, error } = await getAllProductsByCategory(
      slug,
      filters,
      sortKey
    );

    if (error) {
      throw error;
    }

    return AllProducts;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    `/api/products?slug=${slug}&apparel=${apparel}&sortBy=${sortKey}`,
    fetcher,
    { fallbackData: allProducts }
  );

  return (
    <div>
      <div className="flex flex-row gap-6 mb-4 justify-between items-center">
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-2 cursor-pointer transition ease-in-out hover:scale-105 hover:opacity-50">
            <IoFilterOutline size={24} className="text-gray-500" />
            <p className="max-sm:hidden text-lg text-gray-500">Filter</p>
          </div>
          {/* <Dropdown aria-label="Price">
            <DropdownTrigger>
              <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 transition ease-in-out hover:scale-105">
                Price
                <FaChevronDown size={12} />
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Price</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-base text-gray-500">Sort By:</p>
          <Select
            aria-label="Sort By"
            variant="bordered"
            radius="none"
            className="w-[200px] "
            classNames={{ base: "rounded-none" }}
            selectedKeys={[sortKey]}
            onSelectionChange={setSortKey}
            onChange={(e) => setSortKey(e.target.value)}
            fullWidth
          >
            {productsSortOptions.map((options) => (
              <SelectItem key={options.value}>{options.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-row w-full max-[670px]:justify-center gap-4 flex-wrap">
        {isLoading ? (
          <SkeletonLoader />
        ) : products.length === 0 ? (
          <div className="w-full my-20 text-center text-4xl font-bold text-gray-600">
            No products available
          </div>
        ) : (
          <div className="flex flex-row w-full max-[670px]:justify-center gap-4 flex-wrap">
            {products.map((product) => (
              <div key={product.id}>
                <CardItems product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
