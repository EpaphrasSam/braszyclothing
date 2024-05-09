"use client";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
import ImageTransition from "@/components/global/ImageTransition";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/SanityTypes";

interface CategoryCardProps {
  categories: CategoryType[];
}

const CategoryCard = ({ categories }: CategoryCardProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-evenly overflow-x-scroll p-2">
      {categories.map((category) => (
        <Card key={category.id} className=" mt-2 mr-4 w-[600px]" isBlurred>
          <CardHeader className="text-gray-600 text-3xl">
            {category.title}
          </CardHeader>
          <CardBody className="grid grid-cols-3 gap-3 w-full h-[500px]">
            {category.apparel.length > 0 &&
              category.apparel.map((apparel) => (
                <Card
                  key={apparel.id}
                  isPressable
                  onClick={() =>
                    router.push(`/shop/${category.slug}?filter=${apparel.slug}`)
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
                      className="text-gray-500  font-semibold text-lg"
                    >
                      {apparel.title}
                    </motion.div>
                  </CardHeader>
                  <Divider />
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImageTransition images={apparel.imageUrls} />
                  </motion.div>
                </Card>
              ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CategoryCard;
