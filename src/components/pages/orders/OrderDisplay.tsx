"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Image from "next/image";

function OrdersDisplay() {
  const orders = [
    {
      id: 1234567890,
      product: "Sporty Mesh Cap",
      size: "small",
      color: "Brown",
      amount: 2,
      price: "£11.24",
      orderDate: "March 10, 2024",
      deliveryDate: "March 14, 2024",
      url: "/images/img7.png",
    },
    {
      id: 2345678901,
      product: "Silk Elegance Blouse",
      size: "Large",
      color: "Beige",
      amount: 1,
      price: "£52.49",
      orderDate: "February 2, 2024",
      deliveryDate: "February 10, 2024",
      url: "/images/img7.png",
    },
    {
      id: 3456789012,
      product: "Classic Cotton T-shirt",
      size: "Large",
      color: "blue",
      amount: 1,
      price: "£14.99",
      orderDate: "January 15, 2024",
      deliveryDate: "January 20, 2024",
      url: "/images/img7.png",
    },
  ];

  return (
    <Table aria-label="Orders Table " className="w-full ">
      <TableHeader>
        <TableColumn>Order</TableColumn>
        <TableColumn>Color</TableColumn>
        <TableColumn>Size</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Order Number</TableColumn>
        <TableColumn>Order Date</TableColumn>
        <TableColumn>Delivery Date</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="border-b last:border-b-0">
            <TableCell>
              <div className="flex flex-row gap-5 items-center">
                <Image
                  src={order.url}
                  alt={order.product}
                  width={100}
                  height={100}
                  layout="fixed"
                />
                {/* {order.product} */}
                <span>{order.product}</span>
              </div>
            </TableCell>
            <TableCell>
              <span
                className="block rounded-full w-4 h-4" // Increased size for better visibility
                style={{ backgroundColor: order.color }}
              ></span>
            </TableCell>
            <TableCell>{order.size}</TableCell>
            <TableCell>{order.amount}</TableCell>

            <TableCell>{order.price}</TableCell>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.deliveryDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OrdersDisplay;
