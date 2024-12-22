import { defineField, defineType } from "sanity";

export const cardGallery = defineType({
  name: "cardGallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Texto descriptivo de la imagen para lectores de pantalla.",
        },
      ],
    }),
    defineField({
      name: "caption",
      type: "text",
      title: "Caption",
      description: "Texto para la leyenda de la imagen, máximo 150 caracteres.",
      validation: (Rule) => Rule.max(150).warning('Excedes los 150 caracteres!!'),
    }),
  ],
});
