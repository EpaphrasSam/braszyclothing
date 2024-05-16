"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const CheckoutHeader = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="p-5">
      <Breadcrumbs underline="hover" size="sm" className="text-2xl font-bold">
        <BreadcrumbItem
          href="/cart"
          isCurrent={isActive("/cart")}
          className="font-bold"
        >
          Cart
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/checkouts/information`}
          isCurrent={isActive(`/checkouts/information`)}
        >
          Information
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/checkouts/shipping`}
          isCurrent={isActive(`/checkouts/shipping`)}
        >
          Shipping
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/checkouts/payment`}
          isCurrent={isActive(`/checkouts/payment`)}
        >
          Payment
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default CheckoutHeader;
