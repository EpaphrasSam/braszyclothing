"use client";

import { Orders } from "@/types/OrderTypes";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import OrderAccordion from "./OrderAccordion";
import { FaShippingFast, FaBan, FaCheck, FaEllipsisV } from "react-icons/fa";
import CustomModal from "@/components/global/CustomModal";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/services/adminServices";

interface OrdersTableProps {
  orders: Orders[];
  isRecentOnly: boolean;
}

const getShippingStatusChip = (shippingStatus: string) => {
  let color:
    | "default"
    | "primary"
    | "warning"
    | "success"
    | "danger"
    | undefined = "default";
  let text = "";

  switch (shippingStatus) {
    case "Pending":
      color = "warning";
      text = "Pending";
      break;
    case "Shipping":
      color = "primary";
      text = "Shipping";
      break;
    case "Completed":
      color = "success";
      text = "Completed";
      break;
    case "Canceled":
      color = "danger";
      text = "Canceled";
      break;

    default:
      text = "Unknown";
  }

  return (
    <Chip color={color} size="md" variant="flat">
      {text}
    </Chip>
  );
};

const OrdersTable = ({ orders, isRecentOnly }: OrdersTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActionClick = (orderId: string, action: string) => {
    setSelectedStatus({ id: orderId, action });
    setIsModalOpen(true);
  };

  const filteredOrders = useMemo(() => {
    if (selectedStatusFilter === "All") {
      return orders;
    } else {
      return orders.filter(
        (order) => order.shippingStatus === selectedStatusFilter
      );
    }
  }, [orders, selectedStatusFilter]);

  const pages = Math.ceil(filteredOrders?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredOrders?.slice(start, end);
  }, [page, filteredOrders]);

  const isEmpty = filteredOrders.length === 0;

  const handleConfirm = async () => {
    if (!selectedStatus) return;
    setIsLoading(true);
    try {
      const response = await updateOrderStatus(
        selectedStatus.id,
        selectedStatus.action
      );
      if (response.error) throw new Error(response.error);
      toast.success("Status updated successfully");
    } catch (error: any) {
      const errorMessage = error.message || "Error in updating status";
      toast.error(errorMessage > 20 ? "Something went wrong" : errorMessage);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedStatus(null);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedStatus(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedStatus(null);
    }
  }, [isModalOpen]);

  const renderDropdownOneOrBackticksItems = (
    orderId: string,
    shippingStatus: string
  ) => {
    let items = [];
    switch (shippingStatus) {
      case "Pending":
        items.push(
          <DropdownItem
            key="ship"
            color="primary"
            startContent={<FaShippingFast />}
            onClick={() => handleActionClick(orderId, "Ship")}
          >
            Ship
          </DropdownItem>,
          <DropdownItem
            key="cancel"
            color="danger"
            startContent={<FaBan />}
            onClick={() => handleActionClick(orderId, "Cancel")}
          >
            Cancel
          </DropdownItem>
        );
        break;
      case "Shipping":
        items.push(
          <DropdownItem
            key="complete"
            color="success"
            startContent={<FaCheck />}
            onClick={() => handleActionClick(orderId, "Complete")}
          >
            Complete
          </DropdownItem>,
          <DropdownItem
            key="cancel"
            color="danger"
            startContent={<FaBan />}
            onClick={() => handleActionClick(orderId, "Cancel")}
          >
            Cancel
          </DropdownItem>
        );
        break;
      case "Completed":
      case "Canceled":
      default:
        break;
    }
    return items;
  };

  const renderDropdownItems = (orderId: string, shippingStatus: string) => {
    const items = renderDropdownOneOrBackticksItems(orderId, shippingStatus);
    if (!items.length) {
      return <DropdownItem></DropdownItem>;
    }
    return items;
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          {isRecentOnly ? (
            <div className="w-full flex justify-between">
              <p className="text-xl text-zinc-500 font-bold">Latest Orders</p>
              <Link
                href="/admin/orders"
                className="text-blue-500 underline underline-offset-4 transition ease-in-out  duration-300 hover:scale-105"
              >
                View all
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4">
              {["All", "Pending", "Shipping", "Completed", "Canceled"].map(
                (status) => (
                  <button
                    key={status}
                    className={`text-blue-500 font-semibold underline underline-offset-4 transition ease-in-out duration-300 hover:scale-105 ${
                      selectedStatusFilter === status
                        ? "text-blue-500 underline underline-offset-4"
                        : "text-gray-500 no-underline"
                    }`}
                    onClick={() => setSelectedStatusFilter(status)}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          )}
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Exams timetable"
            bottomContent={
              pages > 1 && (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              )
            }
            classNames={{
              table: isEmpty ? "min-h-[400px]" : "",
            }}
          >
            <TableHeader>
              <TableColumn key="orderID">Order ID</TableColumn>
              <TableColumn key="Order date">Order Date</TableColumn>
              <TableColumn key="customer">Customer</TableColumn>
              <TableColumn key="product(s)">Product(s)</TableColumn>
              <TableColumn key="address">Address</TableColumn>
              <TableColumn key="total">Total</TableColumn>
              <TableColumn key="status">Status</TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>

            {isEmpty ? (
              <TableBody emptyContent={"No orders available."}>{[]}</TableBody>
            ) : (
              <TableBody items={items} aria-colspan={3}>
                {(item: Orders) => (
                  <TableRow key={item.id}>
                    <TableCell>#{item.orderID}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start">
                        {item.isGuest && (
                          <Chip variant="dot" size="sm" radius="sm">
                            Guest
                          </Chip>
                        )}
                        {item.isUser ? item.userName : item.guestEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      <OrderAccordion data={item.products} type="Products" />
                    </TableCell>
                    <TableCell>
                      <OrderAccordion
                        data={item.shippingAddress}
                        type="Address"
                      />
                    </TableCell>
                    <TableCell>${item.paymentIntent?.netAmount}</TableCell>
                    <TableCell>
                      {getShippingStatusChip(item.shippingStatus)}
                    </TableCell>
                    <TableCell>
                      <>
                        <Dropdown aria-label="Actions">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <FaEllipsisV size={16} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            {renderDropdownItems(item.id, item.shippingStatus)}
                          </DropdownMenu>
                        </Dropdown>
                      </>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </CardBody>
      </Card>
      {isModalOpen && selectedStatus && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          message={`Are you sure you want to ${selectedStatus?.action} this order?`}
          label={`${selectedStatus?.action} Order`}
          confirmLabel={selectedStatus?.action}
          color={`${selectedStatus?.action === "Cancel" ? "danger" : "primary"}`}
          cancelLabel="Close"
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default OrdersTable;
