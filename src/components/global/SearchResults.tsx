import React from "react";
import { ApparelType, SearchType } from "@/types/SanityTypes";
import { Divider, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SearchResultsProps {
  data: { products: SearchType; apparels: ApparelType[] };
  loading: boolean;
  onClose: any;
}

const SearchResults = ({ data, loading, onClose }: SearchResultsProps) => {
  const router = useRouter();
  const hasApparels = data.apparels && data.apparels.length > 0;
  const hasProducts = data.products && Object.keys(data.products).length > 0;

  if (loading) {
    return (
      <div className="py-4 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!loading && !hasApparels && !hasProducts) {
    return (
      <div className="py-4 bg-white flex justify-center items-center">
        No results found
      </div>
    );
  }

  return (
    <div className="bg-white p-5 flex flex-col sm:flex-row">
      {hasApparels ? (
        <div className="w-full sm:w-1/4 pr-4 sm:border-r overflow-y-auto">
          <h2 className="text-xl pb-2 text-center font-bold text-gray-600">
            Collections
          </h2>
          {data.apparels.map((apparel) => (
            <div key={apparel.id} className="mb-4 pl-2">
              <p className="text-base font-bold text-gray-600">
                {apparel.title}
              </p>
              <Divider className="my-2" />
              <div className="flex flex-wrap gap-2">
                {apparel.categories.map((category) => (
                  <div key={category.id} className="p-1 px-4">
                    <motion.div
                      whileHover={{ scale: 1.05, textDecoration: "underline" }}
                      style={{ textUnderlineOffset: "4px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onClick={() => {
                        router.push(
                          `/shop/${category.slug}?apparel=${apparel.slug}`
                        );
                        onClose();
                      }}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <Image
                        src={apparel.imageUrls[0]}
                        alt={apparel.title || "Apparel Image"}
                        width={50}
                        height={50}
                        className="object-cover object-center rounded-sm"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-base font-medium text-gray-600">
                          {category.title}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full sm:w-1/4 pr-4 sm:border-r overflow-y-auto">
          <div className="flex  w-full justify-center items-center">
            <p className="text-lg w-full text-center font-bold text-gray-500">
              No collection found
            </p>
          </div>
        </div>
      )}
      <Divider className="my-2 sm:hidden" />
      {hasProducts ? (
        <div className="w-full sm:w-3/4 sm:pl-4 pl-0 overflow-y-auto">
          <h2 className="text-xl pb-2 text-center font-bold text-gray-600">
            Products
          </h2>
          {Object.entries(data.products).map(([categoryName, apparels]) => (
            <div key={categoryName} className="mb-4 pl-2">
              <p className="text-base font-bold text-gray-600">
                {categoryName}
              </p>
              <Divider className="my-2" />
              <div className="flex flex-wrap">
                {Object.entries(apparels).map(([apparel, products]) => (
                  <div key={apparel} className="p-1 px-4">
                    <p className="pb-2 font-semibold text-gray-600">
                      {apparel}
                    </p>
                    <div className="flex flex-col max-h-[130px] p-1 gap-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
                      {products.map((product) => (
                        <div key={product.id}>
                          <motion.div
                            whileHover={{
                              scale: 1.05,
                              textDecoration: "underline",
                            }}
                            style={{ textUnderlineOffset: "4px" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={() => {
                              router.push(`/products/${product.slug}`);
                              onClose();
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
          ))}
        </div>
      ) : (
        <div className="w-full sm:w-3/4 pl-4 overflow-y-auto">
          <div className="flex w-full justify-center items-center">
            <p className="text-lg w-full text-center font-bold text-gray-500">
              No products found
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
