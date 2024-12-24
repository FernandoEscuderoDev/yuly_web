import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  type: "document",
  title: "Categorías",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Título",
      description: "El título de la categoría",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Descripción",
      description: "Describe de qué trata esta categoría",
    }),
  ],
});