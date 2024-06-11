"use client";

import { ProductType } from "@/types/SanityTypes";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TopProductsProps {
  topProducts: ProductType[];
}

const TopProducts = ({ topProducts }: TopProductsProps) => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="text-md text-gray-500 font-bold">
          Top Products
        </CardHeader>
        <CardBody>
          <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            <span>Products</span>
            <span>Sales</span>
          </div>
          <div>
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex gap-1">
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name || "Product Image"}
                    className="w-16 h-16"
                    width={100}
                    height={100}
                  />
                  <div>
                    <p className="text-zinc-700 text-sm">{product.name}</p>
                    <p className="text-zinc-400 text-xs">${product.price}</p>
                  </div>
                </div>
                <div className="text-zinc-600">{product.quantity!}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TopProducts;
