"use client";

import { OrderWithProductDetails } from "@/types/OrderTypes";
import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchUserOrders } from "@/services/orderServices";
import {
  Pagination,
  Spinner,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";

interface OrderHistoryProps {
  userId: string;
  InitialOrders: OrderWithProductDetails[];
  InitialTotalPages: number;
  search: any;
}

const OrderHistory = ({
  userId,
  InitialOrders,
  InitialTotalPages,
  search,
}: OrderHistoryProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(search.page ? Number(search.page) : 1);
  const [pageSize, setPageSize] = useState(
    search.pageSize ? Number(search.pageSize) : 10
  );

  const fetcher = async (url: string) => {
    const { data, error, totalPages } = await fetchUserOrders(
      userId,
      page,
      pageSize
    );

    if (error) {
      throw error;
    }

    return { orders: data, totalPages };
  };

  const { data, error, isLoading } = useSWR(
    `/api/products?page=${page}&pageSize=${pageSize}`,
    fetcher,
    { fallbackData: { orders: InitialOrders, totalPages: InitialTotalPages } }
  );

  const { orders, totalPages } = data || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl({ page: newPage });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    updateUrl({ pageSize: newPageSize, page: 1 });
  };

  const updateUrl = (params: { page?: number; pageSize?: number }) => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    if (params.page) {
      searchParams.set("page", params.page.toString());
    }

    if (params.pageSize) {
      searchParams.set("pageSize", params.pageSize.toString());
    }

    currentUrl.search = searchParams.toString();
    router.push(currentUrl.toString());
  };

  useEffect(() => {
    const search = searchParams;
    const page = search.get("page");
    const pageSize = search.get("pageSize");
    if (page) setPage(Number(page));
    if (pageSize) setPageSize(Number(pageSize));
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-5xl font-bold min-h-screen flex justify-center items-center text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {orders && orders.length === 0 ? (
        <div className="text-5xl font-bold min-h-screen flex justify-center items-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-gray-500">My Orders</p>
          <Divider className="my-2" />
          <div className="flex flex-grow gap-4 xl:justify-between justify-center  flex-wrap">
            {orders &&
              orders.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        </div>
      )}
      {orders && orders.length > 0 && (
        <div className="flex justify-between items-center my-4 gap-4">
          <Select
            aria-label="Select page size"
            value={pageSize.toString()}
            selectedKeys={[pageSize.toString()]}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="w-[70px]"
            variant="underlined"
            label="Items"
            disallowEmptySelection
          >
            <SelectItem key="5" value="5">
              5
            </SelectItem>
            <SelectItem key="10" value="10">
              10
            </SelectItem>
            <SelectItem key="15" value="15">
              15
            </SelectItem>

            <SelectItem key="20" value="20">
              20
            </SelectItem>
            <SelectItem key="25" value="25">
              25
            </SelectItem>
            <SelectItem key="30" value="30">
              30
            </SelectItem>
          </Select>

          {totalPages && totalPages > 1 && (
            <div className="flex justify-center items-center">
              <Pagination
                isCompact
                variant="light"
                showControls
                total={totalPages}
                initialPage={page}
                onChange={handlePageChange}
              />
            </div>
          )}

          <div />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
