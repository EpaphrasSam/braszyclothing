"use client";

import React, { useEffect, useState } from "react";
import { ApparelType } from "@/types/SanityTypes";
import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import ImageTransition from "@/components/global/ImageTransition";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../../global/SkeletonLoader";

interface ApparelsCardProps {
  apparels: ApparelType[];
}

const responsive = {
  LargeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
    // slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 4,
    // slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1200, min: 848 },
    items: 3,
    // slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 930, min: 648 },
    items: 2,
    // slidesToSlide: 2,
  },
  smallMobile: {
    breakpoint: { max: 648, min: 0 },
    items: 1,
    // slidesToSlide: 1,
  },
};

const ApparelsCard = ({ apparels }: ApparelsCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (apparels) {
      setLoading(false);
    }
  }, [apparels]);

  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <Carousel responsive={responsive} ssr={true}>
        {apparels.map((apparel) => (
          <div key={apparel.id} className="flex justify-center">
            <Card
              radius="none"
              className="m-2 w-[250px] h-[350px]"
              isFooterBlurred
            >
              <CardHeader className="text-gray-600 text-lg">
                {apparel.title}
              </CardHeader>
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ImageTransition images={apparel.imageUrls} />
              </motion.div>
              <CardFooter className="absolute px-4 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
                <div className="flex w-full justify-evenly">
                  {apparel.categories.map((category) => (
                    <div
                      key={category.id}
                      className="text-base text-gray-700 hover:underline underline-offset-4 cursor-pointer transition ease-in-out duration-300 hover:opacity-75 hover:scale-110"
                      onClick={() =>
                        router.push(
                          `/shop/${category.slug}?apparel=${apparel.slug}`
                        )
                      }
                    >
                      {category.title}
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ApparelsCard;
