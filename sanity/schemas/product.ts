import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Product Images",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description of Product",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "apparel",
      type: "reference",
      title: "Apparel",
      to: [{ type: "apparel" }],
    }),
    defineField({
      name: "inStock",
      type: "boolean",
      title: "In Stock",
    }),
    defineField({
      name: "newRelease",
      type: "boolean",
      title: "New Release",
    }),
  ],
});
