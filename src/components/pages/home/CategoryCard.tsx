"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageTransition from "@/components/global/ImageTransition";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  categories: {
    id: string;
    name: string;
  }[];
  apparels: {
    id: string;
    name: string;
    images: string[];
  }[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 648 },
    items: 2,
    // slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 648, min: 0 },
    items: 1,
    // slidesToSlide: 1,
  },
};

const CategoryCard = ({ categories, apparels }: CategoryCardProps) => {
  const router = useRouter();
  return (
    <Carousel responsive={responsive} ssr={true}>
      {categories.map((category) => (
        <Card key={category.id} className=" mt-2 mr-4" isBlurred>
          <CardHeader>{category.name}</CardHeader>
          <CardBody className="grid grid-cols-3 gap-3 w-full h-[500px]">
            {apparels.map((apparel) => (
              <Card
                key={apparel.id}
                isPressable
                onClick={() =>
                  router.push(
                    `/shop/${category.name.toLowerCase()}?filter=${
                      apparel.name
                    }`
                  )
                }
              >
                <CardHeader>
                  <motion.div
                    // animate={{
                    //   scale: [1, 1.1, 1],
                    //   transition: {
                    //     duration: 2,
                    //     ease: "easeInOut",
                    //     repeat: Infinity,
                    //   },
                    // }}
                    className="text-gray-700  font-bold"
                  >
                    {apparel.name}
                  </motion.div>
                </CardHeader>
                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageTransition images={apparel.images} />
                </motion.div>
              </Card>
            ))}
          </CardBody>
        </Card>
      ))}
    </Carousel>
  );
};

export default CategoryCard;
