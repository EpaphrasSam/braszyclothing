"use server";

import {
  ApparelType,
  BannerTypes,
  CategoryType,
  ProductType,
  SearchType,
} from "@/types/SanityTypes";
import { client } from "../../sanity/lib/client";
import _ from "lodash";

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
      inStock,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url,
      "colors": color,
      "sizes": size
    }`;

    const latestProducts: ProductType[] = await client.fetch(query);
    return { latestProducts, error: null };
  } catch (error: any) {
    return { latestProducts: [], error };
  }
};

export const getProduct = async (slug: string) => {
  try {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
      "id": _id,
      name,
      price,
      description,
      inStock,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url,
      "colors": color,
      "sizes": size
    }`;
    const response: ProductType = await client.fetch(query);
    return { product: response, error: null };
  } catch (error: any) {
    return { product: null, error };
  }
};

export const getAllProductsByCategory = async (
  slug: string,
  filters?: { [key: string]: any },
  sortBy?: string,
  page: number = 1,
  itemsPerPage: number = 10
) => {
  try {
    let baseQuery = `*[_type == "product" && category->slug.current == "${slug}"`;

    let filterQuery = "";
    if (filters) {
      filterQuery = Object.entries(filters)
        .map(([key, value]) => {
          switch (key) {
            case "apparel":
              if (Array.isArray(value)) {
                const apparelQuery = value
                  .map((apparel) => `${key}->slug.current == "${apparel}"`)
                  .join(" || ");
                return ` && (${apparelQuery})`;
              } else {
                return ` && ${key}->slug.current == "${value}"`;
              }
            case "price":
              return ` && price >= ${value[0]} && price <= ${value[1]}`;
            default:
              if (value.toLowerCase() === "false") {
                return ` && ${key} == null`;
              } else {
                return ` && ${key} == ${value}`;
              }
          }
        })
        .join("");
    }

    let sortQuery = "";
    switch (sortBy) {
      case "a-z":
        sortQuery = " | order(name asc)";
        break;
      case "price-asc":
        sortQuery = " | order(price asc)";
        break;
      case "price-desc":
        sortQuery = " | order(price desc)";
        break;
      case "newest":
        sortQuery = " | order(_createdAt desc)";
        break;
      case "oldest":
        sortQuery = " | order(_createdAt asc)";
        break;
    }

    let fieldsQuery = `{
      "id": _id,
      name,
      price,
      description,
      inStock,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      "imageUrls": images[].asset->url,
      "colors": color,
      "sizes": size
    }`;

    let start = (page - 1) * itemsPerPage;
    let end = page * itemsPerPage;

    let countQuery = `count(${baseQuery + filterQuery}])`;
    let totalItems = await client.fetch(countQuery);
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    let query =
      baseQuery +
      filterQuery +
      `][${start}...${end}]` +
      sortQuery +
      fieldsQuery;

    const response: ProductType[] = await client.fetch(query);

    return { AllProducts: response, totalPages: totalPages, error: null };
  } catch (error: any) {
    return { AllProducts: [], error };
  }
};

export const getUniqueApparelsAndPrices = async (slug: string) => {
  try {
    const apparelQuery = `*[_type == "apparel"]{
      "id": _id,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        "slug": slug.current
      }
    }`;

    const apparelResponse = await client.fetch(apparelQuery);

    const filteredApparel = apparelResponse
      .filter((apparel: any) =>
        apparel.categories.some((category: any) => category.slug === slug)
      )
      .map(({ categories, ...rest }: any) => rest);

    const priceQuery = `*[_type == "product" && category->slug.current == "${slug}"] | order(price desc)[0]{
      "highestPrice": price
    }`;
    const priceResponse = await client.fetch(priceQuery);

    return {
      apparel: filteredApparel,
      highestPrice: priceResponse?.highestPrice || null,
      error: null,
    };
  } catch (error: any) {
    return { category: null, highestPrice: null, error };
  }
};

export const searchProducts = async (searchQuery: string) => {
  if (!searchQuery) {
    return { search: {}, error: null };
  }

  try {
    const query = `*[_type == "product" && name match "${searchQuery}*"]{
      "id": _id,
      name,
      "apparel": apparel-> title,
      "categoryName": category->title,
      "slug": slug.current,
      "imageUrls": images[].asset->url
    }`;
    const response: SearchType[] = await client.fetch(query);

    const groupedByCategory = _.groupBy(response, "categoryName");

    const groupedByCategoryAndApparel = _.mapValues(
      groupedByCategory,
      (products) => {
        return _.groupBy(products, "apparel");
      }
    );

    return { search: groupedByCategoryAndApparel, error: null };
  } catch (error: any) {
    return { search: {}, error };
  }
};
