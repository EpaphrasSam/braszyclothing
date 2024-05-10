import { defineField, defineType } from "sanity";

export default defineType({
  name: "apparel",
  title: "Apparel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Apparel Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) => [
        Rule.length(2).error("You must upload exactly 2 images."),
        Rule.required(),
      ],
      of: [{ type: "image" }],
    }),
  ],
});
