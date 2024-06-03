"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface StatisticsCardsProps {
  stats: {
    Orders: number;
    Users: number;
    Guests: number;
    totalSales: number;
  };
}

const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const statsArray = [
    { title: "Total Sales", value: `$${stats.totalSales.toFixed(2)}` },
    { title: "Orders", value: stats.Orders },
    { title: "Users", value: stats.Users },
    { title: "Guests", value: stats.Guests },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      {statsArray.map((item: any, index: number) => (
        <Card key={index} className="bg-white p-4 rounded-lg shadow-md">
          <CardHeader className="text-xl font-bold">{item.title}</CardHeader>
          <CardBody className="text-gray-700 font-semibold text-lg">
            {item.value}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
