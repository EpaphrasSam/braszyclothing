"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const routes = [
  { path: "/cart", label: "Cart" },
  { path: "/checkouts/information", label: "Information" },
  { path: "/checkouts/shipping", label: "Shipping" },
  { path: "/checkouts/payment", label: "Payment" },
];

const CheckoutHeader = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const canNavigate = (path: string) => {
    const pathOrder = routes.map((route) => route.path);
    const currentPathIndex = pathOrder.indexOf(pathname);
    const targetPathIndex = pathOrder.indexOf(path);
    return targetPathIndex <= currentPathIndex;
  };

  return (
    <div className="sm:p-5 p-2">
      <Breadcrumbs underline="hover" size="md" className="text-2xl font-bold">
        {routes.map((route) => (
          <BreadcrumbItem
            key={route.path}
            href={canNavigate(route.path) ? route.path : undefined}
            isCurrent={isActive(route.path)}
            className="font-bold"
            isDisabled={!canNavigate(route.path)}
          >
            {route.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default CheckoutHeader;
