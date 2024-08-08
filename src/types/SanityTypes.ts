export interface BannerTypes {
  id: string;
  title: string;
  message: string;
  image: string;
  video: string;
  mediaType: "image" | "video";
}

export interface CategoryType {
  id: string;
  title: string;
  slug: string;
  apparel: {
    id: string;
    title: string;
    slug: string;
    imageUrls: string[];
  }[];
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  quantity?: number;
  apparel: string;
  categoryName: string;
  categorySlug: string;
  inStock: boolean;
  slug: string;
  mediaUrls: {
    url: string;
    type: "image" | "video";
  }[];
  colors: string[];
  sizes: string[];
}

export interface CartProductType {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  quantity?: number;
  apparel: string;
  categoryName: string;
  categorySlug: string;
  inStock: boolean;
  slug: string;
  imageUrls: string[];
  color: string;
  size: string;
}

export interface ApparelType {
  id: string;
  title: string;
  slug: string;
  imageUrls: string[];
  categories: {
    id: string;
    title: string;
    slug: string;
  }[];
}

export interface SearchType {
  [categoryName: string]: {
    [apparel: string]: {
      id: string;
      name: string;
      slug: string;
      mediaUrls: {
        url: string;
        type: "image" | "video";
      }[];
    }[];
  };
}
