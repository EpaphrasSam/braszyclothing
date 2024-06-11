"use client";

import React from "react";
import { Skeleton, Card } from "@nextui-org/react";

interface SkeletonLoaderProps {
  array?: number;
}

const SkeletonLoader = ({ array = 4 }: SkeletonLoaderProps) => {
  return (
    <div className="flex flex-row w-full pt-4 max-sm:justify-center justify-between gap-4 flex-wrap">
      {Array(array)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="w-[250px] h-[300px]" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-[350px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg mt-4">
              <div className="h-[40px] rounded-lg bg-default-300"></div>
            </Skeleton>
            {/* <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div> */}
          </Card>
        ))}
    </div>
  );
};

export default SkeletonLoader;
