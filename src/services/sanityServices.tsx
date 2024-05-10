"use server";

import {
  ApparelType,
  BannerTypes,
  CategoryType,
  ProductType,
} from "@/types/SanityTypes";
import { client } from "../../sanity/lib/client";

export const getBanners = async () => {
  try {
    const query = `*[_type == "banner"]{
        "id":_id,
        title,
        message,
        "image":image.asset->url
  }`;
    const banners: BannerTypes[] = await client.fetch(query);
    return { banners, error: null };
  } catch (error: any) {
    return { banners: [], error };
  }
};

export const getCategory = async () => {
  try {
    const query = `*[_type == "category"]{
      "id": _id,
      title,
      "slug": slug.current,
      "apparel": *[_type == "apparel" && references(^._id)][]{
        "id": _id,
        title,
        "slug": slug.current,
        "imageUrls": images[].asset->url
      }
    }`;
    const response: CategoryType[] = await client.fetch(query);
    const categories = response.filter(
      (category) => category.apparel.length > 0
    );

    return { categories, error: null };
  } catch (error: any) {
    return { categories: [], error };
  }
};

export const getApparels = async () => {
  try {
    const query = `*[_type == "apparel"]{
      "id": _id,
      title,
      "slug": slug.current,
      "imageUrls": images[].asset->url,
      "categories": categories[]-> {
        "id": _id,
        title,
        "slug": slug.current
      }
    }
    `;
    const apparels: ApparelType[] = await client.fetch(query);
    return { apparels, error: null };
  } catch (error: any) {
    return { apparels: [], error };
  }
};

export const getLatestProducts = async () => {
  try {
    const query = `*[_type == "product"  && newRelease == true ]{
      "id": _id,
      name,
      price,
      description,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url
    }`;
    const latestProducts: ProductType[] = await client.fetch(query);
    return { latestProducts, error: null };
  } catch (error: any) {
    return { latestProducts: [], error };
  }
};

export const getProduct = async (slug: string) => {
  try {
    const query = `*[_type == "product" && slug.current == "unisex"][0]{
      "id": _id,
      name,
      price,
      description,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url
    }`;
    const response: ProductType = await client.fetch(query);
    return { product: response, error: null };
  } catch (error: any) {
    return { product: null, error };
  }
};

export const getAllProductsByCategory = async (
  slug: string,
  filter?: string
) => {
  try {
    let baseQuery = `*[_type == "product" && category->slug.current == "${slug}"`;
    let filterQuery = filter ? ` && apparel->slug.current == "${filter}"` : "";
    let fieldsQuery = `]{
  "id": _id,
  name,
  price,
  description,
  inStock,
  "apparel": apparel->title,
  "categoryName": category->title,
  "categorySlug": category->slug.current,
  "slug": slug.current,
  "imageUrls": images[].asset->url
}`;

    let query = baseQuery + filterQuery + fieldsQuery;

    const response: ProductType[] = await client.fetch(query);
    return { AllProducts: response, error: null };
  } catch (error: any) {
    return { AllProducts: [], error };
  }
};