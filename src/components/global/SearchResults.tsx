import React from "react";
import { SearchType } from "@/types/SanityTypes";
import { Divider, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SearchResultsProps {
  data: SearchType;
  loading: boolean;
  onClose: any;
}

const SearchResults = ({ data, loading, onClose }: SearchResultsProps) => {
  const router = useRouter();
  if (loading) {
    return (
      <div className="py-4 bg-white flex justify-center items-center absolute top-16 left-0 right-0 z-50">
        <Spinner />
      </div>
    );
  }

  if (!loading && Object.keys(data).length === 0) {
    return (
      <div className="py-4 bg-white flex justify-center items-center absolute top-16 left-0 right-0 z-50">
        No results found
      </div>
    );
  }
  return (
    <div
      className={`absolute scrollbar-hide max-sm:max-h-[85vh] top-16 left-0 right-0 z-50 flex sm:flex-row flex-col overflow-auto justify-evenly max-sm:gap-5 bg-white p-5`}
    >
      {Object.entries(data).map(([categoryName, apparels]) => (
        <>
          <div key={categoryName} className="flex flex-col">
            <p className="text-base font-bold text-gray-600">{categoryName}</p>
            <Divider className="my-2" />
            {/* <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden scrollbar-none"> */}
            <div className="flex flex-wrap">
              {Object.entries(apparels).map(([apparel, products]) => (
                <div key={apparel} className="p-1 px-4">
                  <p className="pb-2 font-semibold text-gray-600">{apparel}</p>
                  <div className="flex flex-col max-h-[130px] p-1 gap-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
                    {products.map((product) => (
                      <div key={product.id}>
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            textDecoration: "underline",
                          }}
                          style={{
                            textUnderlineOffset: "4px",
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          key={apparel}
                          onClick={() => {
                            onClose();
                            router.push(`/products/${product.slug}`);
                          }}
                          className="flex gap-2 items-center cursor-pointer"
                        >
                          <Image
                            src={product.imageUrls[0]}
                            alt={product.name || "Product Image"}
                            width={50}
                            height={50}
                            className="object-cover object-center rounded-sm"
                          />
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-medium text-gray-600">
                              {product.name}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default SearchResults;
