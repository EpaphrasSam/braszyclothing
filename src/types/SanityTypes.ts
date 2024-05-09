export interface BannerTypes {
  id: string;
  title: string;
  message: string;
  image: string;
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
  description: string;
  quantity?: number;
  apparel: string;
  categoryName: string;
  categorySlug: string;
  inStock: boolean;
  slug: string;
  imageUrls: string[];
}
