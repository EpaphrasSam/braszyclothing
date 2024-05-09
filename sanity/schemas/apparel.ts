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
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
