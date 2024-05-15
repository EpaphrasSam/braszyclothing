"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const CheckoutHeader = () => {
  const pathname = usePathname();

  const getIdFromPathname = () => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");
    let id;

    if (pathSegments.length > 2) {
      id = pathSegments[1];
    } else if (pathSegments.length === 2) {
      id = pathSegments[1];
    }

    return id;
  };

  const id = getIdFromPathname();

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
          href={`/checkouts/${id}/information`}
          isCurrent={isActive(`/checkouts/${id}/information`)}
        >
          Information
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/checkouts/${id}/shipping`}
          isCurrent={isActive(`/checkouts/${id}/shipping`)}
        >
          Shipping
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`/checkouts/${id}/payment`}
          isCurrent={isActive(`/checkouts/${id}/payment`)}
        >
          Payment
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default CheckoutHeader;
