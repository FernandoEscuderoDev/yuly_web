import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe what this category is about",
    }),
  ],
});
