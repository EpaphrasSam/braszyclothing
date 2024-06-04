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
    { title: "Total Sales", value: `$${stats?.totalSales.toFixed(2)}` },
    { title: "Total Orders", value: stats?.Orders },
    { title: "Total Users", value: stats?.Users },
    { title: "Total Guests", value: stats?.Guests },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {statsArray.map((item: any, index: number) => (
        <Card key={index} className="bg-white p-4 rounded-lg shadow-md">
          <CardHeader className="text-md text-gray-500 font-semibold">
            {item.title}
          </CardHeader>
          <CardBody className="text-gray-700 font-semibold text-xl">
            {item.value}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
