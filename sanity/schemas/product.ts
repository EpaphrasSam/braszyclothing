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
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "apparel",
      type: "reference",
      title: "Apparel",
      to: [{ type: "apparel" }],
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
