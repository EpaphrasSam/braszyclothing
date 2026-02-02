"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@heroui/react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import useSWR from "swr";
import { searchProducts } from "@/services/sanityServices";
import SearchResults from "../global/SearchResults";

type SearchBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [hasSearched, setHasSearched] = useState(false);

  const fetcher = async () => {
    if (!debouncedQuery) {
      return;
    }
    const { search, error } = await searchProducts(debouncedQuery);
    if (error) {
      throw error;
    }

    setHasSearched(true);

    return search;
  };

  const {
    data: search = {},
    isLoading,
    error,
  } = useSWR(`/api/search?q=${debouncedQuery}`, fetcher);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (query === "") {
      setHasSearched(false);
    }
  }, [query]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.2 }}
              className="fixed border-b border-gray-400 border-solid top-0 left-0 right-0 z-40 w-full bg-white h-16 flex items-center justify-center px-10 gap-2"
            >
              <Input
                isClearable
                variant="bordered"
                radius="full"
                className="sm:w-[600px] w-full"
                startContent={<IoSearchOutline size={20} />}
                placeholder="Search for products/collections"
                classNames={{
                  label: "text-black text-[12px]",
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={() => setQuery("")}
              />
              <IoCloseOutline
                size={28}
                onClick={onClose}
                className="cursor-pointer hover:opacity-75 flex"
              />
            </motion.div>
            {hasSearched &&
              query !== "" &&
              search.products &&
              search.apparels && (
                <div className="fixed top-16 left-0 right-0 z-40">
                  <SearchResults
                    data={search}
                    loading={isLoading}
                    onClose={onClose}
                  />
                </div>
              )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
