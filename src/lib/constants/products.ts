import { ProductCardType } from "@/types/ProductCardType";

export const categories: { id: string; name: string }[] = [
  { id: "1", name: "Men" },
  { id: "2", name: "Women" },
];

export const menCategories = [
  { id: "1", name: "Shirts", images: ["/images/img1.jpg", "/images/img2.jpg"] },
  { id: "2", name: "Pants", images: ["/images/img3.jpg", "/images/img4.jpg"] },
  {
    id: "3",
    name: "Outerwear",
    images: ["/images/img1.jpg", "/images/img2.jpg"],
  },
  { id: "4", name: "Shorts", images: ["/images/img3.jpg", "/images/img4.jpg"] },
  { id: "5", name: "Jeans", images: ["/images/img1.jpg", "/images/img2.jpg"] },
  {
    id: "6",
    name: "Underwear",
    images: ["/images/img3.jpg", "/images/img4.jpg"],
  },
  { id: "7", name: "Shoes", images: ["/images/img2.jpg", "/images/img4.jpg"] },
];

export const womenCategories = [
  {
    id: "1",
    name: "Dresses",
    images: ["/images/img1.jpg", "/images/img2.jpg"],
  },
  { id: "2", name: "Jeans", images: ["/images/img3.jpg", "/images/img4.jpg"] },
  { id: "3", name: "Shirts", images: ["/images/img1.jpg", "/images/img2.jpg"] },
  { id: "4", name: "Skirts", images: ["/images/img3.jpg", "/images/img4.jpg"] },
  {
    id: "5",
    name: "Lingerie",
    images: ["/images/img1.jpg", "/images/img2.jpg"],
  },
  {
    id: "6",
    name: "Outerwear",
    images: ["/images/img3.jpg", "/images/img4.jpg"],
  },
];

export const menProducts: ProductCardType[] = [
  {
    id: "ab1cd2ef",
    name: "Classic Cotton T-Shirt",
    price: 19.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shirts",
    quantity: 0,
  },
  {
    id: "gh3ij4kl",
    name: "Slim Fit Chino Pants",
    price: 49.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Pants",
    quantity: 0,
  },
  {
    id: "mn5op6qr",
    name: "Lightweight Windbreaker Jacket",
    price: 69.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Outerwear",
    quantity: 0,
  },
  {
    id: "st7uv8wx",
    name: "Athletic Running Shorts",
    price: 29.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shorts",
    quantity: 0,
  },
  {
    id: "yz9ab0cd",
    name: "Comfortable Boxer Briefs (Pack of 3)",
    price: 24.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Underwear",
    quantity: 0,
  },
  {
    id: "ef2gh3ij",
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Jeans",
    quantity: 0,
  },
  {
    id: "kl4mn5op",
    name: "Flannel Button-Down Shirt",
    price: 39.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shirts",
    quantity: 0,
  },
  {
    id: "qr6st7uv",
    name: "Leather Chelsea Boots",
    price: 99.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shoes",
    quantity: 0,
  },
  {
    id: "wx8yz9ab",
    name: "Wool Blend Peacoat",
    price: 129.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Outerwear",
    quantity: 0,
  },
  {
    id: "cd0ef2gh",
    name: "Hooded Pullover Sweatshirt",
    price: 44.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Sweaters",
    quantity: 0,
  },
];

export const womenProducts: ProductCardType[] = [
  {
    id: "ij3kl4mn",
    name: "Floral Print Midi Dress",
    price: 59.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Dresses",
    quantity: 0,
  },
  {
    id: "op6qr6st",
    name: "High-Waisted Skinny Jeans",
    price: 49.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Jeans",
    quantity: 0,
  },
  {
    id: "uv8wx8yz",
    name: "Striped Button-Down Shirt",
    price: 39.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shirts",
    quantity: 0,
  },
  {
    id: "9ab0cd0e",
    name: "Pleated A-Line Skirt",
    price: 34.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Skirts",
    quantity: 0,
  },
  {
    id: "f2gh3ij3",
    name: "Lace Bralette and Panty Set",
    price: 29.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Lingerie",
    quantity: 0,
  },
  {
    id: "kl4mn5op",
    name: "Oversized Sweater Dress",
    price: 49.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Dresses",
    quantity: 0,
  },
  {
    id: "6qr6st7u",
    name: "Distressed Boyfriend Jeans",
    price: 54.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Jeans",
    quantity: 0,
  },
  {
    id: "v8wx8yz9",
    name: "Floral Wrap Blouse",
    price: 39.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Shirts",
    quantity: 0,
  },
  {
    id: "ab0cd0ef",
    name: "Faux Leather Moto Jacket",
    price: 79.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Outerwear",
    quantity: 0,
  },
  {
    id: "2gh3ij3k",
    name: "Strappy Lace Bodysuit",
    price: 24.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Lingerie",
    quantity: 0,
  },
  {
    id: "l4mn5op6",
    name: "Faux Fur Teddy Coat",
    price: 99.99,
    imageUrls: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
    ],
    apparel: "Outerwear",
    quantity: 0,
  },
];
