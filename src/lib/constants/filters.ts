export const productsFilters = [
  {
    name: "price",
    type: "range",
    title: "Price",
    options: [
      { name: "All", value: "" },
      { name: "$0 - $50", value: "0-50" },
      { name: "$50 - $100", value: "50-100" },
      { name: "$100 - $150", value: "100-150" },
      { name: "More than $150", value: "150" },
    ],
  },
  { name: "inStock", type: "boolean", title: "In Stock" },
  { name: "newReleases", type: "boolean", title: "New Releases" },
];

export const productsSortOptions = [
  { name: "Alphabetically, A-Z", value: "a-z" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];
