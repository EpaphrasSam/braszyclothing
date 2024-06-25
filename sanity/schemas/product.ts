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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Product Images",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description of Product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oldPrice",
      type: "number",
      title: "Old Price",
      validation: (Rule) =>
        Rule.custom((oldPrice, context: any) => {
          if (oldPrice && oldPrice <= context.parent.price) {
            return "Old price must be greater than the current price";
          }
          return true;
        }),
    }),
    defineField({
      name: "color",
      type: "array",
      title: "Colors",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Pink", value: "pink" },
          { title: "Cream", value: "cream" },
          { title: "Gray", value: "gray" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "size",
      type: "array",
      title: "Sizes",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Small", value: "S" },
          { title: "Medium", value: "M" },
          { title: "Large", value: "L" },
          { title: "Extra Large", value: "XL" },
          { title: "Extra Extra Large", value: "2XL" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "apparel",
      type: "reference",
      title: "Apparel",
      to: [{ type: "apparel" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
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
