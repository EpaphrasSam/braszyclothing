import { defineField, defineType } from "sanity";
import { getExtension, getImageDimensions } from "@sanity/asset-utils";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Banner Message",
      type: "string",
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (context.parent?.mediaType === "image" && !value) {
            return "Image is required when Media Type is set to Image";
          }
          if (value && value.asset) {
            const filetype = getExtension(value.asset._ref);
            if (filetype !== "jpg" && filetype !== "png") {
              return "Image must be a JPG or PNG";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Banner Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (context.parent?.mediaType === "video" && !value) {
            return "Video is required when Media Type is set to Video";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
