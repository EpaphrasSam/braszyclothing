"use client";

import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import CardItems from "@/components/global/CardItems";
import { ProductType } from "@/types/SanityTypes";
import { productsSortOptions } from "@/lib/constants/filters";
import useSWR from "swr";
import { getAllProductsByCategory } from "@/services/sanityServices";
import SkeletonLoader from "../../global/SkeletonLoader";
import FilterDrawer from "./FilterDrawer";

type ShopProps = {
  slug: string;
  search: any;
  allProducts: ProductType[];
  total: number;
};

const Shop = ({ slug, search, allProducts, total }: ShopProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortKey, setSortKey] = useState<any>(productsSortOptions[0].value);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [showNav, setShowNav] = useState({
    leftNav: false,
  });

  useEffect(() => {
    const initialFilters: {
      [key: string]: any;
    } = {};
    for (const [key, value] of searchParams.entries()) {
      if (value.includes(",")) {
        initialFilters[key] = value.split(",");
      } else {
        initialFilters[key] = value;
      }
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
    const { AllProducts, totalPages, error } = await getAllProductsByCategory(
      slug,
      filters,
      sortKey,
      page,
      itemsPerPage
    );

    if (error) {
      throw error;
    }

    return { products: AllProducts, totalPages };
  };

  const { data, error, isLoading } = useSWR(
    `/api/products?slug=${slug}&apparel=${search?.apparel}&price=${search.price}&inStock=${search.inStock}&newRelease=${search.newRelease}&sortBy=${sortKey}&page=${page}&itemsPerPage=${itemsPerPage}`,
    fetcher,
    { fallbackData: { products: allProducts, totalPages: total } }
  );

  const { products, totalPages } = data;

  const navHandler = (anchor: any, open: any) => (event: any) => {
    setShowNav({ ...showNav, [anchor]: open });
    return;
  };

  return (
    <div className="min-h-[1000px] flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-row gap-6 mb-4 justify-between items-center">
          <div
            className="flex items-center gap-5 "
            onClick={navHandler("leftNav", true)}
          >
            <div className="flex items-center gap-2 cursor-pointer transition ease-in-out hover:scale-105 hover:opacity-50">
              <IoFilterOutline size={24} className="text-gray-500" />
              <p className="max-sm:hidden text-lg text-gray-500">Filter</p>
            </div>
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
            <SkeletonLoader array={4} />
          ) : products.length === 0 ? (
            <div className="w-full my-20 text-center text-4xl font-bold text-gray-600">
              No products available
            </div>
          ) : (
            <div className="flex flex-row w-full max-[670px]:justify-center flex-wrap">
              {products.map((product) => (
                <div key={product.id}>
                  <CardItems product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {!isLoading && totalPages && totalPages > 1 && (
        <div className="flex justify-center my-4">
          <Pagination
            isCompact
            variant="light"
            showControls
            total={totalPages}
            initialPage={page}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      <FilterDrawer
        isOpen={showNav["leftNav"]}
        onClose={navHandler("leftNav", false)}
        filters={filters}
        setFilters={setFilters}
        slug={slug}
      />
    </div>
  );
};

export default Shop;
