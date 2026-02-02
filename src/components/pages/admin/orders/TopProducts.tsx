"use client";

import useCartStore from "@/store/cart";
import { ProductType } from "@/types/SanityTypes";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TopProductsProps {
  topProducts: ProductType[];
}

const TopProducts = ({ topProducts }: TopProductsProps) => {
  const displayPrice = useCartStore((state) => state.displayPrice);
  return (
    <div className="w-full">
      <Card className="min-h-[300px]">
        <CardHeader className="text-md text-gray-500 font-bold">
          Top Products
        </CardHeader>
        <CardBody>
          {topProducts.length === 0 ? (
            <p className="flex justify-center items-center text-lg font-bold text-zinc-600">
              No sales made
            </p>
          ) : (
            <>
              <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                <span>Products</span>
                <span>Sales</span>
              </div>
              <div>
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 justify-between mb-4"
                  >
                    <div className="flex gap-1">
                      <Image
                        src={
                          product.mediaUrls.find(
                            (media) => media.type === "image"
                          )?.url || product.mediaUrls[0].url
                        }
                        alt={product.name || "Product Image"}
                        className="w-16 h-16"
                        width={100}
                        height={100}
                      />
                      <div>
                        <p className="text-zinc-700 text-sm">{product.name}</p>
                        <p className="text-zinc-400 text-xs">
                          {displayPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-zinc-600">{product.quantity!}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TopProducts;
