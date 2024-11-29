import { defineField, defineType } from "sanity";

export const socialMedia = defineType({
  name: "SocialLink",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
});