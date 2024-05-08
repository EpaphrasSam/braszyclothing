"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type CategoryProps = {
  slug: string;
};

const Category = ({ slug }: CategoryProps) => {
  const router = useRouter();

  useEffect(() => {
    if (slug) return router.push(`/categories/${slug}`);
  }, [slug, router]);
  return <div>Category</div>;
};

export default Category;
